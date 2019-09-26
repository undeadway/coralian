
exports.cutTitle = function (str, max, cut) {
	if (max < str.length) {
		str = str.slice(0, cut) + " ......";
	}
	return str;
};
exports.forwardTo = function (url) {
	location.href = url;
};

exports.newWindow = require("./base").newWindow;

exports.pathArray = function () {
	var path = (doc.location.href).split('/');
	var arr = path[path.length - 1].split('.');
	return arr;
};
/*
 * showPage 只负责显示页码，
 * 具体的现实样式交由外部 CSS 来自行实现
 */
exports.showPage = (function () {
	function showLoop(pages, changeId, start, now, end) {
		if (end === 0) {
			pages.push('<span id="nowpage" title="当前页">1</span>');
		} else {
			for (; start < end; start++) {
				if (start !== now) {
					pages.push('<a class="showpage" href="javascript:front.onChange.page(' + changeId + ',' + start +
						')" title="前往第 ' + (start + 1) + ' 页">' + (start + 1) + '</a>');
				} else {
					pages.push('<span id="nowpage" title="当前页">' + (now + 1) + '</span>');
				}
			}
		}
	}
	return function (changeId, now, total) {
		var pages = [];
		/*
		 * total <= 10 一口气全部显示，且没随机页面跳转
		 * 
		 * 1 2 3 4 5 6 7 8 9 10
		 */
		if (total < 10) {
			showLoop(pages, changeId, 0, now, total + 1);
		} else {
			/*
			 * total > 10 && now < 5
			 * 
			 * 1 2 3 4 5 ... >> >|
			 */
			if (now < 4) { // 写4的原因是在按到5时，已经是最后一页，所以需要进行换页操作，使用下一种表法方式来表达
				showLoop(pages, changeId, 0, now, 5);
				pages.push('...');
				pages.push('<a id="nextpage" href="javascript:front.onChange.page(' + changeId + ',' + (now + 1) +
					')" title="前往下一页（' + (now + 2) + '）">&gt&gt</a>');
				pages.push('<a id="toend" href="javascript:front.onChange.page(' + changeId + ',' + total +
					')" title="前往最终页（' + (total + 1) + '）">&gt|</a>');
			}
			/*
			 * total > 10 && now > total - 5
			 * 
			 * |< << ... 19 20 21 22 23
			 */
			else if (total - 4 < now) {
				pages.push('<a id="tofirst" href="javascript:front.onChange.page(' + changeId +
					',0)" title="前往第一页">|&lt;</a>');
				pages.push('<a id="prevpage" href="javascript:front.onChange.page(' + changeId + ',' + (now - 1) +
					')" title="前往上一页（' + now + '）">&lt;&lt;</a>');
				pages.push('...');
				showLoop(pages, changeId, total - 4, now, total + 1);
			}
			/*
			 * total > 10 && now < total - 5
			 * 
			 * |< << ... 13 14 15 16 17 ... >> >|
			 */
			else {
				pages.push('<a href="javascript:front.onChange.page(' + changeId + ',0)" title="前往第一页">|&lt;</a>');
				pages.push('<a href="javascript:front.onChange.page(' + changeId + ',' + (now - 1) +
					')" title="前往上一页（' + now + '）">&lt;&lt;</a>');
				pages.push('...');
				showLoop(pages, changeId, now - 2, now, now + 3);
				pages.push('...');
				pages.push('<a id="nextpage" href="javascript:front.onChange.page(' + changeId + ',' + (now + 1) +
					')" title="前往下一页（' + (now + 2) + '）">&gt;&gt;</a>');
				pages.push('<a id="toend" href="javascript:front.onChange.page(' + changeId + ',' + total +
					')" title="前往最终页（' + (total + 1) + '）">&gt|</a>');
			}
		}
		return pages.join('');
	};
})();

exports.getUrlParam = function (name) {

	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	} else {
		return null
	};
}