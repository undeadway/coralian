const { Const } = JsConst;

const UPPER_CASE = /[A-Z]/,
	LOWER_CASE = /[a-z]/,
	NUMBER = /[0-9]/,
	MARKS = /[\@#\$\%\&\*\!\^\+\=\-_\~:\;\,\.\?]/;

function passwordCheckError(msg, id) {
	var e = new Error(msg);
	e.id = id || "password";

	throw e;
}

function isValidPassword(password) {

	if (String.isEmpty(password)) {
		passwordCheckError("密码不能为空");
	}

	/*
	 * 密码校验必须符合以下两项规则
	 * 1. 长度必须 >= 6 位
	 */
	if (password.length < 6) {
		passwordCheckError("密码长度最少 6 位");
	}

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
	if (point < 13 && point !== 7 && point !== 11) {
		return passwordCheckError("密码至少要包含大写字母、小写字母、数字或特殊字符中的三项");
	}
}

module.exports = exports = {
	isValidPassword: isValidPassword,
	// 校验身份证号
	// 来源：https://segmentfault.com/a/1190000010452673
	isValidIdNumber: function (id) {

		// 1 "验证通过!", 0 //校验不通过
		var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
		//号码规则校验
		if (!format.test(id)) return false;

		//区位码校验
		//出生年月日校验   前正则限制起始年份为1900;
		var year = id.substr(6, 4),//身份证年
			month = id.substr(10, 2),//身份证月
			date = id.substr(12, 2),//身份证日
			time = Date.parse(`${month}${Char.HYPHEN}${date}${Char.HYPHEN}${year}`),//身份证日期时间戳date
			nowTime = Date.parse(new Date()),//当前时间戳
			dates = (new Date(year, month, 0)).getDate();//身份证当月天数
		if (time > nowTime || date > dates) return false;

		//校验码判断
		var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   //系数
		var b = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");  //校验码对照表
		var id_array = id.split(String.BLANK);
		var sum = 0;
		for (var k = 0; k < 17; k++) {
			sum += parseInt(id_array[k]) * parseInt(c[k]);
		}

		return id_array[17].toUpperCase() === b[sum % 11].toUpperCase();
	},
	isValidMPhone: function (mphone) {
		return /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(mphone);
	}
};