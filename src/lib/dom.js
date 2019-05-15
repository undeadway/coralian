const { browserOnly, hasOwnProperty } = require("../base/common");
const { unsupportedType, indexOutOfBounds, errorCast } = Error;
const EMPTY_STRING = String.BLANK;

// 标签
var START_START_TAG = '<',
	START_END_TAG = '</',
	END_TAG = '>',
	ENMPTY_END_TAG = ' />';

// 包括 img 在内没有回标签的标签集合
var NO_BODY_TAG = ['img', 'input', 'br', 'hr', 'title'];

// 不能再在标签内部添加同名标签
var NOT_SAME_TAG = [
	// HTML 体标签
	'html', 'head', 'title', 'body',
	// 其他标签
	'a', 'i', 'b', 'del', 'u', 'strike'
];

var ABEND_TAG = ['script'];

const KEY_NAME = new Map();
KEY_NAME.set('class', 'className');

function getKeyName(key) {
	return KEY_NAME.has(key) ? KEY_NAME.get(key) : key;
}

function XmlWrapper(tag, attribute, xmlType) {

	let _hashcode = '$=!' + (2388 / Math.random() + Math.sin(Date.now()));

	if (!tag || !typeIs(tag, 'string')) throw new Error("只有非空文本能作为标签");
	if (Array.has(ABEND_TAG, tag)) throw new Error("不允许使用 XmlWrapper 来动态构建 " + tag + " 元素");

	let attrs;
	if (attribute instanceof Map) {
		attrs = attribute;
	} else {
		attrs = new Map();
		if (attribute) {
			Object.forEach(attribute, function (key, value) {
				attrs.set(key, value);
			})
		}
	}
	var tIndex = 0,
		nIndex = 0, // 这两个数字不对外公开使用
		children = [],
		parent = null;

	this.add = function (element, parse) {

		if (!tag) {
			children.push({
				index: tIndex++,
				type: String,
				parse: (parse === undefined) ? true : parse
			})
		}

		if (Array.has(NO_BODY_TAG, tag)) throw new Error("不能向当前标签（" + tag + "）内无法添加元素");

		if (element instanceof XmlWrapper) {
			if (Array.has(NOT_SAME_TAG, tag) && tag === element.getTag()) throw new Error("当前 XML 节点的标签（" + tag + "）中不被允许储存同名子节点");

			children.push({
				index: nIndex++,
				type: XmlWrapper,
				element: element
			});
			element.setParent(this);
		} else if (typeIs(element, 'string')) {

			children.push({
				index: tIndex++,
				type: String,
				element: element,
				parse: (parse === undefined) ? true : parse
			});
		} else {
			unsupportedType(element);
		}

		return this;
	};

	this.clear = function () {

		this.clearChildren();
		attrs.clear();
		parent = null;
	};

	this.clearChildren = function () {
		nIndex = 0;
		tIndex = 0;
		children = [];
	};

	this.nodeCount = function (tagName) {
		if (!tagName) return nIndex;

		var count = 0;
		Object.forEach(children, function (i, element) {
			if (element.type === XmlWrapper &&
				element.element.getTag() === tagName) {
				count++;
			}
		});

		return count;
	};

	this.isEmpty = function () {
		return Object.isEmpty(children);
	};

	/*
	 * xml = true html = false
	 */
	this.setXmlType = function (type) {
		xmlType = type;
	};
	this.setParent = function (p) {
		parent = p;
	};
	this.getParent = function () {
		return parent;
	};

	this.isRoot = function () {
		return parent == null;
	};

	this.getElement = function (index) {
		return children[index];
	};

	this.getText = function (index) {
		if (isNumber(index)) {
			if (index < tIndex) {
				for (let i = 0, len = children.length; i < len; i++) {
					let element = children[i];
					if (String === element.type && element.index === index) {
						return element.element;
					}
				}
			} else {
				indexOutOfBounds(tIndex, index);
			}
		} else {
			errorCast(index, Number);
		}
	};

	this.getTexts = function () {
		var results = [];
		for (let i = 0, len = children.length; i < len; i++) {
			let element = children[i];
			if (String === element.type) {
				results.push(element.element);
			}
		}
		return results;
	};

	this.hashCode = function () {
		return _hashcode;
	};

	this.getNode = function (index, tagName) {
		if (tagName) {
			if (index < nIndex) {
				for (let i = 0, len = children.length; i < len; i++) {
					let element = children[i];
					let node = element.element;
					if (element.type === XmlWrapper && index === element.index && node.getTag() === tagName) {
						return node;
					}
				}
			} else {
				indexOutOfBounds(nIndex, index);
			}
		} else if (Number.isNumber(index)) {
			if (index < nIndex) {
				for (let i = 0, len = children.length; i < len; i++) {
					let element = children[i];
					if (element.type === XmlWrapper && index === element.index) {
						return element.element;
					}
				}
			} else {
				indexOutOfBounds(nIndex, index);
			}
		} else {
			errorCast(index, Number);
		}
		return null;
	};

	this.lastNode = function (tagName) {
		if (tagName) {
			if (typeIs(tagName, 'string')) {
				for (let i = children.length - 1; i >= 0; i--) {
					let element = children[i];
					let node = element.element;
					if (element.type === XmlWrapper && node.getTag() === tagName) {
						return node;
					}
				}
			} else {
				errorCast(tagName, String);
			}
		} else {
			for (let i = children.length - 1; i >= 0; i--) {
				let element = children[i];
				if (element.type === XmlWrapper) {
					return element.element;
				}
			}
		}
		return null;
	};
	this.getNodes = function (tagName) {

		let results = [];

		if (tagName) {
			if (typeIs(tagName, 'string')) {
				for (let i = 0, len = children.length; i < len; i++) {
					let element = children[i];
					let node = element.element;
					if (element.type === XmlWrapper && node.getTag() === tagName) {
						results.push(node);
					}
				}
			} else {
				errorCast(tagName, String);
			}
		} else {
			for (let i = 0, len = children.length; i < len; i++) {
				let element = children[i];
				if (element.type === XmlWrapper) {
					results.push(element.element);
				}
			}
		}
		return results;
	};

	this.size = function () {
		return children.length;
	};

	this.update = function (index, element) {

		if (!Number.isNumber(index)) errorCast(index, Number);

		var type = typeof element;
		if (('string' !== type) && !(element instanceof XmlWrapper)) unsupportedType(element);

		var len = children.length;
		if (index >= len) indexOutOfBounds(index, len);

		var old = children[index];

		if (type === typeof old.element) {
			old.element = element;
			return;
		}
		old.element = element;

		var isFirst = true;
		for (index += 1; index < len; index++) {
			let tmp = children[index];
			if (type === typeof tmp.element) {
				if (isFirst) {
					old.index = tmp.index;
					isFirst = false;
				}
				tmp.index++;
			} else {
				tmp.index--;
			}
		}
		if ('string' === type) {
			nIndex++;
			tIndex--;
		} else {
			tIndex++;
			nIndex--;
		}
	};

	this.compare = function (another) {
		if (this === another) return true;
		if (!(another instanceof Map)) return false;
		if (tag !== another.getTag()) return false;

		for (let [key, val] of attrs.entries()) {
			var aVal = another.get(key);
			if (typeof val !== typeof aVal) return false;
			if (val !== aVal && // 字符串形式的文本节点或引用同一片内存空间
				!val.compare(aVal)) // 元素节点
				return false;
		}

		return true;
	}

	this.on = function (name, func) {
		browserOnly();
	}

	/*
	 * 将保存的对象渲染为一个dom结构
	 * 不同于 toString 转变为字符串，这个输出的 dom 结构是可以修改的，并且可以直接插入到 HTML 之中
	 */
	this.render = function () {

		browserOnly();

		var element = document.createElement(tag);

		attrs.forEach(function (val, key) {
			element[getKeyName(key)] = val;
		});

		Object.forEach(children, function (i, node) {
			switch (node.type) {
				case String:
					if (node.parse) {
						element.appendChild(document.createTextNode(node.element));
					} else {
						element.innerHTML = node.element;
					}
					break;
				case XmlWrapper:
					element.appendChild(node.element.render());
					break;
				default:
					unsupportedType(node.type);
			}
		});

		return element;
	}

	this.remove = function (index, count, type, tag) {

		var len = children.length;
		if (index < 0 || index >= len) indexOutOfBounds(index, 0);

		var last = index + count;
		if (len <= last) indexOutOfBounds(last, len);

		var removed = [];
		var nRemoved = 0,
			tRevmoed = 0;

		for (let i = index; i < last; i++) {

			let element = children[i];
			switch (element.type) {
				case String:
					if (type === 'string') {
						tRemoved++;
						removed.push(element.element);
					}
					break;
				case XmlWrapper:
					if (type === 'node') {
						if (!!tag && element.element.getTag() === tag) {
							removed.push(element.element);
							nRemoved++;
						} else if (!tag) {
							removed.push(element.element);
							nRemoved++;
						}
					}
					break;
				default:
					unsupportedType(element.type);
			}

		}
		tIndex -= tRevmoed;
		nIndex -= nRevmoed;

		for (let i = last; i < len; i++) {
			let element = children[i];
			switch (element.type) {
				case String:
					element.index -= tRevmoed;
					break;
				case XmlWrapper:
					element.index -= nRevmoed;
					break;
				default:
					unsupportedType(element.type);
			}
		}

		return removed;
	};
	this.putAttribute = function (key, val) {
		attrs.set(key, val);
	};
	this.putAllAttributes = function (obj) {
		Object.forEach(obj, function (key, val) {
			attrs.set(key, val);
		})
	};
	this.removeAttribute = function (key) {
		return attrs['delete'](key);
	};
	this.getAttribute = function (key) {
		return attrs.get(key);
	};
	this.containsAttribute = function (key) {
		return attrs.has(key);
	};

	this.getTag = function () {
		return tag;
	};
	this.toString = this.toHTML = function () {

		var xml = [START_START_TAG, tag];
		attrs.forEach(function (val, key) {
			xml.push(' ' + key + '="' + attrs.get(key) + '"');
		});

		var len = children.length;
		if (len === 0) {
			if (xmlType) {
				xml.push(ENMPTY_END_TAG);
			} else {
				if (Array.has(NO_BODY_TAG, tag)) {
					xml.push(ENMPTY_END_TAG);
				} else {
					xml.push(END_TAG + START_END_TAG + tag + END_TAG);
				}
			}
		} else {
			xml.push(END_TAG);
			for (var i = 0; i < len; i++) {
				xml.push(children[i].element.toString());
			}
			xml.push(START_END_TAG + tag + END_TAG);
		}
		return xml.join(EMPTY_STRING);
	};
}

/**
 * 通过制定格式的 JSON 对象创建一个 HTML 格式的 JSON：
 * [{ tag : 'div', attribute : {
 * 'class' : 'class_name' }, child : [ 'text', { tag : 'div', child : [
 * 'div_text', { tag : 'input', attribute : { type : 'text' } } ] } ] }, {
 * tag : 'p', attribute : { id : 'idname' }, child : [ { tag :
 * 'span', child : [ 'spantext' ] } ] } ]
 * 
 * 说明： tag : 制定要创建的 HTML 节点的 tag attribute : HTML 节点的属性 child
 * ：HTML节点的子元素（文本与子节点均通过 child 来表示）
 */
function jsonToHTML(json) {
	if (!Array.isArray(json)) {
		unsupportedType(json);
	}
	var result = [];
	for (let i = 0, len = json.length; i < len; i++) {
		let obj = json[i];
		if (!typeIs(obj, 'object')) {
			result.push((obj).toString());
		} else {
			let xml = new XmlWrapper(obj.tag, obj.attribute);
			let child = obj.child;
			if (child) {
				if (typeIs(child, 'string')) {
					xml.add(child);
				} else {
					var children = jsonToHTML(child);
					for (let j = 0, cLen = children.length; j < cLen; j++) {
						xml.add(children[j]);
					}
				}
			}
			result.push(xml);
		}
	}
	return result.join(String.BLANK);
}

// String -> XmlWrapper
function parse(input) {

}

/**
 * 将任意格式的 JSON 对象转换为一个 XML 字符串（不是 HTML）
 */
function jsonToXml(json, rootTag) {

	if (!typeIs(json, 'object', 'array', 'string', 'number')) unsupportedType(json);

	var root = new XmlWrapper(rootTag || 'root');
	root.setXmlType(true);
	if (typeOf(json, 'string')) {
		root.add(json);
	} else {
		for (let name in json) {
			if (hasOwnProperty(json, item)) {
				let item = json[name];
				root.add(jsonToXml(item, name));
			}
		}
	}

	return root;
}

module.exports = exports = {
	newXmlWrapper: function (t, a, x) {
		return new XmlWrapper(t, a, x);
	},
	isXmlWrapper: function (obj) {
		return obj instanceof XmlWrapper;
	},
	jsonToHTML: jsonToHTML,
	jsonToXml: jsonToXml,
	/*
	 * 目前尚未实现该功能
	 */
	// parse : parse,
	// xmlToJSON : xmlToJSON
	XML: false,
	HTML: true
};