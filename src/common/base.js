

const side = typeof (window) !== "undefined"; // 设置端点，side = true 客户端 side = false 服务端


const SIDE_ONLY_FMT_STR = "只能在%s中使该功能用";
exports.browserOnly = () => {
	if (!side) throw new Error(formatString(SIDE_ONLY_FMT_STR, "浏览器"));
}

exports.serverOnly = () => {
	if (side) throw new Error(formatString(SIDE_ONLY_FMT_STR, "服务端"));
}

exports.side = side;