/*
 * Coralian.logger 只实现最基本的日志记录功能，
 * 以及对日志进行最基本的格式化功能
 */
let formatString = require("../base/common").formatString;
let Calendar = require("./Calendar");

var INFO = 'INFO',
	ERROR = 'ERROR',
	WARN = 'WARN';

var STRING_FORMAT = "[${date}] ${level} ${message}";
var TIME_FORMAT = "YYYY-MM-DD hh:mm:ss.ms";

function format(level, message) {
	return formatString(STRING_FORMAT, {
		date: Calendar.formatTime(new Date(), TIME_FORMAT),
		level: level,
		message: message
	});
}

exports.log = exports.ingo = (str) => {
	console.log(format(INFO, str));
};
exports.err = (err) => {
	console.error(err.message)
	console.error(format(ERROR, err.stack));
};
exports.warn =  (str) => {
	console.warn(format(WARN, str));
};