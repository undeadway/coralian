const Calendar = require("./Calendar");

const UPPER_CASE = /[A-Z]/,
	LOWER_CASE = /[a-z]/,
	NUMBER = /[0-9]/,
	MARKS = /[\@#\$\%\&\*\!\^\+\=\-_\~:\;\,\.\?]/;

function passwordCheckError(msg, id) {
	return {
		message: msg,
		id: id || 'password'
	};
}

function checkPassword(password) {

	if (String.isEmpty(password)) return passwordCheckError('密码不能为空');

	/*
	 * 密码校验必须符合以下两项规则
	 * 1. 长度必须 >= 6 位
	 */
	if (password.length < 6) return passwordCheckError('密码长度最少 6 位');

	/*
	 * 2. 必须包含大小写字母、数字、特殊字符（@#$%&*!^+=-_~:;,.?，不再左列中，以及不是字母、数字的字符被视为非法字符）中的三项
	 *  大写字母 小写字母 数字 特殊字符
	 *  0000 X 0
	 *  0001 X 1
	 *  0010 X 2
	 *  0011 X 3
	 *  0100 X 4
	 *  0101 X 5
	 *  0110 X 6
	 *  0111 O 7
	 *  1000 X 8
	 *  1001 X 9
	 *  1010 X 10
	 *  1011 O 11
	 *  1100 X 12
	 *  1101 O 13
	 *  1110 O 14
	 *  1111 O 15
	 */
	var point = 0;
	if (UPPER_CASE.test(password)) {
		point += 8;
	}
	if (LOWER_CASE.test(password)) {
		point += 4;
	}
	if (NUMBER.test(password)) {
		point += 2;
	}
	if (MARKS.test(password)) {
		point += 1;
	}
	if (point < 13 && point !== 7 && point !== 11)
		return passwordCheckError("密码至少要包含大写字母、小写字母、数字或特殊字符中的三项");

}

/*
 * 身份证号验证
 * 代码来源：http://www.cnblogs.com/xiaoafei1991/p/4309328.html
 * 有修改
 */
function isIDNumber(cardid) {
	//身份证正则表达式(18位) 
	var isIdCard2 = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
	var stard = "10X98765432"; //最后一位身份证的号码
	var first = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //1-17系数
	var sum = 0;
	if (!isIdCard2.test(cardid)) return false;

	var year = cardid.substr(6, 4),
		month = cardid.substr(10, 2),
		day = cardid.substr(12, 2);
	var birthday = cardid.substr(6, 8);
	if (birthday !== Calendar.formatTime(new Date(year, month, day), 'YYYYMMDD')) //校验日期是否合法
		return false;

	for (let i = 0; i < 17; i++) {
		sum += cardid[i] * first[i];
	}
	var result = sum % 11;
	var last = stard[result]; //计算出来的最后一位身份证号码

	return String.last(cardid).toUpperCase() === last.toUpperCase();
}

module.exports = exports = {
	passwordCheckError: passwordCheckError,
	checkPassword: checkPassword,
	isIDNumber: isIDNumber
};