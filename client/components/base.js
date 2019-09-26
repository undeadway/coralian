function getScrollTop() {
	return document.body.scrollTop || document.documentElement.scrollTop;
}
exports.getScrollTop = getScrollTop;

function newWindow() {
	return window.open.apply(null, arguments);
}
exports.newWindow = newWindow;