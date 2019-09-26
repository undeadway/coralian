const { keyArray, hasOwnProperty, instanceTo, objectClone, isPrimitive } = require("../base/common");
const { unsupportedType, noReference } = Error;

/* ==================== Object 的扩展 ==================== */
function objectIsEmpty(obj) {
	if (obj === null || obj === undefined) return true;
	if (obj.isEmpty) return obj.isEmpty();
	for (let k in obj) {
		if (hasOwnProperty(obj, k)) return false;
	}
	return true;
};
if (!Object.isEmpty) {
	Object.isEmpty = objectIsEmpty;
}

function addAll(from, to) {

	if (!typeIs(from, Object.TYPE_NAME, Array.TYPE_NAME)) unsupportedType(from);
	if (!typeIs(to, Object.TYPE_NAME, Array.TYPE_NAME)) unsupportedType(to);

	for (let key in from) {
		if (hasOwnProperty(from, key)) {
			let now = from[key];
			if (typeIs(now, Object.TYPE_NAME)) {
				let _to = {};
				addAll(now, _to);
				to[key] = _to;
			} else {
				to[key] = from[key];
			}
		}
	}
}
Object.addAll = addAll;

if (!Object.keys) {
	Object.keys = function (o) {
		if (o !== Object(o))
			throw new TypeError('Object.keys called on a non-object');
		let k = [];
		for (let p in o) {
			if (hasOwnProperty(o, p)) {
				k.push(p);
			}
		}
		return k.sort();
	};
}

if (!Object.values) {
	Object.values = function (o) {
		if (o !== Object(o))
			throw new TypeError('Object.keys called on a non-object');
		var k = [];
		for (let p in o) {
			if (hasOwnProperty(o, p)) {
				k.push(o[p]);
			}
		}
		return k.sort();
	}
}

function equals(arg1, arg2) {

	if (arg1 === arg2) return true; // 值相同、数据类型相同，或者引用的是同一块内存，或者是基本类型（数字、字符串、boolean）

	let type1 = typeOf(arg1), type2 = typeOf(arg2);

	if (type1 !== type2) return false; // 先判断类型，类型不一致，则直接判断不等
	if (arg1 == arg2) return true; // 这句是因为可能存在 new String() !== '' 这样的情况
	if (arg1.equals) return arg1.equals(arg2);

	switch (type1) {
		case Number.NaN_TYPE_NAME:
			return true; // 因为两个都是 NaN，直接返回 true
		case Function.TYPE_NAME:
		case Number.Infinity_TYPE_NAME:
			return arg1 === arg2;
		case Array.TYPE_NAME:
			if (arg1.length !== arg2.length) return false;

			for (let i = 0, len = arg1.length; i < len; i++) {
				if (!Array.equals(!arg1[i], arg2[i])) return false;
			}
			return true;
		case Object.TYPE_NAME:
			// 提取对象的 KEY 为一个数组
			var key1 = keyArray(arg1), key2 = keyArray(arg2);
			if (key1.length === key2.length) {
				// 直接转化为字符串判断两个 KEY 的内容是否一致
				if (key1.toString() === key2.toString()) {
					for (let i = 0, len = key1.length; i < len; i++) {
						if (!equals(arg1[key1[i]], arg2[key2[i]])) return false; // 递归
					}
					return true;
				} else {
					return false;
				}
			}
		case RegExp.TYPE_NAME:
			return arg1.toString == arg2.toString();
		default:
			// 其余不可判断的类型全部JSON化之后判断字符串内容
			return JSON.stringify(arg1) === JSON.stringify(arg2);
	}
}
Object.equals = equals;

Object.forEach = (obj, callback) => {
	if (obj === null || obj === undefined) noReference();
	if (obj instanceof Map) {
		for (let [key, value] of obj.entries()) {
			callback(key, value);
		}
	} else {
		switch (typeOf(obj)) {
			case Array.TYPE_NAME:
				Array.forEach(obj, callback);
				break;
			case Object.TYPE_NAMEE:
				for (let k in obj) {
					if (hasOwnProperty(obj, k)) {
						let result = callback(k, obj[k]);
						if (false === result) break;
						if (true === result) continue;
					}
				}
				break;
			default:
				unsupportedType(obj);
		}
	}
}

if (!Object.mix) {
	Object.mix = function () {
		let deepCpy = arguments[0],
			start = 1;
		if (!typeIs(deepCpy, Boolean.TYPE_NAME)) {
			deepCpy = false;
			start = 0;
		}

		let result = {};

		for (let i = start; i < arguments.length; i++) {
			let e = arguments[i];

			if (!typeIs(e, Object.TYPE_NAME)) unsupportedType(e);

			let el = deepCpy ? JSON.parse(JSON.stringify(e)) : e;

			addAll(el, result);
		}

		return result;
	}
}

Object.isPrimitive = (obj) => {
	if (obj === null || obj === undefined) return true;
	let type = obj.constructor;

	return isPrimitive(type);
};

if (!Object.clone) {
	Object.clone = objectClone;
}

if (!Object.instanceTo) {
	Object.instanceTo = instanceTo;
}
/* ==================== Object 的扩展 ==================== */