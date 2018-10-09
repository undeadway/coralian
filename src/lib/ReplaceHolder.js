let replaceElement = require("../base/common").replaceElement;
let {LOOP_REG_START, LOOP_REG_END, LOOP_IN_START, DEFAULT_SURFIX, LOOP_REG_START_L} = replaceElement;

function replaceLoop(str, objs, callback) {
	var result = [];
	while (true) {
		let index = str.indexOf(LOOP_REG_START);
		if (index > 0) {
			result.push(str.slice(0, index));
			str = str.slice(index);
		} else if (index < 0) {
			result.push(str);
			break;
		}
		let firstEnd = str.indexOf(DEFAULT_SURFIX),
			action = str.slice(LOOP_REG_START_L, firstEnd);
		var end = LOOP_REG_END + action + DEFAULT_SURFIX;
		let inStr = str.slice(firstEnd + 1, str.indexOf(end));
		let obj = objs,
			tmpAction = action.split(".");
		for (let i = 0, len = tmpAction.length; i < len; i++) {
			if (!obj) break;
			obj = obj[tmpAction[i]];
		}

		if (obj !== null && obj !== undefined) {
			let isArr = Array.isArray(obj);
			let keys = isArr ? obj : Object.keys(obj);
			for (let i = 0, len = keys.length; i < len; i++) {
				let o = obj[isArr ? i : keys[i]];
				let loopStr = inStr; // 定义循环所使用的变量
				loopStr = loopStr.replace(new RegExp(LOOP_IN_START + "id}", "g"), i);
				loopStr = loopStr.replace(new RegExp(LOOP_IN_START + "key}", "g"), keys[i]);
				if ('string' === typeof o) {
					result.push(loopStr.replace(new RegExp(LOOP_IN_START + "text}", "g"), keys[i]));
				} else {
					// 递归查找子循环
					loopStr = replaceLoop(loopStr, o);
					// 替换内部元素
					loopStr = replaceElement(loopStr, o, LOOP_IN_START + action + ".");
					loopStr = callback(loopStr, o, action + ".");
					result.push(loopStr);
				}
			}
		}
		str = str.slice(str.indexOf(end) + end.length);
	}

	return result.join(String.BLANK);
}

module.exports = exports = {
	replaceElement: replaceElement,
	replaceLoop: replaceLoop,
	/*
	 * html 替换器
	 */
	htmlEscape: function (str, aspect) {

		str = str.replace(/\&/g, "&amp;");

		var first, second, third, forth;
		if (aspect) {
			first = aspect.first;
			second = aspect.second;
			third = aspect.third;
			forth = aspect.forth;
		}

		str = (!!first) ? first(str) : str;

		str = str.replace(/  /ig, ' &nbsp;');
		str = str.replace(/\t/ig, '&nbsp;&nbsp;&nbsp;&nbsp;\uFEFF'); // 制表符这么写主要是为了满足表现形式和制表符相同（不会换行）

		str = (!!second) ? second(str) : str;

		str = str.replace(/</ig, '&lt;');
		str = str.replace(/>/ig, '&gt;');

		str = (!!third) ? third(str) : str;

		str = str.replace(/(\r\n|\n|\r)/ig, '<br />');

		str = (!!forth) ? forth(str) : str;

		return str;
	}
};