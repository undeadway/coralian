const { hasOwnProperty, Interface, Iterator, objectClone, getType, Null, Undefined } = require("../common/defines");
const { unsupportedOperation, unsupportedType, errorCast, illegalArguments } = Error;
const { Char } = JsConst;

const StringUtil = {
	normal: function (input) {
		return input.replace(/<(\/)?(b|i|strike|em|u|strong|sub|sup)>/ig, EMPTY_STRING);
	},
	weight: function (tag) {
		return "<" + tag + ">" + input + "</" + tag + ">";
	},
	undersourceToCamel: (str, type = false) => {
		if (String.contains(str, Char.UNDER_SOURCE)) {
			let result = [];
			let arr = str.split(Char.UNDER_SOURCE);
			let start = type ? 1 : 0; // 驼峰是大驼峰还是小驼峰
			for (let i = start, len = arr.length; i < len; i++) {
				result.push(StringUtil.firstToUpperCase(arr[i].toLowerCase()));
			}
			return result.join(String.BLANK);
		} else {
			return str;
		}
	},
	queryString: function (obj) {

		if (typeIs(obj, String.TYPE_NAME)) {
			return encodeURI(obj);
		}

		var string = [];
		for (var key in obj) {
			if (hasOwnProperty(obj, key)) {
				// 这里 encodeURIComponent 是因为 nodejs 端才这么写，其他服务器语言可能用不着
				// JSON.stringify 这句是因为可能存在包含对象类型的数据
				if (typeIs(obj[key], Object.TYPE_NAME)) {
					string.push(key + Char.EQUALS + JSON.stringify(encodeURIComponent(obj[key])));
				} else {
					string.push(key + Char.EQUALS + encodeURIComponent(obj[key]));
				}
			}
		}
		return string.join(Char.AND);
	},
	firstToUpperCase: function (str) {
		if (!typeIs(str, String.TYPE_NAME)) errorCast(str, String);
		return str.charAt(0).toUpperCase() + str.slice(1);
	},
	firstToLowserCase: function (str) {
		if (!typeIs(str, String.TYPE_NAME)) errorCast(str, String);
		return str.charAt(0).toLowerCase() + str.slice(1);
	}
};

const MathUtil = {
	/*
	 * 代码来自：https://tool.lu/hexconvert/
	 * 有修改。
	 *
	 * 进制转换函数。
	 * 有三个参数：
	 *   第一个参数支持的数据类型包括字符串和数字，
	 *     当第一个参数的数据类型为数字（typeof === Number.TYPE_NAME），
	 *       且没有提供第三个参数，则第二个参数的值作为输出参数处理。
	 *   第二个参数是输入进制基数，
	 *      如果不提供该参数，则判断输入的数字为10进制；
	 *      如果输入的字符串中含有该进制不认可的字符，则返回NaN；
	 *      如果hexConvert 不支持该进制，则抛出错误。
	 *   第三个参数是输出进制基数，
	 *      当第一个参数的数据类型为数字（typeof === Number.TYPE_NAME），该参数无效，
	 *        以第二个参数作为输出进制基数进行处理
	 *      如果不提供该参数，则判断输入的数字为10进制；
	 *      如果hexConvert 不支持该进制，则抛出错误。
	 */
	hexConvert: (function () {
		const BIN = 2,
			SIX = 6,
			OCT = 8,
			DEC = 10,
			HEX = 16,
			TWENTY_SIX = 26,
			SIXTY_TWO = 62
		SIXTY_FOUR = 64;

		const BIN_START = "0b",
			OCT_START = "0o",
			HEX_START = "0x"

		const NaN_STR = Number.NaN_TYPE_NAME;
		const HEX_CHARS = {};
		HEX_CHARS[DEC] = "0123456789";
		HEX_CHARS[HEX] = HEX_CHARS[DEC] + "ABCDEF";
		HEX_CHARS[TWENTY_SIX] = "abcdefghijklmnopqrstuvwxyz";
		HEX_CHARS[SIXTY_FOUR] = (HEX_CHARS[DEC] + HEX_CHARS[TWENTY_SIX] + HEX_CHARS[TWENTY_SIX].toUpperCase()).replace(/[Oo01lI]/g, String.BLANK) + "!@$&#%";
		HEX_CHARS[SIXTY_TWO] = HEX_CHARS[SIXTY_FOUR].slice(2);

		// Returns a string representation of the given number for the given alphabet:
		function toAlphabet(num, alphabet) {
			var base = alphabet.length;
			var digits = [];	// these will be in reverse order since arrays are stacks

			// execute at least once, even if num is 0, since we should return the "0":
			do {
				digits.push(num % base);	// TODO handle negatives properly?
				num = Math.floor(num / base);
			} while (num > 0);

			var chars = [];
			while (digits.length) {
				chars.push(alphabet[digits.pop()]);
			}
			return chars.join(String.BLANK);
		};

		// Returns an integer representation of the given string for the given alphabet:
		function fromAlphabet(str, alphabet) {
			var base = alphabet.length;
			var pos = 0;
			var num = 0;

			for (let chr of str) {
				let at = alphabet.indexOf(chr);
				if (at === -1) return NaN; // 因为返回的类型都是数字，所以这里直接返回 NaN
				num += Math.pow(base, pos) * at;
				pos++;
			}

			return num;
		};

		function fromBase(str, base) {

			switch (base) {
				case BIN:
					str = BIN_START + str;
					return Number(str);
				case OCT:
					str = OCT_START + str;
					return Number(str);
				case DEC:
					return Number(str);
				case HEX:
					str = HEX_START + str;
					return Number(str);
				default:
					return fromAlphabet(str, HEX_CHARS[base]);
			}
		};

		function hexConvert(num, inBase = DEC, outBase = DEC) {

			inBase = Number(inBase);
			outBase = Number(outBase);

			if (inBase > HEX && !(inBase in HEX_CHARS)) illegalArguments("不支持的输入进制基数：" + inBase);
			if (outBase > HEX && !(outBase in HEX_CHARS)) illegalArguments("不支持的输出进制基数：" + outBase);

			let type = typeOf(num);
			switch (type) {
				case String.TYPE_NAME:
					num = fromBase(num, inBase);
					if (Object.is(num, NaN)) return NaN_STR;
					break;
				case Number.TYPE_NAME:
					outBase = inBase;
					break;
				default:
					illegalArguments("不被支持的参数类型：" + type);
			}

			let hexChars = (outBase < DEC) ? HEX_CHARS[DEC].slice(0, outBase) : HEX_CHARS[outBase];
			return toAlphabet(num, hexChars);
		}

		hexConvert.BIN = BIN;
		hexConvert.OCT = OCT;
		hexConvert.DEC = DEC;
		hexConvert.HEX = HEX;
		hexConvert.TWENTY_SIX = TWENTY_SIX;
		hexConvert.SIXTY_TWO = SIXTY_TWO;
		hexConvert.SIXTY_FOUR = SIXTY_FOUR;
		return hexConvert;
	})(),
	PrimeNumber: (function () {

		const PRIME_IN_50 = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]; // 预置50以内的所有质数

		function getPrimeInInputStartsWithFrom(primes, from) {

			let output = [];

			for (let i = primes.length - 1; i >= 0; i--) {
				if (primes[i] < from) break;
				output.unshift(primes[i]);
			}

			if (from < 2) {
				output.unshift(2);
			}

			return output;
		}

		return {
			calcByInput: (from, to) => {

				// 错误检查
				if (!Number.isNumber(from)) errorCast(from, Number);
				if (!Number.isNumber(to)) errorCast(to, Number);
				if (from > to) unsupportedOperation("开始数必须大于结束数");
				if (to < 0 || from < 0) unsupportedOperation("开始数必须大于 0");

				let primes = PRIME_IN_50.slice();
				let output = getPrimeInInputStartsWithFrom(primes, from);

				IS_PRIME: for (let i = 53; i < to; i += 2) {

					for (let j = 0; j < primes.length; j++) {
						if (i % primes[j] === 0) continue IS_PRIME;
					}

					primes.push(i);
					if (i >= from) {
						output.push(i);
					}
				}

				return output;
			},
			is: (input) => {

				if (!typeIs(input, Number.TYPE_NAME)) errorCast(input, Number);

				let inputRoot = Math.sqrt(input);

				for (let i = 0; i < PRIME_IN_50.length; i++) {
					let now = PRIME_IN_50[i];
					if (now > inputRoot) return true;
					if (input % now === 0) return false;
				}

				for (let i = 51; i < inputRoot; i += 2) {
					if (input % i === 0) return false;
				}

				return true;
			}
		};
	})()
};

const ObjectUtil = {
	/**
	 * 迭代器
	 */
	iterator: (obj) => {
		return new Iterator(obj);
	},
	hasOwnProperty: hasOwnProperty,
	override: function (obj, name, callback) {

		var proto = obj[name];

		obj[name] = callback(function () {
			return proto.apply(obj, arguments);
		});
	},
	argumentsToArray: function () {
		return Array.of(arguments);
	},
	clone: objectClone,
	/*
	 * 通过 Type 类来获得相关 type 的信息
	 */
	getType: getType
};

const CharUtil = (function () {

	function invaildCharacter(input) {
		throw new Error(input + " 不是合法的字符");
	}

	const ZERO = 0x0030,
		NINE = 0x0039,
		UPPER_A = 0x0041,
		UPPER_Z = 0x005A,
		LOWER_A = 0x0061,
		LOWER_Z = 0x007A;

	// TODO 这个函数有点问题，先暂时不用
	// function __isNumber(number) {
	// 	if (!isChar(number)) invaildCharacter(number);
	// 	var code = number.charCodeAt(0);
	// 	return code >= ZERO && code <= NINE;
	// }

	function isAlphabet(input) {
		if (!isChar(input)) invaildCharacter(input);
		var code = letter.charCodeAt(0);
		return (code >= UPPER_A && code <= UPPER_Z) || (code >= LOWER_A && code <= LOWER_Z);
	}

	function isChar(str) {
		if (!typeIs(str, String.TYPE_NAME)) errorCast(str, String);
		return 1 === str.length;
	}

	return {
		isChar: isChar,
		isNumber: Number.isNumber,
		isAlphabet: isAlphabet,
		isNumberOrAlphabet: function (arg) {
			return Number.isNumber(arg) || isAlphabet(arg);
		},
		isASCII(input) {
			if (!isChar(input)) invaildCharacter(input);
			return input.charAodeAt(0) < 128;
		},
		isSpace: function (input) {
			if (!isChar(input)) invaildCharacter(input);
			// return Array.has(SPACE, input);
			return Char.Space.REGX.test(input);
		},
		change: function (value, count) {
			if (!Number.isNumber(count)) errorCast(count, Number);
			if (isChar(value)) {
				return String.fromCharCode(value.charCodeAt(0) + count);
			} else {
				unsupportedOperation(value + " 不是合法的字符");
			}
		},
		compare: function (char1, char2) {
			if (!isChar(char1)) invaildCharacter(char1);
			if (!isChar(char2)) invaildCharacter(char2);
			return char1.charCodeAt(0) - char2.charCodeAt(0);
		},
		asUnicodeEncode: function (input) {
			var code;
			if (!Number.isNumber(input)) {
				if (!isChar(input)) invaildCharacter(input);
				code = (input.charCodeAt(0)).toString(16);
			} else {
				code = (input).toString();
			}
			code = code.toUpperCase();
			switch (code.length) {
				case 1:
					code = "000" + code;
					break;
				case 2:
					code = "00" + code;
					break;
				case 3:
					code = "0" + code;
					break;
				default:
					break;
			}
			return "\\u" + code;
		},
		ZERO: ZERO,
		NINE: NINE,
		UPPER_A: UPPER_A,
		UPPER_Z: UPPER_Z,
		LOWER_A: LOWER_A,
		LOWER_Z: LOWER_Z
	};
})();

const NumberUtil = {
	addBeforeZero: function (arg, length) {
		if (!typeIs(arg, Number.TYPE_NAME)) unsupportedType(arg);
		if (!typeIs(length, Number.TYPE_NAME)) unsupportedType(length);

		var r = [];
		for (let i = 0; i < length; i++) {
			r.push("0");
		}
		return r.join(EMPTY_STRING) + arg;
	},
	withComma: (num, cutSize = 3) => {

		let sNum = (num || 0).toString(), result = String.BLANK;
		while (sNum.length > cutSize) {
			result = Char.COMMA + num.slice(-cutSize) + result;
			sNum = sNum.slice(0, sNum.length - cutSize);
		}
		if (sNum) {
			result = sNum + result;
		}
		return result;
	},
	parseInt: function (num, nag) {
		return parseNumber(num, nag, parseInt);
	},
	parseFloat: function (num, nag) {
		return parseNumber(num, nag, parseFloat);
	}
};

module.exports = exports = {
	getNull: () => {
		return Null;
	},
	getUndefined: () => {
		return Undefined;
	},
	Interface: Interface,
	Iterator: Iterator,
	MathUtil: MathUtil,
	ObjectUtil: ObjectUtil,
	StringUtil: StringUtil,
	NumberUtil: NumberUtil,
	CharUtil: CharUtil,
	Types: Types
}