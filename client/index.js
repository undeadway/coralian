Coralian.browserOnly();

function isHTMLElement(value) {
	return value instanceof HTMLElement;
}

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

Coralian.client = (function() {

	var output = {};
	var components = require("fs").readdirSync("./modules");
	for (component of components) {
		output[component] = require("./component/" + component);
	}

	return output;

});