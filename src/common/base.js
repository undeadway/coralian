

const side = typeof (window) !== "undefined"; // 设置端点，side = true 客户端 side = false 服务端

const SIDE_ONLY_FMT_STR = "只能在%s中使该功能用";
exports.browserOnly = () => {
	if (!side) throw new Error(formatString(SIDE_ONLY_FMT_STR, "浏览器"));
}

exports.serverOnly = () => {
	if (side) throw new Error(formatString(SIDE_ONLY_FMT_STR, "服务端"));
}

exports.side = side;

const _isArray = exports.isArray = (Array.isArray) ? Array.isArray :
	(arr) => {
		return arr && (arr instanceof Array ||
			(typeof arr === Object.TYPE_NAME &&
				typeof arr.length === Number.TYPE_NAME &&
				arr.propertyIsEnumerable("length")));
	};

const keyArray = exports.keyArray = (Object.keys) ? Object.keys :
	(obj) => {
		let keys = [];
		for (let k in obj) {
			if (obj.hasOwnProperty(k)) {
				keys.push(k);
			}
		}
		return keys;
	};


const isNumber = exports.isNumber = (number, notation = 10) => {

	if (number !== number) return false;

	if (notation === 16 && !String.startsWith((number).toString().toLowerCase(), "0x")) {
		number = "0x" + number;
	}

	return isFinite(number);
}
	
const formatString = exports.formatString = (str, ...obj) => {

	if (!obj) unsupportedOperation("至少需要一个字符来进行替换");

	if (Object.TYPE_NAME === typeOf(obj[0])) {
		str = replaceElement(str, obj[0]);
	} else {
		Object.forEach(obj, function (i, e) {
			str = str.replace(/\%s/, e);
		});
	}

	return str;
}

const Types = {
	isNumberObject: (obj) => {
		try {
			return obj.valueOf && isNumber(obj.valueOf()) && (obj !== obj.valueOf());
		} catch (e) {
			return false;
		}
	},
	isBooleanObject: (obj) => {
		try {
			let val = obj.valueOf();
			return obj.valueOf && (val === true || val === false) && (obj !== obj.valueOf());
		} catch (e) {
			return false;
		}
	},
	isStringObject: (obj) => {
		try {
			return obj.valueOf && (obj.valueOf() === obj.toString()) && (obj !== obj.valueOf());
		} catch (e) {
			return false;
		}
	},
	isRegExp: (obj) => {
		return obj instanceof RegExp;
	},
	isDate: (obj) => {
		return obj instanceof Date;
	},
	isSet: (obj) => {
		return obj instanceof Set;
	},
	isWeakSet: (obj) => {
		return obj instanceof WeakSet;
	},
	isMap: (obj) => {
		return obj instanceof Map;
	},
	isWeakMap: (obj) => {
		return obj instanceof WeakMap;
	},
};



function Null () {}
function Undefined () {};

const nullObj = new Null();
const undefinedObj = new Undefined();

Object.defineProperties(nullObj,  {
	"TYPE_NAME": {
		value: "null",
		writable: false
	},
	"getValue": {
		value: () => {
			return null;
		},
		writable: false
	}
});
Object.defineProperties(undefinedObj,  {
	"TYPE_NAME": {
		value: "undefined",
		writable: false
	},
	"getValue": {
		value: () => {
			return undefined;
		},
		writable: false
	}
});

exports.Null = nullObj;
exports.Undefined = undefinedObj;

/**
 * 用于得到数据类型
 * 一般以 string 类型返回数据类型的值
 * 数据类型判断不依照 JS 规则，而是以以下基准判断
 * Object.NULL_TYPE_NAME === typeOf(null)
 * Object.UNDEFINED_TYPE_NAME === typeOf(undefined)
 * Boolean.TYPE_NAME === typeOf(boolean)
 * Number.NaN_TYPE_NAME === typeOf(NaN) 仅用于 NaN ，如果提供的是 '12X' 则直接判断为字符串
 * Number.Infinity_TYPE_NAME === typeOf(Infinity) 仅用于 Infinity 和 -Infinity，其他可用字面量表达的数字判断为 number
 * Number.TYPE_NAME === typeOf(number)
 * String.TYPE_NAME === typeOf(string)
 * Function.TYPE_NAME === typeOf(function)
 * Object.TYPE_NAME === typeOf(object)
 * Array.TYPE_NAME === typeOf(array)
 * RegExp.TYPE_NAME === typeOf(regexp)
 * Date.TYPE_NAME === typeOf(date)
 * Set.TYPE_NAME === typeOf(set)
 * WeakSet.TYPE_NAME === typeOf(weakset)
 * Map.TYPE_NAME === typeOf(map)
 * WeakMap.TYPE_NAME === typeOf(weakmap)
 * Symbol.TYPE_NAME === typeOf(symbol)
 * 
 * String、Number、Boolean 这三种可以被包装的对象也当成字面量来进行判断，而不返回 object
 * 即
 * String.TYPE_NAME === typeOf(new String());
 * Number.TYPE_NAME === typeOf(new Number());
 * Boolean.TYPE_NAME === typeOf(new Boolean());
 * 
 * 只判断 JS 内置的数据类型格式
 * 不会判断各种自定义数据类型，这些类型都将被辨认为 object
 * 
 * @returns
 */
 function typeOf(object) {
	let result;

	if (object === null) {
		result = nullObj.TYPE_NAME;
	} else if (object === undefined) {
		result = undefinedObj.TYPE_NAME;
	} else if (_isArray(object)) {
		result = Array.TYPE_NAME;
	} else if (object !== object) {
		result = NaN.TYPE_NAME;
	} else if (object === Infinity || object === -Infinity) {
		result = Infinity.TYPE_NAME;
	} else if (Types.isRegExp(object)) {
		result = RegExp.TYPE_NAME;
	} else if (Types.isNumberObject(object)) { // new Number
		result = Number.TYPE_NAME;
	} else if (Types.isBooleanObject(object)) { // new Boolean
		result = Boolean.TYPE_NAME;
	} else if (Types.isStringObject(object)) { // new String
		result = String.TYPE_NAME;
	} else if (Types.isDate(object)) {
		result = Date.TYPE_NAME;
	} else if (Types.isSet(object)) {
		result = Set.TYPE_NAME;
	} else if (Types.isWeakSet(object)) {
		result = WeakSet.TYPE_NAME;
	} else if (Types.isMap(object)) {
		result = Map.TYPE_NAME;
	} else if (Types.isWeakMap(object)) {
		result = WeakMap.TYPE_NAME;
	// } else if (Types.isWeakMap(object)) {
	// 	result = WeakMap.TYPE_NAME;
	// } else if (Types.isWeakMap(object)) {
	// 	result = WeakMap.TYPE_NAME;
	} else {
		result = typeof object;
		if (result === Number.TYPE_NAME && isNaN(object)) { // 以防有漏网之鱼
			result = Number.NaN_TYPE_NAME
		}
	}

	return result;
}
exports.typeOf = typeOf;

require("./../base/Error");
const { errorCast, noReference, unsupportedType, indexOutOfBounds, unsupportedOperation, noSuchMethod } = Error;
const { Char } = JsConst;

const typeTo = {
	toString: () => {
		return this.name.toLowerCase();
	}
}

/*
 * 第一个参数是需要被比较的 Object 对象
 * 从第二个参数开始是一个可变长参数，可以传入任意多字符串参数表达数据类型，
 * 只要其中一个和被比较对象的结果一致，则返回 ture 当全部不符合的时候，返回 false 。
 */
function typeIs(object, ...types) {

	let type = typeOf(object);
	// let _types = types;

	// if (arguments.length === 2 && typeof types === String.TYPE_NAME) {
	// 	return type === types;
	// } else if (!_isArray(types) && arguments.length > 2) {
	// 	_types = Array.prototype.slice.call(arguments, 1);
	// }
	return new Set(types).has(type);
}
exports.typeIs = typeIs;

const LOOP_REG_START = "#{",
	LOOP_REG_END = "#{/",
	LOOP_IN_START = "#:{";
const LOOP_REG_START_L = LOOP_REG_START.length;
const DEFAULT_PREFIX = "${",
	DEFAULT_SURFIX = "}";

function replaceElement(str, obj, prefix = DEFAULT_PREFIX, surfix = DEFAULT_SURFIX) {

	if (!typeIs(str, String.TYPE_NAME)) errorCast(str, String);

	let ret = String.BLANK,
		p1 = 0,
		p2 = 0;
	while (true) {
		p1 = str.indexOf(prefix, p2);
		if (p1 === -1) break;
		if (p1 > p2) {
			ret += str.substring(p2, p1);
		}
		p2 = str.indexOf(surfix, p1 + prefix.length);
		if (p2 === -1) break;
		let holder = str.substring(p1 + prefix.length, p2);
		let nests = holder.split(Char.POINT);
		let val = obj;
		for (let i = 0, length = nests.length; i < length; i++) {
			val = val[nests[i]];
			if (!val) break;
		}
		if (null !== val && undefined !== val) {
			// 如果目标对象中不包含请求内容，则清空表达
			ret += val;
		}
		p2 = p2 + surfix.length;
	}
	if (p1 === -1) {
		ret += str.substring(p2, str.length);
	} else {
		if (p2 === -1) {
			ret += str.substring(p1, str.length);
		}
	}
	return ret;
}
replaceElement.LOOP_REG_START = LOOP_REG_START;
replaceElement.LOOP_REG_END = LOOP_REG_END;
replaceElement.LOOP_IN_START = LOOP_IN_START;
replaceElement.LOOP_REG_START_L = LOOP_REG_START_L;
replaceElement.DEFAULT_PREFIX = DEFAULT_PREFIX;
replaceElement.DEFAULT_SURFIX = DEFAULT_SURFIX;

exports.replaceElement = replaceElement;

/*
 * [ERR:20170310] 将 nodejs 更新至 v6.10.0 之后有些时候会出现 hasOwnProperty 错误。
 * 错误信息：TypeError: hasOwnProperty is not a function
 * 原因未知。
 * 所以暂时用这种方式来解决问题
 * 
 * 一种解释，仅供参考：
 * https://stackoverflow.com/questions/53978067/hasownproperty-is-not-a-function-in-node-js
 */
function hasOwnProperty(obj, keyName) {
	return Object.prototype.hasOwnProperty.call(obj, keyName);
}
exports.hasOwnProperty = hasOwnProperty;

function instanceTo(instance, type) {

	let prototype = type.prototype;

	if (prototype) {
		instance.__proto__ = prototype;
		instance.constructor = prototype.constructor;
	}
}
exports.instanceTo = instanceTo;

const getFunctionName = exports.getFunctionName = (func) => {

	let functionName = String.BLANK;
	let _name = func.name;
	if (_name !== undefined) {
		functionName = _name;
	} else {
		let arr = null,
			str = func.toString();
		if (str.charAt(0) === Char.SquareBracket.LEFT) {
			arr = str.match(/\[\w+\s*(\w+)\]/);
		} else {
			arr = str.match(/function\s*(\w+)/);
		}
		if (arr && arr.length === 2) {
			functionName = arr[1];
		}
	}

	return functionName;
}

const ARG_MARK = "arg";
const getFunctionDefine = exports.getFunctionDefine = (name, count) => {
	let _d = [];
	for (let i = 0; i < count; i++) {
		_d.push(ARG_MARK + i);
	}

	let pars = _d.join();
	return `function ${name}${Char.Parenthe.LEFT}${pars}${Char.Parenthe.RIGHT}${Char.SEMICOLON}`;
}

exports.newInstance = (type, args) => {

	let obj = {};
	let ret = type.apply(obj, args);
	let instance = typeIs(ret, Object.TYPE_NAME) ? ret : obj;

	return instanceTo(instance, type);
}

function arrayClone(array) {

	let output = [];

	for (let i = 0, len = array.length; i < len; i++) {
		output.push(objectClone(array[i]));
	}

	return output;
}
exports.arrayClone = arrayClone;

function objectClone(obj) {

	if (obj === null || obj === undefined) return obj;
	if (obj !== obj) return obj; // NaN
	if (typeIs(obj, String.TYPE_NAME, Number.TYPE_NAME, Number.Infinity_TYPE_NAME, 
		Boolean.TYPE_NAME, RegExp.TYPE_NAME, Function.TYPE_NAME)) return obj;
	if (obj.clone) return obj.clone();

	if (_isArray(obj)) {
		return arrayClone(obj);
	} else {
		let another = {};
		for (let key in obj) {
			if (hasOwnProperty(obj, key)) {
				another[key] = objectClone(obj[key]);
			}
		}

		// 将新建对象的原型链关联到旧对象上，保证两者看起来一致
		instanceTo(another, getType(obj));

		return another;
	}
};
exports.objectClone = objectClone;

function Iterator(obj) {
	if (obj === null || obj === undefined) noReference();

	let isArray = _isArray(obj);
	if (!isArray && !typeIs(obj, Object.TYPE_NAME)) unsupportedType(obj);

	let keys = keyArray(obj);
	let index = 0,
		count = keys.length;

	this.hasNext = function () {
		return index < count;
	};
	this.next = function () {
		let key = keys[index++];
		if (isArray) {
			return key;
		} else {
			return obj[key];
		}
	};
	this.first = function () {
		return keys[0];
	};
	this.last = function () {
		return keys[count - 1];
	};
	this["goto"] = function (index) {
		if (index < 0) {
			indexOutOfBounds(index, 0);
		}
		if (index >= count) {
			indexOutOfBounds(index, count);
		}
	};
	this.forward = function (cnt) {
		let at = index + cnt;
		if (at < 0) {
			indexOutOfBounds(at, 0);
		}
		if (at >= count) {
			indexOutOfBounds(at, count);
		}
		index = at;
	};
}

exports.Iterator = Iterator;

function Constructor(type, name, callback, isFunction) {

	// 参数个数
	let count = type.length,
		// 获得定义
		define = getFunctionDefine(name, count);

	this.getDefine = function () {
		return define;
	};
	this.parameterCount = function () {
		return count;
	};
	this.newInstance = function () {
		callback();
		if (!isFunction) {
			return newInstance(type, arguments);
		} else {
			return new type();
		}
	};
}

/*
 * 布尔类型 布尔表示一个逻辑实体，可以有两个值： true 和 false 。
 * Null 类型 Null 类型只有一个值： null ，更多详情可查看 null 和Null 。
 * Undefined 类型 ...
 * 数字类型 ...
 * 字符串类型 ...
 * 符号类型 ... 
 */
function isPrimitive(type) {
	return (type === String || type === Number || type === Boolean || type === Symbol);
}
exports.isPrimitive = isPrimitive;

function Type(obj) {

	// 对象的数据类型
	let type = obj.constructor || Object,
		// 对象的原型
		prototype = obj.prototype || Object;

	// 是否是基本数据类型
	let _isPrimitive = isPrimitive(type),
		// 是否是接口
		_isInterface = isInterface(obj),
		// 是否是数组
		isArray = _isArray(obj),
		isFunction = (type === Function),
		// 是否是字面量对象
		isLiteral = (type === Object || _isPrimitive || isArray || type === RegExp);

	// 类型的名字
	let name = getFunctionName(type);

	function constructorCheck() {
		if (isLiteral || _isPrimitive) {
			throw new Error("请使用字面量来构造对象");
		}
		if (_isInterface) {
			throw new Error("请使用 Coralian.util.Interface 类的 newInterface 方法来构造接口");
		}
	}

	this.getName = function () {
		return name;
	};
	this.getStatic = type.getStatic;
	this.isLiteral = function () {
		return isLiteral;
	};
	this.isArray = function () {
		return isArray;
	};
	this.isInterface = function () {
		return _isInterface;
	};
	this.isPrimitive = function () {
		return isPrimitive;
	};
	this.isFunction = function () {
		return isFunction;
	};
	// TODO 这两个到底是个什么还没想好
	//			this.invoke = function() {
	//				if (isFunction) {
	//					return type.apply(null, arguments);
	//				} else {
	//					unsupportedOperation(typeOf(type) + "不是函数");
	//				}
	//			},
	this.newInstance = function () {
		constructorCheck();
		if (!isFunction) {
			return newInstance(type);
		} else {
			return new type();
		}
	};
	this.getPrototype = function () {
		return prototype;
	};
	this.typeIs = function () {
		return typeIs(obj, arguments);
	};
	this.instanceOf = function (classType) {
		return type === classType || type instanceof classType;
	};
	this.getConstructor = function () {
		return new Constructor(type, name, constructorCheck, isFunction);
	};
}

let getType = exports.getType = (obj) => {
	return new Type(obj);
}

function Interface(name, methods) {
	for (let i = 0, len = methods.length; i < len; i++) {
		let method = methods[i];
		if (!typeIs(method, String.TYPE_NAME)) errorCast(method, String);
	}
	this.getName = function () {
		return name;
	};
	this.iterator = function () {
		return new Iterator(methods);
	};
}

function newInterface(name, methods) {
	if (arguments.length === 1) throw new Error("构建接口至少定义一个方法");

	if (!Array.isArray(methods)) {
		methods = array_slice.call(arguments, 1);
	}

	return new Interface(name, methods);
}

function isInterface(obj) {
	return obj instanceof Interface;
}

exports.Interface = {
	newInterface: newInterface,
	ensureImplements: function (object) {
		if (arguments.length < 2) throw new Error("判定对象是否是实现某接口，必须先提供至少一个被判定的接口");

		for (let i = 1, len = arguments.length; i < len; i++) {
			let target = arguments[i];
			if (!isInterface(target)) errorCast(object, Interface);

			let iterator = target.iterator();
			while (iterator.hasNext()) {
				let name = iterator.next();
				let method = object[name];
				if (!method || !typeIs(method, Function.TYPE_NAME)) noSuchMethod(name);
			}
		}
	},
	isInterface: isInterface,
	Collection: newInterface("Collection", // 接口名称
		["add", // add 方法，添加元素
			"clear", // clear 方法，清空元素
			"exists", // exists 方法，判断元素是否存在于集合中
			"existsAll", // existsAll 方法，判断元素集合是否都存在于集合中
			"equals", // equals 方法，判断元素是否和集合是否相同，由各个实现类各自实现具体需求
			"isEmpty", // isEmpty 方法，判断集合是否为空
			"remove", // remove 方法，删除某个指定的元素
			"size", // size 方法，获得集合的大小（元素个数）
			"toArray" // toArray 方法，将集合转化成数组
		])
}