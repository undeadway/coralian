/* ==================== String 的扩展 ==================== */
const { errorCast, unsupportedType } = Error;

const EMPTY_STRING = "";
function equals(from, another) {

	if (!typeIs(from, String.TYPE_NAME)) errorCast(from, String); // from 不是字符串
	if (!typeIs(another, String.TYPE_NAME)) errorCast(from, String); // another 不是字符串

	if (String(from) === String(another)) return true;
	if (from.equals) return from.equals(another);

	// 添加最后这段是为了保证其他各种因为 new 或者其他原因造成的问题
	if (from.length === another.length) {
		for (let i = 0, len = from.length; i < len; i++) {
			if (from.charAt(i) !== another.charAt(i)) return false;
		}
		return true;
	} else {
		return false;
	}
};

if (!String.isEmpty) {
	String.isEmpty = function (input) {

		if (input === null || input === undefined) return true;
		if (!typeIs(input, String.TYPE_NAME)) unsupportedType(input);
		if (input.isEmpty) return input.isEmpty();

		return input.length === 0 || equals(input, EMPTY_STRING); // 后面一半仅限于前半段不知道什么时候会坏掉时用
	};
}
if (!String.equals) {
	String.equals = equals;
}
if (!String.contains) {
	String.contains = function (str, input, startIndex) {
		if (str.contains) return str.contains(input, startIndex);
		return -1 !== String.prototype.indexOf.call(str, input, startIndex);
	};
}

if (!String.equalsIgnoreCase) {
	String.equalsIgnoreCase = function (string, another) {

		if (string === another) return true;
		if (string.equalsIgnoreCase) return string.equalsIgnoreCase(another);

		if ((another !== null && another !== undefined) || string.length === another.length) {
			return equals(string.toUpperCase(), another.toUpperCase());
		}

		return false;
	}
}
if (!String.endsWith) {
	String.endsWith = function (str, searchString, position) {

		if (str.endsWith) return str.endsWith(searchString, position);

		position = position || str.length;
		position = position - searchString.length;
		var lastIndex = str.lastIndexOf(searchString);
		return lastIndex !== -1 && lastIndex === position;
	};
}
String.last = function (string) {
	if (string.last) return string.last();
	return string[string.length - 1];
};
String.lastCode = function (string) {
	if (string.lastCode) return string.lastCode();
	return string.charCodeAt(string.length - 1);
};
if (!String.startsWith) {
	Object.defineProperty(String, 'startsWith', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: function (string, searchString, position) {
			if (string.startsWith) return string.startsWith(searchString, position);
			position = position || 0;
			return string.indexOf(searchString, position) === position;
		}
	});
}

function trimZeroWidth(str) {
	if (str.trimZeroWidth) return str.trimZeroWidth();
	return str.replace(/\uFEFF/, EMPTY_STRING);
}

if (!String.trim) {
	String.trim = function (str) {
		if (str.trim) return str.trim();
		str = str.replace(/^\s+|\s+$/gm, EMPTY_STRING);
		return trimZeroWidth(str);
	};
}
if (!String.trimLeft) {
	String.trimLeft = function (str) {
		if (str.trimLeft) return str.trimLeft();
		str.replace(/(^\s*)/g, EMPTY_STRING);
		return trimZeroWidth(str);
	};
}
if (!String.trimRight) {
	String.trimRight = function (str) {
		if (str.trimRight) return str.trimRight();
		str.replace(/(\s*$)/g, EMPTY_STRING);
		return trimZeroWidth(str);
	};
}

if (!String.compareTo) {
	String.compareTo = function (first, another) {
		if (first.compareTo) return first.compareTo(another);
		var len1 = first.length,
			len2 = another.length;
		var max = len1 - len2;
		var len = (max <= 0) ? len1 : len2;
		var this_charCodeAt = first.charCodeAt;
		var another_charCodeAt = another.charCodeAt;
		for (let i = 0; i < len; i++) {
			let as = this_charCodeAt(i) - another_charCodeAt(i);
			if (as !== 0) return as;
		}
		return max;
	};
}
if (!String.fromCodePoint) {
	(function () {
		var defineProperty = (function () {
			// IE 8 only supports `Object.defineProperty` on DOM elements
			try {
				var object = {};
				return Object.defineProperty(object, object, object) && Object.defineProperty;
			} catch (error) { }
		}());
		var stringFromCharCode = String.fromCharCode;
		var floor = Math.floor;

		function fromCodePoint() {
			var MAX_SIZE = 0x4000;
			var codeUnits = [];
			var highSurrogate;
			var lowSurrogate;
			var index = -1;
			var length = arguments.length;
			if (!length) {
				return EMPTY_STRING;
			}
			var result = EMPTY_STRING;
			while (++index < length) {
				let codePoint = Number(arguments[index]);
				if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or
					// `-Infinity`
					codePoint < 0 || // not a valid Unicode code point
					codePoint > 0x10FFFF || // not a valid Unicode code point
					floor(codePoint) != codePoint // not an integer
				) {
					throw RangeError('Invalid code point: ' + codePoint);
				}
				if (codePoint <= 0xFFFF) { // BMP code point
					codeUnits.push(codePoint);
				} else { // Astral code point; split in surrogate halves
					// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
					codePoint -= 0x10000;
					highSurrogate = (codePoint >> 10) + 0xD800;
					lowSurrogate = (codePoint % 0x400) + 0xDC00;
					codeUnits.push(highSurrogate, lowSurrogate);
				}
				if (index + 1 == length || codeUnits.length > MAX_SIZE) {
					result += stringFromCharCode.apply(null, codeUnits);
					codeUnits.length = 0;
				}
			}
			return result;
		};
		if (defineProperty) {
			defineProperty(String, 'fromCodePoint', {
				'value': fromCodePoint,
				'configurable': true,
				'writable': true
			});
		} else {
			String.fromCodePoint = fromCodePoint;
		}
	}());
}
if (!String.prototype.codePointAt) {
	(function () {
		'use strict'; // needed to support `apply`/`call` with
		// `undefined`/`null`
		var codePointAt = function (position) {
			if (this == null) {
				throw TypeError();
			}
			var string = String(this);
			var size = string.length;
			// `ToInteger`
			var index = position ? new Number(position) : 0;
			if (index != index) { // better `isNaN`
				index = 0;
			}
			// Account for out-of-bounds indices:
			if (index < 0 || index >= size) return undefined;

			// Get the first code unit
			var first = string.charCodeAt(index);
			var second;
			if ( // check if it’s the start of a surrogate pair
				first >= 0xD800 && first <= 0xDBFF && // high surrogate
				size > index + 1 // there is a next code unit
			) {
				second = string.charCodeAt(index + 1);
				if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
					// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
					return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
				}
			}
			return first;
		};
		Object.defineProperty(String.prototype, 'codePointAt', {
			'value': codePointAt,
			'configurable': true,
			'writable': true
		});
	}());
}

const STRING_AS_ARRAY_REGX = /[\s\S]/gi;
String.asArray = function (input) {
	return input.match(STRING_AS_ARRAY_REGX);
};

Object.defineProperty(String, 'BLANK', {
	value: EMPTY_STRING,
	writable: false
});

/*
 * 因为JS已经有 valueOf 函数，所以这里用 from 来实现 类似 Java 中 String.valueOf 的 功能
 */
String.from = (obj) => {
	if (obj === null || obj === undefined) return EMPTY_STRING;
	return (obj).valueOf();
};
/* ==================== String 的扩展 ==================== */