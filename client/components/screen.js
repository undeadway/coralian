exports = module.exports = {
	/*
	 * 代码来源：https://www.zybuluo.com/EncyKe/note/254250
	 * 有修改
	 */
	toPageTop: function () {

		var toTop = getScrollTop();

		// 设置计时器，50毫秒间隔；
		var toTopTimer = setInterval(function () {

			// 设置速度，用等式而不用具体数值是为了产生缓动效果；
			toTop -= Math.ceil(toTop / 5);

			// 作差，产生缓动效果；
			doc.documentElement.scrollTop = doc.body.scrollTop = toTop;
			// 判断是否抵达顶部，若是，停止计时器；
			if (toTop <= 0) {
				clearInterval(toTopTimer);
			};
		}, 50);
	},
	getScrollTop: getScrollTop,
	stopOnScreen: (function () {

		var elements = {};
		elements.id = [];

		function getOffsetTop(o) {

			var top = 0;
			var offsetParent = o;

			while (offsetParent != null && offsetParent != document.body) {

				top += offsetParent.offsetTop;
				offsetParent = offsetParent.offsetParent;
			}

			return top;
		}
		window.onscroll = function () {
			var top = getScrollTop();
			var id = elements.id;
			for (let i = 0, len = id.length; i < len; i++) {
				let element = elements[id[i]];

				top = top - element.top;
				if (top > 0) {
					element.element.style.top = top + "px";
				} else {
					element.element.style.top = 0 + "px";
				}
			}
		};

		return function (id, top) {
			if (!elements[id]) {
				elements[id] = {
					top: top,
					element: $dom.getNode(id)
				};
				elements.id.push(id);
			}
		};
	})()
}