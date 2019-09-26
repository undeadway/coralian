const ALL_CASE = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER_CASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBER = "1234567890";
const RAND_CODES = ALL_CASE + NUMBER;

function getRand(type, length) {

	var key = [],
		times = type.length;
	for (let i = 0; i < length; i++) {
		key[i] = type[parseInt(Math.random() * times)];
	}

	return key.join(EMPTY_STRING);
}

module.exports = exports = {
	getRandCode: function (length) {
		return getRand(RAND_CODES, length);
	},
	randAllCase: function (length) {
		return getRand(ALL_CASE, length);
	},
	randUpperCase: function (length) {
		return getRand(UPPER_CASE, length);
	},
	randLowerCase: function (length) {
		return getRand(LOWER_CASE, length);
	},
	randNumber: function (length) {
		length = length || 16;
		if (length > 16) {
			throw new Error("最多只能获取不超过 16 位的整数");
		} else {
			return parseInt(Math.random() * Math.pow(10, length));
		}
	},
	randNumberAndLetter: function (length) {
		var key = [],
			cases, num;
		switch (arguments[1]) {
			case 0:
				cases = ALL_CASE + NUMBER;
				num = 62;
				break;
			case 1:
				cases = UPPER_CASE + NUMBER;
				num = 36;
				break;
			case 2:
				cases = LOWER_CASE + NUMBER;
				num = 36;
				break;
			default:
				break;
		}
		for (let i = 0; i < length; i++) {
			key[i] = cases[parseInt(Math.random() * num)];
		}
		return key;
	},
	ALL_CASE: 0,
	UPPER_CASE: 1,
	LOWER_CASE: 2
};