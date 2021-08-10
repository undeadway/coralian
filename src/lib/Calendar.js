const { hasOwnProperty, formatString } = require("./../base/common");
const { unsupportedType, unsupportedOperation, errorCast } = Error;
const { isNumber } = Number;

// 一天的毫秒数
const ONE_DAY_MILLISECONDS = 24 * 3600 * 1000;
// 默认对时间进行格式化
const DEFAULT_DT_FORMAT = "YYYY-MM-DD hh:mm:ss";

// 中文的周几
const LONG_CHINESE_WEEK = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	SHORT_CHINESE_WEEK = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
// 地支
const EARTHLY_BRANCH = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
// 天干
const CELESTIAL_STEM = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
// 生肖
const CHINESE_ZODIAC = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const SEXAGENARY_CYCLE_FIRST = 4; // 公元 4年 甲子年
// 英文的周几
const ENGLISH_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// 中文的几月
const CHINESE_MONTH = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
// 英文的几月
const ENGLISH_MONTH = ["January", "February", "March", "April", "May", "June", "July", "Augst", "September",
	"October", "November", "December"
];
// 一个月有几天
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const CHINESE_CALANER = ["zh", "xq", "yue", "nian"],
	ONE_COUNT = ["M", "D", "h", "m", "s"];
const TEN = 10,
	TWELVE = 12,
	THIRTY = 30,
	SEVEN = 7,
	TWENTY_NINE = 29,
	THIRTH_ONE = 31;

function formatTime(date, format) {
	if (!(date instanceof Date)) {
		errorCast(date, Date);
	}
	format = format || DEFAULT_DT_FORMAT;
	var tmpMonth = date.getMonth();
	var tmpDay = date.getDay();
	var o = {
		"YY+": date.getFullYear(),
		"M+": (tmpMonth + 1), // month
		"yue": CHINESE_MONTH[tmpMonth],
		"month": ENGLISH_MONTH[tmpMonth],
		"mon": ENGLISH_MONTH[tmpMonth].slice(0, 3),
		"D+": date.getDate(), // day
		"h+": date.getHours(), // hour
		"m+": date.getMinutes(), // minute
		"s+": date.getSeconds(), // second
		"ms": date.getMilliseconds(), // millisecond
		"zh": SHORT_CHINESE_WEEK[tmpDay],
		"xq": LONG_CHINESE_WEEK[tmpDay],
		"w": ENGLISH_WEEK[tmpDay].slice(0, 3),
		"week": ENGLISH_WEEK[tmpDay]
	};

	for (let k in o) {
		if (hasOwnProperty(o, k)) {

			let regExp = new RegExp("(" + k + ")");
			if (regExp.test(format)) {
				let regxVal = format.match(regExp[0]);
				let val = o[k];
				if (Array.has(CHINESE_CALANER, k)) {
					format = format.replace(regxVal, val);
				} else {
					if (!Array.has(ONE_COUNT, RegExp.$1) && val < 10) {
						val = "0" + val;
					}
					format = format.replace(regxVal, val);
				}
			}
		}
	}
	return format;
}

function instanceTime(arg, format) {
	if (!arg) {
		return new Date();
	} else if (arg instanceof Date) {
		return arg;
	} else if (isNumber(arg)) {
		let _date = new Date();
		format = format || 8;
		switch (format) {
			case 0:
				_date.setFullYear(arg);
				break;
			case 1:
				_data.setYear(arg);
				break;
			case 2:
				_data.setMonth(parseInt(arg) - 1);
				break;
			case 4:
				_data.setDate(arg);
				break;
			case 6:
				_date.setYear(parseInt(arg / 10000));
				_date.setMonth(parseInt(arg / 100) % 100 - 1);
				_date.setDate(arg % 100);
				break;
			case 8:
				_date.setFullYear(parseInt(arg / 10000));
				_date.setMonth(parseInt(arg / 100) % 100 - 1);
				_date.setDate(arg % 100);
				break;
			case 16:
				_date.setTime(arg);
				break;
			default:
				unsupportedOperation("所选择的格式化参数不正确");
		}
		return _date;
	} else {
		unsupportedType(arg);
	}
}

function isLeapYear(year) {
	return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

function checkMonthIsValid(month) {
	if (!isNumber(month)) errorCast(month, Number);
	if (month < 1 || 12 < month) unsupportedOperation(month + " 不是一个合法的月份");
}

function checkYearIsValid(year) {
	if (!isNumber(year)) errorCast(year, Number);
}

function getMonthDays(year, month) {

	var _isLeapYear = isLeapYear(year);

	return (month === 1 && _isLeapYear) ? TWENTY_NINE : MONTH_DAYS[month];
}

module.exports = exports = {
	/**
	 * 得到一定时间内的日历（公历表示，农历暂时不考虑）
	 * 得到一个二维表格，每行为7 第一天之前留空，最后剩余留空
	 * 
	 * 示例效果如下：
	 * [ [null, null, 1, 2, 3, 4, 5],
	 * [6, 7, 8, 9, 10, 11, 12],
	 * [13, 14, 15, 16, 17, 18, 19],
	 * [20, 21, 22, 23, 24, 25, 26],
	 * [27, 28, 29, 30, null, null, null] ]
	 * 
	 * 本函数只有两种重载：
	 *  1 参数指定：year，month，得到 year 年 month 月的月历
	 *  2 无参，得到当前月的月历
	 */
	monthly: function (year, month) {

		var date = year;
		if (year instanceof Date) {
			month = year.getMonth();
			year = year.getFullYear();
		} else {
			if (year) {
				checkYearIsValid(year);
			}
			if (month) {
				checkMonthIsValid(month);
				month -= 1;
			}
			date = new Date();
			if (year) {
				date.setYear(year);
			}
			if (month) {
				date.setMonth(month);
			}
		}
		date.setDate(1); // 月历固定每个月1号
		var weekDay = date.getDay();

		var days = 0,
			result = [],
			monthDays = getMonthDays(year, month);

		while (true) {
			if (days >= monthDays) break;
			let week = [null, null, null, null, null, null, null];
			for (let i = weekDay; i < 7; i++) {
				if (++days <= monthDays) {
					week[i] = days;
				} else {
					break;
				}
			}
			weekDay = 0;
			result.push(week);
		}

		return result;
	},
	/*
	 * today 代表目标日期，如果没有这个参数默认取“今天” week
	 * 代表要取的下一个星期几，如果没有这个参数默认取下一个星期天
	 */
	nextWeekDay: function (week, today) {
		var now = new Date();
		if (today) {
			now.setDate(today);
		}
		week = 7 - (week || now.getDay());

		return new Date(now.getTime() + ONE_DAY_MILLISECONDS * week);
	},
	// 返回被格式化之后的当前时间
	getTime: function (time, format) {
		if (time && !typeIs(time, Number.TYPE_NAME)) {
			time = parseInt(time);
		}
		return formatTime(instanceTime(time, 16), format);
	},
	formatTime: formatTime,
	instanceTime: instanceTime,
	isLeapYear: function (year) {

		if (!isNumber(year)) {
			errorCast(year, Number);
		}

		return isLeapYear(year);
	},
	getMonthDays: function (year, month) {

		checkYearIsValid(year);
		checkMonthIsValid(month);

		return getMonthDays(year, month);
	},
	getWeekDay: function (time, format) {
		return formatString(instanceTime(time, format || 16));
	},
	// 获得农历表示法
	ChineseCalendar: {
		getChineseZodiac: function (year) {
			checkYearIsValid(year);
			return CHINESE_ZODIAC[(year - CHINESE_SEXAGENARY_CYCLE_FIRST) % TWELVE];
		},
		getCelestialStem: function (year) {
			checkYearIsValid(year);
			var stem = CELESTIAL_STEM[(year - SEXAGENARY_CYCLE_FIRST) % TEN] +
				EARTHLY_BRANCH[(year - SEXAGENARY_CYCLE_FIRST) % TWELVE];

			return stem;
		},
		/*
		 * 农历年表示法暂时不支持
		 */
		getSpringFestival: function (year) {
			// checkYearIsValid(year);
			unsupportedOperation("暂不支持农历年表示法");
		},
		getMonthlyCalendar: function (year) {
			// checkYearIsValid(year);
			unsupportedOperation("暂不支持农历年表示法");

		}
	}
};

Object.defineProperty(exports, "YYYY", {
	value: 0,
	writable: false
});
Object.defineProperty(exports, "YY", {
	value: 1,
	writable: false
});
Object.defineProperty(exports, "Month", {
	value: 2,
	writable: false
});
Object.defineProperty(exports, "Date", {
	value: 4,
	writable: false
});
Object.defineProperty(exports, "YYMMDD", {
	value: 6,
	writable: false
});
Object.defineProperty(exports, "YYYYMMDD", {
	value: 8,
	writable: false
});
Object.defineProperty(exports, "MILLISECOND", {
	value: 16,
	writable: false
});
Object.defineProperty(exports, "ONE_DAY_MILLISECONDS", {
	value: ONE_DAY_MILLISECONDS,
	writable: false
});
Object.defineProperty(exports, "CHINESE_MONTH", {
	value: CHINESE_MONTH,
	writable: false
});
Object.defineProperty(exports, "ENGLISH_WEEK", {
	value: ENGLISH_WEEK,
	writable: false
});
Object.defineProperty(exports, "SHORT_ENGLISH_WEEK", {
	value: function () {
		var ew = [];
		for (let i = 0, len = ENGLISH_WEEK.length; i < len; i++) {
			ew[i] = ENGLISH_WEEK[i].slice(0, 3);
		}
		return ew;
	},
	writable: false
});
Object.defineProperty(exports, "LONG_CHINESE_WEEK", {
	value: LONG_CHINESE_WEEK,
	writable: false
});
Object.defineProperty(exports, "SHORT_CHINESE_WEEK", {
	value: SHORT_CHINESE_WEEK,
	writable: false
});
Object.defineProperty(exports, "ENGLISH_MONTH", {
	value: ENGLISH_MONTH,
	writable: false
});
Object.defineProperty(exports, "SHORT_ENGLISH_MONTH", {
	value: function () {
		var em = [];
		for (let i = 0, len = ENGLISH_MONTH.length; i < len; i++) {
			em[i] = ENGLISH_MONTH[i].slice(0, 3);
		}
		return em;
	},
	writable: false
});