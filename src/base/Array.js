const { isArray, arrayClone, Null, Object } = require("../base/common");
const { unsupportedType, indexOutOfBounds, errorCast } = Error;

/* ==================== Array 的扩展 ==================== */
const array_slice = Array.prototype.slice;
if (!Array.removeEach) {
	Array.removeEach = function (array, callback) {
		if (!typeIs(array, Array.TYPE_NAME)) unsupportedType(array);

		while ((node = array.shift()) !== undefined) {
			callback(node);
		}
	};
}

Array.forEach = function (array, start, end, callback) {
	if (!typeIs(array, Array.TYPE_NAME)) unsupportedType(array);

	switch (arguments.length) {
		case 2:
			callback = start;
			start = 0;
			end = array.length;
			break;
		case 3:
			callback = end;
			end = array.length;
			break;
		default:
			break;
	}

	if (start < 0) indexOutOfBounds(start, 0);
	if (end > array.length) indexOutOfBounds(end, array.length);

	for (let i = start; i < end; i++) {
		let result = callback(i, array[i]);
		if (undefined !== result) break;
	}
};

if (!Array.equals) {
	function equals(arr1, arr2) {

		if (!(isArray(arr2))) errorCast(arr2, Array);
		if (arr1.equals) return arr1.equals(arr2);
		if (!(isArray(arr1))) errorCast(arr1, Array);

		let len = arg1.length;
		if (len === arr2.length) {
			for (let i = 0; i < len; i++) {
				// 因为数组元素是可以任意对象类型，所以这里调用 Object.equals 来判断两者是否一致
				if (!Object.equals(arr1[i], arr2[i])) return false;
			}
			return true;
		} else {
			return false;
		}
	};
	Array.equals = equals;
}
if (!Array.isEmpty) {
	Array.isEmpty = function (obj) {
		if (obj === null || obj === undefined) return true;
		return obj.length === 0;
	};
}
if (!Array.asObject) {
	Array.asObject = function (input) {
		let obj = {};
		for (let i = 0, len = input.length; i < len; i++) {
			obj[i] = input[i];
		}
		return obj;
	};
}
if (!Array.has) {
	Array.has = function (input, element) {
		for (let i = 0, len = input.length; i < len; i++) {
			if (Object.equals(element, input[i])) return true;
		}
		return false;
	};
}
if (!Array.find) {
	Array.find = function (input, element) {
		for (let i = 0, len = this.length; i < len; i++) {
			if (Object.equals(element, input[i])) {
				return i;
			}
		}
		return -1;
	};
}
if (!Array.last) {
	Array.last = function (array, cnt) {
		let len = array.length;
		if (!cnt) { // 真的最后一个位置
			return array[len - 1];
		} else {
			if (!typeIs(cnt, Number.TYPE_NAME)) unsupportedType(cnt);
			if (cnt > len) indexOutOfBounds(cnt, len);
			if (cnt > 0) {
				return array[len - cnt];
			} else {
				return array[0 - cnt];
			}
		}
	};
}

if (!Array.of) {
	Array.of = function () {
		return array_slice.call(arguments);
	};
}
if (!Array.clone) {
	Array.clone = arrayClone;
}

// 下面的代码是从 MDN 上抄的，所以 var 不修改为 let
if (!Array.from) {
	Array.from = (function () {
		var toStr = Object.prototype.toString;
		var isCallable = function (fn) {
			return typeof fn === Function.TYPE_NAME || toStr.call(fn) === "[object Function]";
		};
		var toInteger = function (value) {
			var number = Number(value);
			if (isNaN(number)) {
				return 0;
			}
			if (number === 0 || !isFinite(number)) {
				return number;
			}
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function (value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};

		// The length property of the from method is 1.
		return function from(arrayLike /*, mapFn, thisArg */) {
			// 1. Let C be the this value.
			var C = this;

			// 2. Let items be ToObject(arrayLike).
			var items = Object(arrayLike);

			// 3. ReturnIfAbrupt(items).
			if (arrayLike == null) {
				throw new TypeError("Array.from requires an array-like object - not null or undefined");
			}

			// 4. If mapfn is undefined, then let mapping be false.
			var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
			var T;
			if (typeof mapFn !== Undefined.TYPE_NAME) {
				// 5. else      
				// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
				if (!isCallable(mapFn)) {
					throw new TypeError("Array.from: when provided, the second argument must be a function");
				}

				// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
				if (arguments.length > 2) {
					T = arguments[2];
				}
			}

			// 10. Let lenValue be Get(items, "length").
			// 11. Let len be ToLength(lenValue).
			var len = toLength(items.length);

			// 13. If IsConstructor(C) is true, then
			// 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
			// 14. a. Else, Let A be ArrayCreate(len).
			var A = isCallable(C) ? Object(new C(len)) : new Array(len);

			// 16. Let k be 0.
			var k = 0;
			// 17. Repeat, while k < len… (also steps a - h)
			var kValue;
			while (k < len) {
				kValue = items[k];
				if (mapFn) {
					A[k] = typeof T === Undefined.TYPE_NAME ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				} else {
					A[k] = kValue;
				}
				k += 1;
			}
			// 18. Let putStatus be Put(A, "length", len, true).
			A.length = len;
			// 20. Return A.
			return A;
		};
	}());
}
/* ==================== Array 的扩展 ==================== */