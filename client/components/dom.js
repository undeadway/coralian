const doc = window.document;

const INNER_HTML = 'innerHTML',
	OUTER_HTML = 'outerHTML',
	VALUE = 'value',
	STYLE = 'style';

function getNode(idName) {
	return doc.getElementById(idName);
}

function dom() {

	var elements = {}, names = [],
		size = 0;

	function getNodeName(index) {

		index = index || 0;

		if (isNumber(index)) {
			return names[index];
		}
		return index;
	}

	function createNode(obj) {

		var element, id = null;
		if (typeIs(obj, String.TYPE_NAME)) {
			element = getNode(obj);
			id = obj;
		} else if (isHTMLElement(obj)) {
			element = obj;
			id = obj.id;
		} else {
			unsupportedType(obj);
		}

		names[size] = id;
		elements[id] = element;
		size++;
	}

	function add(objs) {
		if (typeIs(objs, String.TYPE_NAME) || isHTMLElement(objs)) {
			createNode(objs);
		} else if (objs.length === 1) {
			objs = objs[0];
			if (typeIs(objs, String.TYPE_NAME) || isHTMLElement(objs)) {
				createNode(objs);
			} else {
				if (!objs) {
					alert(new Error().stack);
				}
				for (var i = 0, len = objs.length; i < len; i++) {
					createNode(objs[i]);
				}
			}
		} else {
			for (var i = 0, len = objs.length; i < len; i++) {
				createNode(objs[i]);
			}
		}
	}
	add(arguments);

	var instance = {
		/**
		 * 该函数支持两个参数，分别为 index（下标号）和 property（想要取得的对象属性名）
		 * 可以只传入  index 或者 property，也可以都传入，或者什么都不传入。
		 * 不穿入 index 时，默认取第 0 件
		 * 不传入 property 时，默认取 innerHTML
		 * 
		 * 重载模式
		 * Object get() {
		 *     return elements[0].innerHTML;
		 * }
		 * Object get(String property) {
		 *     return elements[0][property];
		 * }
		 * Object get(int index) {
		 *     return elements[index].innerHTML;
		 * }
		 * Object get(int index, String property) {
		 *    return return elements[index][property];
		 * }
		 * Object get(String name, String type) {
		 *    return return elements[name][property];
		 * }
		 */
		get: function (index, property) {
			switch (arguments.length) {
				case 0:
					index = 0;
					property = INNER_HTML;
					break;
				case 1:
					if (Number.isNumber(index)) {
						property = INNER_HTML;
					} else {
						property = index;
						index = 0;
					}
					break;
				case 2:
					index = index || 0;
					property = property || INNER_HTML;
					break;
				default:
					illegalArguments();
			}

			if (!typeIs(property, String.TYPE_NAME)) errorCast(property, String);

			return elements[getNodeName(index)][property];
		},
		/**
		 * 该函数支持三个参数，第一个为需要被设定的 HTML 字符串
		 * 后两个分别为 index（下标号）和 property（想要取得的对象属性名）
		 * 可以只传入 index 或者 type，也可以都传入。
		 * 不穿入 index 时，默认设置到第 0 件 不传入 property 时，默认设置到 innerHTML
		 * 
		 * 重载模式
		 * $ set(String html) {
		 *     elements[0].innerHTML = html;
		 * }
		 * $ set(int index, String html) {
		 *     elements[index].innerHTML = html;
		 * }
		 * $ set(String name, String html) {
		 *     elements[name].innerHTML = html;
		 * }
		 * $ set(int index, String property, String value) {
		 *     elements[index][property] = html;
		 * }
		 * $ set(String name, String property, String value) {
		 *     elements[name][property] = html;
		 * }
		 * $ set(int index, Map value) {
		 *     Object.addAll(value, elements[index]);
		 * }
		 * $ set(String name, Map value) {
		 *     Object.addAll(value, elements[name]);
		 * }
		 */
		set: function (index, property, value) {
			var isString = true;
			switch (arguments.length) {
				case 1: // 只有一个参数：value（index = 0；property = innerHTML）
					value = index;
					index = 0;
					property = INNER_HTML;
					break;
				case 2:
					// 有两个参数：name, value
					value = property;
					switch (typeOf(value)) {
						case String.TYPE_NAME:
							// typeIs(value, String.TYPE_NAME),（property = innerHTML）
							property = INNER_HTML;
							break;
						case Object.TYPE_NAME:
							// typeIs(value, Object.TYPE_NAME)
							isString = false;
							break;
						default:
							illegalArguments();
					}
					break;
				case 3:
					index = index || 0;
					property = property || INNER_HTML;
					break;
				default:
					illegalArguments();
			}

			try {
				if (isString) {
					if (!typeIs(property, String.TYPE_NAME)) errorCast(property, String);
					elements[getNodeName(index)][property] = value;
				} else {
					Object.addAll(value, elements[getNodeName(index)]);
				}
			} catch (e) {
				alert(e.stack);
				alert(getNodeName(index) + "不存在");
			}
			return this;
		},
		/*
		 * 用于简化 set(get) 操作
		 */
		add: function (index, property, value) {

			var node = elements[getNodeName(index)];
			node[property] = value;

		},
		/*
		 * 简化 set(get()) 操作 
		 * TODO 因为使用的是 + ，所以目前只支持 String 对象
		 */
		append: function (value, index, property) {
			this.set(index, property, this.get(index, property) + value);
			return this;
		},
		isEmpty: function () {
			return size === 0;
		},
		size: function () {
			return size;
		},
		/**
		 * 给元素添加如  onclick 这样的操作函数
		 * 
		 * 重载模式
		 * on(String action, Function callback) {
		 *     elements[0]['on' + action] = callback;
		 * }
		 * on(int index, String action, Function callback) {
		 *     elements[index]['on' + action] = callback;
		 * }
		 * on(String index, String action, Function callback) {
		 *     elements[index]['on' + action] = callback;
		 * }
		 */
		on: function (index, action, callback) {
			switch (arguments.length) {
				case 2:
					action = index;
					callback = action;
					index = 0;
					break;
				case 3:
					break;
				default:
					illegalArguments();
			}
			if (!String.startsWith(action, 'on')) {
				action = 'on' + action;
			}
			var e = elements[getNodeName(index)];
			if (!e) {
				throw new Error();
			}
			e[action] = callback;
			return this;
		},
		/**
		 * 直接调用既存的方法
		 * 比如：
		 * event('onclick');
		 * 
		 * 重载模式
		 * event(String method) {
		 *     elements[0][method]();
		 * }
		 * event(int index, String method) {
		 *     elements[index][method]();
		 * }
		 */
		event: function (index, method) {
			switch (arguments.length) {
				case 1:
					method = index;
					index = 0;
					break;
				case 2:
					break;
				default:
					illegalArguments();
			}

			elements[getNodeName(index)][method]();
		},
		/**
		 * 类似于这样的重载：
		 * appendChild(int index,HTMLELement child) {
		 *     elements[index].appendChild(child);
		 * }
		 * appendChild(String name,HTMLELement child) {
		 *     elements[index].appendChild(child);
		 * }
		 * appendChild(HTMLELement child) {
		 *     elements[0].appendChild(child);
		 * }
		 * appendChild(int index,XmlWrapper child) {
		 *     elements[index].appendChild(child);
		 * }
		 * appendChild(String name,XmlWrapper child) {
		 *     elements[index].appendChild(child);
		 * }
		 * appendChild(XmlWrapper child) {
		 *     elements[0].appendChild(child);
		 * }
		 */
		appendChild: function (index, child) {
			if (arguments.length === 1) {
				child = index;
				index = 0;
			}
			if (isXmlWrapper(child)) {
				child = child.render();
			} else {
				unsupportedType(child);
			}

			try {
				elements[getNodeName(index)].appendChild(child);
			} catch (e) {
				alert(getNodeName(index) + "不存在");
			}

			return this;
		},
		getChild: function (index, childPkg, property) {

			return elements[getNodeName(index)];
		},
		removeChild: function (index) {

		},
		newChild: function (index) {
			var element = elements[getNodeName(index)];
			var child = element.createChild();
			return child;
		},
		clear: function () {
			elements = {};
			names = [];
		},
		add: add,
		remove: function (index) {

			delete elements[getNodeName(index)];
			delete names[index];
			size--;
		},
		/**
		 * 类似于这样的重载：
		 * css(int index, Map style) {
		 *     elements[index].style.addAll(style);
		 * }
		 * css(String index, Map style) {
		 *     elements[index].style.addAll(style);
		 * }
		 * css(Map style) {
		 *     elements[0].style.addAll(style);
		 * }
		 */
		css: function (index, style) {
			if (arguments.length === 1) {
				style = index;
				index = 0;
			}

			if (!typeOf(style)) {
				unsupportedType(style);
			}
			if (!typeIs(index, Number.TYPE_NAME, String.TYPE_NAME)) {
				unsupportedType(index);
			}
			var element = elements[getNodeName(index)];

			if (!element) {
				throw new Error('没有元素');
			}

			Object.addAll(style, element.style);

			return this;
		},
		getID: function (index) {
			index = index || 0;
			if (isNaN(index)) {
				errorCast(index, Number);
			}
			return names[index];
		},
		getAllID: function () {
			return Array.clone(names);
		},
		reset: function (index) {
			var element = elements[getNodeName(index)].reset();
		}
	}

	Object.instanceTo(instance, dom);

	return instance;
}

Object.defineProperty(dom, 'INNER_HTML', {
	value: INNER_HTML,
	writable: false
});
Object.defineProperty(dom, 'OUTER_HTML', {
	value: OUTER_HTML,
	writable: false
});
Object.defineProperty(dom, 'VALUE', {
	value: VALUE,
	writable: false
});
Object.defineProperty(dom, 'STYLE', {
	value: STYLE,
	writable: false
});
Object.defineProperty(dom, 'on', {
	value: function (id, name, funcName) {
		getNode(id)[on + name] = funcName;
	},
	writable: false
});
Object.defineProperty(dom, 'set', {
	value: function (id, value, type = INNER_HTML) {
		try {
			getNode(id)[type] = value;
		} catch (e) {
			alert(e.stack);
		}
	},
	writable: false
});
Object.defineProperty(dom, 'get', {
	value: function (id, type = INNER_HTML) {
		return getNode(id)[type];
	},
	writable: false
});
Object.defineProperty(dom, 'appendChild', {
	value: function (id, child) {
		return getNode(id).appendChild(child);
	},
	writable: false
});
Object.defineProperty(dom, 'getNode', {
	value: getNode,
	writable: false
});
Object.defineProperty(dom, 'exists', {
	value: function (id) {
		let node = getNode(id);
		return node !== null;
	},
	writeable: false
})
Object.defineProperty(dom, 'hideElement', {
	value: function (id) {
		getNode(id).style.display = 'none';
	},
	writable: false
});
Object.defineProperty(dom, 'showElement', {
	value: function (id) {
		getNode(id).style.display = 'block';
	},
	writable: false
});
Object.defineProperty(dom, 'removeElement', {
	value: function (id) {
		var e = getNode(id);
		e.parentElement.removeChild(e);
	},
	writable: false
});
Object.defineProperty(dom, 'getTitle', {
	value: function () {
		return doc.title;
	},
	writable: false
});
Object.defineProperty(dom, 'setTitle', {
	value: function (title) {
		doc.title = title;
	},
	writable: false
});
Object.defineProperty(dom, 'create', {
	value: function (tag, property) {
		if (!tag) illegalArguments();
		if (!typeIs(tag, String.TYPE_NAME)) unsupportedType(tag);

		var node = doc.createElement(tag);
		if (property) {
			Object.addAll(property, node);
		}
		return node;
	},
	writable: false
});
Object.defineProperty(dom, 'getNodeByTagName', {
	value: function (tag, index) {
		index = index || 0;
		return doc.getElementsByTagName(tag)[index];
	},
	writeable: false
});
Object.defineProperty(dom, 'getNodesByTagName', {
	value: function (tag) {
		return doc.getElementsByTagName(tag);
	},
	writeable: false
});
Object.defineProperty(dom, 'getNodeByClassName', {
	value: function (className, index) {
		index = index || 0;
		return doc.getElementsByClassName(className)[index];
	},
	writeable: false
});
Object.defineProperty(dom, 'getNodesByClassName', {
	value: function (className) {
		return doc.getElementsByClassName(className)
	},
	writeable: false
});

exports = module.exports = dom;