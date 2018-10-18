let isNumber, getFunctionName;

function init() {
	if (!isNumber || !getFunctionName) {
		let common = require("../base/common");
		isNumber = common.isNumber;
		getFunctionName = common.getFunctionName;
	}
}

/* ==================== Error 的扩展 ==================== */
function debugError(e) {
	alert('message:' + e.message);
	alert('stack:' + e.stack);
	throw e;
}

function errorCast(obj, type) {
	init();

	if ('function' !== typeof type) {
		errorCast(type, Function);
	}

	var error = new TypeError();
	console.error(error.message);
	console.error(error.stack);
	error = typeOf(obj) + " 类型的数据无法转变为 " + getFunctionName(type) + "。";
	debugError(error);
}
Error.errorCast = errorCast;

function indexOutOfBounds(given, want) {
	init();
	if (!isNumber(given)) errorCast(given, Number);
	if (!isNumber(want)) errorCast(want, Number);

	if (want < given) {
		debugError(new Error("请求的下标 " + given + " 超过了上限 " + want));
	} else {
		debugError(new Error("请求的下标 " + given + " 没有达到下限 " + want));
	}
}
Error.indexOutOfBounds = indexOutOfBounds;

function noReference(msg) {
	var error = new ReferenceError();
	error.message = msg || "当前引用错误。";
	debugError(error);
}
Error.noReference = noReference;

function unsupportedType(type) {
	var error = new TypeError();
	error.message = typeOf(type) + "类型的数据不被当前操作所支持。";
	debugError(error);
}
Error.unsupportedType = unsupportedType;

function unsupportedOperation(msg) {
	msg += " 不被支持的操作";
	debugError(new Error(msg));
}
Error.unsupportedOperation = unsupportedOperation;

function noSuchMethod(name) {
	debugError(new Error("方法 " + name + " 不存在。"));
}
Error.noSuchMethod = noSuchMethod;

function noSuchProperty(name) {
	debugError(new Error("属性 " + name + " 不存在。"));
}
Error.noSuchProperty = noSuchProperty;

function errorStatement() {
	debugError(new Error("语法错误，或被执行的逻辑不正确。"));
}
Error.errorStatement = errorStatement;

function illegalArguments(msg) {
	msg = msg || '函数参数不正确';
	debugError(msg);
}
Error.illegalArguments = illegalArguments;
/* ==================== Error 的扩展 ==================== */