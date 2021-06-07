/**
 * 自定义函数集/类库
 * <p>
 * 主要实现两个功能 <br />
 * 1.针对 JS 自身的不足，补足相关功能、添加部分数据类型 <br />
 * 设计方针基本符合《 JavaScript 语言精粹 》中的要求 <br />
 * &nbsp;&nbsp;&nbsp;&nbsp;不同的是因为要设计一些数据类型（Map、Set、Interface、Collection、XmlWrapper）等<br />
 * &nbsp;&nbsp;&nbsp;&nbsp;所以保留了对 new 关键字的使用<br />
 * 2.简单化功能封装 <br />
 * &nbsp;&nbsp;&nbsp;&nbsp;包括对一些 JS 中不尽人意的地方进行了封装，或者重新写了一些相适用的方法 / 函数集合
 * </p>
 * 所有实现均为对 ECMAScript 的扩展，不包含任何 window、document 操作<br />
 * 适用浏览器
 * <ul>
 * <li>Firefox</li>
 * <li>Chrome</li>
 * <li>Opera</li>
 * <li>Edge</li>
 * </ul>
 */

/*
 * 这些属于 JS 的基本类库扩展，不用导入Coralian命名空间
 */
const lib = {};
const { side, typeOf, typeIs, browserOnly, serverOnly } = require("./base/common");
const { noReference, unsupportedType } = Error;

let that = null, // 定义 全局变量 that，node 中等价于 global 浏览器中等价于 window
	n_eval = null; // 将 eval 函数的指针赋值给本地局部变量（暂时不知道能干嘛，保留指针）

/*
 * 因为服务端（Nodejs）和客户端（浏览器）有不一样的地方 所以这里分别为服务端和客户端添加载入 Coralian
 * 库所必需的函数或者一些方便调试的函数 通过 try... catch 块来分别执行 服务端和 客户端所需要加载的内容
 */
if (side) {
	that = window; // 初始化客户端
	that.global = window;

	// 如果客户端没有实现 console.log 则用 window.alert 来代为实现相关功能
	if (!window.console) {
		that.cosole = {
			log: that.alert,
			err: that.alert,
			warn: that.alert
		};
	} else if (!window.console.log) {
		that.console.log = that.alert
	}

	// 前端借用 webpack 的 require.context 函数进行自动挂载文件
	const base = require.context("./base/.");
	base.keys().forEach(key => {
		base(key);
	});
	const _lib = require.context("./lib/.");
	_lib.keys().forEach(key => {
		/^\.\/(((?!\.js).)+)?(.js)?$/.test(key);
		if (!lib[RegExp.$1]) {
			lib[key.replace("./", "")] = _lib(key);
		}
	});

} else {
	that = global;
	that.alert = function (msg) {
		if (String.contains(msg, Error.TYPE_NAME)) {
			console.log(new Error());
		}
		console.log(msg);
	};

	// 后端采用 nodejs 的 fs 模块进行文件挂载
	try { // 套 try catch 的目的时因为前端打包时可能找不到 fs 模块
		const fs = require("fs");
		const base = fs.readdirSync(`${__dirname}/base`);
		base.map((file) => {
			file = file.split(".")[0];
			require(`./base/${file}`);
		});
		const _lib = fs.readdirSync(`${__dirname}/lib`);
		_lib.map((file) => {
			file = file.split(".")[0];
			lib[file] = require(`./lib/${file}`);
		});
	} finally {
	}
}

// 将 typeOf 和 typeIs 分别添加到全局对象
that.typeOf = typeOf;
that.typeIs = typeIs;

function setToGlobal(parent, pkg, obj) {

	let name = pkg[0];
	if (pkg.length > 1) {
		let sub = parent[name];
		if (!sub) {
			sub = parent[name] = {};
		}
		setToGlobal(sub, pkg.slice(1), obj);
	} else {
		parent[name] = obj;
	}
}

const Coralian = {
	ABOUT: 'Coralian',
	VERSION: '0.0.22',
	HOMEPAGE: 'http://codes.waygc.net/project/?coralian',
	AUTHOR: 'hzwaygc@gmail.com',
	side: function () {
		return side;
	},
	/*
	 * 下面两个方法是用来描述作用环境的
	 * 如果判断执行环境非作用环境，则抛出异常。
	 */
	browserOnly: browserOnly,
	serverOnly: serverOnly,
	/*
	 * 这组函数主要是用来实现将对象设置到 global 中用
	 * 和计划的解耦客户-服务端的不同方式，自己调用一个函数就可以的目的有些不同
	 * 这里更希望能实现一个类似 Java Class.forName 这样的一个功能
	 */
	setToGlobal: function (name, obj) {

		if (obj === null || obj === undefined) noReference();
		if (!typeIs(name, String.TYPE_NAME)) unsupportedType(name);
		if (String.isEmpty(name)) throw new Error("不能使用空字符串作为属性名");

		setToGlobal(that, name.split("."), obj);
	},
	exports: function (name, obj) {
		setExports(that, name, obj);
	}
};

Object.assign(Coralian, lib);

that.Coralian = Coralian;