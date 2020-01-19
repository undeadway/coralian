/*
 * 因为客户端 会用到 HTMLCollection 这些只有浏览器中才会出现的元素，
 * 所以先把 forEach 这个方法覆盖掉
 */
Coralian.util.ObjectUtil.override(Object, 'forEach', function (method) {
	return function (obj, callback) {
		if (obj instanceof HTMLCollection) {
			for (let i = 0, len = obj.length; i < len; i++) {
				let result = callback(i, obj[i]);
				if (false === result) break;
				if (true === result) continue;
			}
		} else {
			return method(obj, callback);
		}
	}
});

function getScrollTop() {
	return document.body.scrollTop || document.documentElement.scrollTop;
}
exports.getScrollTop = getScrollTop;

function newWindow() {
	return window.open.apply(null, arguments);
}
exports.newWindow = newWindow;