let { hasOwnProperty, Interface, Iterator,objectClone, getType} = require("../base/common");
let {unsupportedOperate, unsupportedOperation, unsupportedType, errorCast} = Error;

module.exports = exports = {
	Interface : Interface,
	Iterator : Iterator,
	MathUtil: {
		/*
		 * 代码来自：https://tool.lu/hexconvert/
		 * 有修改。
		 *
		 * 进制转换函数。
		 * 有三个参数：
		 *   第一个参数支持的数据类型包括字符串和数字，
		 *     当第一个参数的数据类型为数字（typeof === 'number'），
		 *       且没有提供第三个参数，则第二个参数的值作为输出参数处理。
		 *   第二个参数是输入进制基数，
		 *      如果不提供该参数，则判断输入的数字为10进制；
		 *      如果输入的字符串中含有该进制不认可的字符，则返回NaN；
		 *      如果hexConvert 不支持该进制，则抛出错误。
		 *   第三个参数是输出进制基数，
		 *      当第一个参数的数据类型为数字（typeof === 'number'），该参数无效，
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

			const BIN_START = '0b',
				OCT_START = '0o',
				HEX_START = '0x'

			const NaN_STR = 'NaN';
			const HEX_CHARS = {};
			HEX_CHARS[DEC] = '0123456789';
			HEX_CHARS[HEX] = HEX_CHARS[DEC] + 'ABCDEF';
			HEX_CHARS[TWENTY_SIX] = 'abcdefghijklmnopqrstuvwxyz';
			HEX_CHARS[SIXTY_FOUR] = (HEX_CHARS[DEC] + HEX_CHARS[TWENTY_SIX] + HEX_CHARS[TWENTY_SIX].toUpperCase()).replace(/[OolI]/g, '') + '!@$&#%';
			HEX_CHARS[SIXTY_TWO] = HEX_CHARS[SIXTY_FOUR].slice(2);

			// Returns a string representation of the given number for the given alphabet:
			function toAlphabet(num, alphabet) {
				var base = alphabet.length;
				var digits = [];	// these will be in reverse order since arrays are stacks

				// execute at least once, even if num is 0, since we should return the '0':
				do {
					digits.push(num % base);	// TODO handle negatives properly?
					num = Math.floor(num / base);
				} while (num > 0);

				var chars = [];
				while (digits.length) {
					chars.push(alphabet[digits.pop()]);
				}
				return chars.join('');
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

				if (inBase > HEX && !(inBase in HEX_CHARS)) Error.illegalArguments("不支持的输入进制基数：" + inBase);
				if (outBase > HEX && !(outBase in HEX_CHARS)) Error.illegalArguments("不支持的输出进制基数：" + outBase);

				let type = typeOf(num);
				switch (type) {
					case 'string':
						num = fromBase(num, inBase);
						if (Object.is(num, NaN)) return NaN_STR;
						break;
					case 'number':
						outBase = inBase;
						break;
					default:
						Error.illegalArguments("不被支持的参数类型：" + type);
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
				calcPrimeByInput: (from, to) => {

					// 错误检查
					if (!Number.isNumber(from)) Error.errorCast(from, Number);
					if (!Number.isNumber(to)) Error.errorCast(to, Number);
					if (from > to) Error.unsupportedOperate("开始数必须大于结束数");
					if (to < 0 || from < 0) Error.unsupportedOperate("开始数必须大于 0");

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
				isPrimeNumber: (input) => {

					if (!typeIs(input, 'number')) Error.errorCast(input, Number);

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
	},
	/*
	 * Coralian.util.Calendar
	 * 对时间处理的类集合封装了获得历法计算、时间计算等函数 包含对 Calendar 的相关操作
	 */
	ObjectUtil: {
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
	},
	// Coralian.util.StringUtil
	StringUtil: {
		normal: function (input) {
			return input.replace(/<(\/)?(b|i|strike|em|u|strong|sub|sup)>/ig, EMPTY_STRING);
		},
		weight: function (tag) {
			return "<" + tag + ">" + input + "</" + tag + ">";
		},
		queryString: function (obj) {

			if (typeIs(obj, 'string')) {
				return encodeURI(obj);
			}

			var string = [];
			for (var key in obj) {
				if (hasOwnProperty(obj, key)) {
					// 这里 encodeURIComponent 是因为 nodejs 端才这么写，其他服务器语言可能用不着
					// JSON.stringify 这句是因为可能存在包含对象类型的数据
					if (typeIs(obj[key], 'object')) {
						string.push(key + '=' + JSONstringify(encodeURIComponent(obj[key])));
					} else {
						string.push(key + '=' + encodeURIComponent(obj[key]));
					}
				}
			}
			return string.join('&');
		},
		firstToUpperCase: function (str) {
			if (!typeIs(str, 'string')) errorCast(str, String);
			return str.charAt(0).toUpperCase() + str.slice(1);
		},
		firstToLowserCase: function (str) {
			if (!typeIs(str, 'string')) errorCast(str, String);
			return str.charAt(0).toLowserCase() + str.slice(1);
		}
	},
	// Coralian.util.NumberUtil
	NumberUtil: {
		addBeforeZero: function (arg, length) {
			if (!typeIs(arg, 'number')) unsupportedType(arg);
			if (!typeIs(length, 'number')) unsupportedType(length);

			var r = [];
			for (let i = 0; i < length; i++) {
				r.push("0");
			}
			return r.join(EMPTY_STRING) + arg;
		},
		addComma: (num, split) => {

			if (!isNumber(num)) errorCast(num, Number);
			if (split !== undefined && !isNumber(split)) errorCast(split, Number);
	
			split = parseInt(Math.pow(10, split || 3));
	
			var result = String.BLANK;
	
			while (true) {
				let part = num % split;
				num = parseInt(num / split);
	
				rersult = part + result;
				if (num !== 0) {
					result = ',' + result;
				} else {
					break;
				}
			}
	
			return result;
		},
		parseInt: function (num, nag) {
			return parseNumber(num, nag, parseInt);
		},
		parseFloat: function (num, nag) {
			return parseNumber(num, nag, parseFloat);
		}
	},
	CharUtil: (function () {

		function invaildCharacter(input) {
			throw new Error(input + ' 不是合法的字符');
		}

		var ZERO = 0x0030,
			NINE = 0x0039,
			UPPER_A = 0x0041,
			UPPER_Z = 0x005A,
			LOWER_A = 0x0061,
			LOWER_Z = 0x007A;
		var SPACE = [' ', '\t', '\r', '\n', '\r\n', '\u000B', '\f', '\u001C', '\u001D', '\u001E', '\u001F'];

		function __isNumber(number) {
			if (!isChar(input)) invaildCharacter(input);
			var code = number.charCodeAt(0);
			return code >= ZERO && code <= NINE;
		}

		function isAlphabet(input) {
			if (!isChar(input)) invaildCharacter(input);
			var code = letter.charCodeAt(0);
			return (code >= UPPER_A && code <= UPPER_Z) || (code >= LOWER_A && code <= LOWER_Z);
		}

		function isChar(str) {
			if (!typeIs(str, 'string')) errorCast(str, String);
			return 1 === str.length;
		}

		return {
			isChar: isChar,
			isNumber: __isNumber,
			isAlphabet: isAlphabet,
			isNumberOrAlphabet: function (arg) {
				return isNumber(arg) || isAlphabet(arg);
			},
			isASCII(input) {
				if (!isChar(input)) invaildCharacter(input);
				return input.charAodeAt(0) < 128;
			},
			isSpace: function (input) {
				if (!isChar(input)) invaildCharacter(input);
				return Array.has(SPACE, input);
			},
			change: function (value, count) {
				if (!isNumber(count)) errorCast(count, Number);
				if (isChar(value)) {
					return String.fromCharCode(value.charCodeAt(0) + count);
				} else {
					unsupportedOperation(value + ' 不是合法的字符');
				}
			},
			compare: function (char1, char2) {
				if (!isChar(char1)) invaildCharacter(char1);
				if (!isChar(char2)) invaildCharacter(char2);
				return char1.charCodeAt(0) - char2.charCodeAt(0);
			},
			asUnicodeEncode: function (input) {
				var code;
				if (!isNumber(input)) {
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
	})()
}