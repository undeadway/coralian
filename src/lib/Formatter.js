const { Char } = JsConst;

function formatNumber(number) {

	// 目前只实现保留两位小数
	number = (number).toString().split(Char.POINT);

	var after = number[1];
	if (after && after.length > 2) {
		let last = parseInt(after[2]);
		after = parseInt(after.slice(0, 2));
		if (last > 4) {
			after += 1;
		}
	}
	number = number[0] + Char.POINT + (after || 0);

	return number;
}

const DEFAULT_FORMAT_TYPE = "#.00";

module.exports = exports = {
	formatNumber: formatNumber,
	formatFileSize: function (size, type) {
		var formated;
		type = type || DEFAULT_FORMAT_TYPE;
		if (size < 1048576) {
			formated = formatNumber(size / 1024, type) + " KB";
		} else if (size < 1073741824) {
			formated = formatNumber(size / 1048576, type) + " MB";
		} else if (size < 1099511627776) {
			formated = formatNumber(size / 1073741824, type) + " GB";
		} else {
			formated = formatNumber(size / 1099511627776, type) + " TB";
		}
		return formated;
	},
	formatString:  require("./../base/common").formatString
};
