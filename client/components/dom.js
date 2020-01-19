module.exports = exports = {
	create: function (tag, attr, html) {
		var element = $(`<${tag}></${tag}>`);
		if (!Object.isEmpty(attr)) {
			element.attr(attr);
		}
		if (html) {
			element.html(html);
		}
		return element;
	}
}