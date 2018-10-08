let { hasOwnProperty, isArray, getFunctionName , getFunctionDefine, getType, isNumber} = require("../base/common");

/* ==================== Date 的扩展 ==================== */
Date.toJSON = Date.toString = function (date) {

	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" +
		date.getMinutes() + ":" + date.getSeconds();
};
Date.clone = function (date) {
	if (!(date instanceof Date)) {
		Error.errorCast(date, Date);
	}
	var another = new Date(date.getTime());
	return another;
};
/* ==================== Date 的扩展 ==================== */
/* ==================== Number 的扩展 ==================== */
if (!Number.isNumber) {
	Number.isNumber = isNumber;
}

Number.equals = function (num1, num2) {

	if (!isNumber(num1)) Error.unsupportedType(num1);
	if (!isNumber(num2)) Error.unsupportedType(num2);

	return num1 == num2;
};
/* ==================== Number 的扩展 ==================== */
/* ==================== Function 的扩展 ==================== */
if (!Function.getName) {
	Function.getName = getFunctionName;
}

if (!Function.EMPTY_BODY) {
	Object.defineProperty(Function, "EMPTY_BODY", {
		value: () => { },
		writable: false
	});
}

if (!Function.getStatic) {
	Function.getStatic = (func) => {

		var statics = {};

		for (let k in func) {
			if (hasOwnProperty(func, k)) {
				statics[k] = func[k];
			}
		}
		return Object.isEmpty(statics) ? undefined : statics;
	}
}

Function.getDefine = (func) => {
	return getFunctionDefine(getFunctionName(func), func.count);
};
/* ==================== Function 的扩展 ==================== */
/* ==================== Map 的扩展 ==================== */
/* ==================== Map 的扩展 ==================== */
if (!Map.isEmpty) {
	Map.isEmpty = function (map) {
		return map.size === 0;
	}
}
if (!Map.equals) {
	Map.equals = collectionIsSame;
}
/* ==================== Set 的扩展 ==================== */
if (!Set.isEmpty) {
	Set.isEmpty = (set) => {
		return set.size === 0;
	};
}
if (!Set.equals) {
	Set.equals = collectionIsSame;
}
/* ==================== Set 的扩展 ==================== */
function collectionIsSame(c1, c2) {

	if (c1 === c2) return true;
	if (getType(c1).getName() !== getType(c2).getName()) return false;
	if (c1.size !== c2.size) return false;

	let c1Iter = c1[Symbol.iterator]();
	let c2Iter = c2[Symbol.iterator]();

}