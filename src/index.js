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
 * 这些属于 JS 的基本类库扩展，不用导入Coralian中
 */
require("./base/Error");
require("./base/Array");
require("./base/Object");
require("./base/String");
require("./base/others");

let {typeOf, typeIs, formatString}= require("./base/common");

var side = typeof (window) !== 'undefined', // 设置端点，side = true 客户端 side = false 服务端
	that = null, // 定义 全局变量 that，node 中等价于 global 浏览器中等价于 window
	n_eval = null; // 将 eval 函数的指针赋值给本地局部变量（暂时不知道能干嘛，保留指针）

var NBSP = '&nbsp;';

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
} else {
	that = global;
	that.alert = function (msg) {
		if (String.contains(msg, "error")) {
			console.log(new Error());
		}
		console.log(msg);
	};
}

// 将 typeOf 和 typeIs 分别添加到全局对象
that.typeOf = typeOf;
that.typeIs = typeIs;

const SIDE_ONLY_FMT_STR = "只能在%s中使该功能用";
function browserOnly() {
	if (!side) throw new Error(formatString(SIDE_ONLY_FMT_STR, "浏览器"));
}

function serverOnly() {
	if (side) throw new Error(formatString(SIDE_ONLY_FMT_STR, "服务端"));
}


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

let {noReference, unsupportedType} = Error;

that.Coralian = {
	ABOUT: 'Coralian',
	VERSION: '0.0.5',
	HREF: 'http://wpl.waygc.net/prj=coralian',
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
		if (!typeIs(name, 'string')) unsupportedType(name);
		if (String.isEmpty(name)) throw new Error("不能使用空字符串作为属性名");

		setToGlobal(that, name.split("."), obj);
	},
	exports: function (name, obj) {
		setExports(that, name, obj);
	},
	logger: require("./lib/logger"),
	constants: require("./lib/constants"),
	util: require("./lib/util"),
	dom: require("./lib/dom"),
	Calendar: require("./lib/Calendar"),
	Formatter: require("./lib/Formatter"),
	Random: require("./lib/Random"),
	ReplaceHolder: require("./lib/ReplaceHolder"),
	Validator: require("./lib/Validator")
};