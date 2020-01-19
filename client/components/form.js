$.fn.parseForm = function () {
	var serializeObj = {};
	var array = this.serializeArray();
	var str = this.serialize();
	$(array).each(function () {
		if (serializeObj[this.name]) {
			if ($.isArray(serializeObj[this.name])) {
				serializeObj[this.name].push(this.value);
			} else {
				serializeObj[this.name] = [serializeObj[this.name], this.value];
			}
		} else {
			serializeObj[this.name] = this.value;
		}
	});
	return serializeObj;
};

module.exports = function (index = 0) {

	const frm = $(document.forms[index]);

	return {
		reset: function () {
			frm[0].reset();
		},
		submit: function (url, before, after) {

			var data = frm.parseForm();
			// 前切片
			if (!!before) {
				var result = before(data);
				// 当返回 false 的时候，直接退出博客提交
				if (!result) return;
			}

			$.post({
				url: url,
				data: data,
				parse: true,
				dataType: "json",
				success: function (req) {
					// 后切片
					if (after) after(req);
				}
			});
		}
	};
};