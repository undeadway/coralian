
const { HttpRequestMethod, HttpStatusCode, MimeType } = Coralian.constants;

function ajax(arg) {

	var url = arg.url,
		method = arg.method || HttpRequestMethod.GET,
		data = arg.data;
	var success = arg.success || doNothing,
		fail = arg.fail || doNothing,
		parse = arg.parse || false,
		ignoreWarning = arg.ignoreWarning || false;
	var xhr = new XMLHttpRequest();

	if (null !== data && undefined !== data) {
		data = queryString(data);
	}

	if (method === HttpRequestMethod.GET && !!data) {
		url += "?" + data;
	}

	if (ignoreWarning && (!String.startsWith(url, "/") && !String.startsWith(url, ".")) &&
		!confirm('所请求的地址可能含有危害您电脑安全的信息，否继续载入？')) return;

	// 超时处理，当请求在 120 秒之后还没反应的时候，判断 HTTP 请求超时
	xhr.timeout = 120000;
	xhr.ontimeout = () => {
		xhr.abort();
		xhr.onreadystatechange = doNothing;
		var timeout = arg.timeout || doNothing;
		timeout();
	}

	xhr.onreadystatechange = function () {

		if (xhr.readyState !== 4) return;

		let contentType = xhr.getResponseHeader("Content-Type");
		let mime = contentType.split(";")[0];

		let req;
		if (parse || mime === MimeType.JSON) {
			try {
				req = JSONparse(xhr.responseText);
			} catch (e) {
				alert("不是有效的JSON格式。");
				return;
			}
		} else {
			req = xhr.responseText;
			if (String.contains(req, '<script') && !confirm('页面包含不安全元素，是否继续载入？')) return;
		}

		switch (xhr.status) {
			case HttpStatusCode.OK:
				success(req);
				break;
			case HttpStatusCode.FORBIDDEN:
				alert(req.message);
				break;
			case HttpStatusCode.NOT_FOUND:
				alert("找不到请求的地址");
				break;
			case HttpStatusCode.GATEWAY_TIMEOUT:
				ajaxTimeout();
				break;
			default:
				fail();
		}
	};
	xhr.open(method, url, true);

	switch (method) {
		case HttpRequestMethod.GET:
			break;
		case HttpRequestMethod.PUT:
		case HttpRequestMethod.POST:
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			break;
		case HttpRequestMethod.DELETE:
		case HttpRequestMethod.CONNECT:
		case HttpRequestMethod.HEAD:
		case HttpRequestMethod.OPTIONS:
		case HttpRequestMethod.TRACE:
		case HttpRequestMethod.PATCH:
		default:
			unsupportedOperation();
	}
	xhr.send(data);
}

Object.forEach(HttpRequestMethod, (k, v) => {
	ajax[k.toLowerCase()] = (arg) => {
		arg.method = v;
		ajax(arg);
	}
});

exports = module.exports = ajax;