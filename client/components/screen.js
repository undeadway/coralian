const { getScrollTop } = require("./parts");

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
	getOffsetTop: function (o) {

		var top = 0;
		var offsetParent = o;

		while (offsetParent != null && offsetParent != document.body) {

			top += offsetParent.offsetTop;
			offsetParent = offsetParent.offsetParent;
		}

		return top;
	},
	stopOnScreen: (function () {

		var elements = {};
		elements.id = [];
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
	})(),
	Menu: (function () {

		let nodeList = []; // 所有子节点

		function override(layer, list, subList) {

			// 隐藏的时候，需要隐藏所有子节点
			Coralian.util.ObjectUtil.override(list, 'hide', (callback) => function () {

				isOpen = false; // 隐藏的时候，关闭显示开关

				Array.forEach(subList, (i, item) => { // 递归隐藏子节点
					item.hide();
				});

				callback();
			});

			// 显示的时候，只要显示当前层和当前层的下一层就可以了
			Coralian.util.ObjectUtil.override(list, 'show', (callback) => function (index) {

				// 因为子节点也同样实现了当前这个被覆盖过的 show 方法
				// 所以这里会产生递归调用，需要通过输入的层号和当前所在层号一致来判断是否是目标层
				// 如果不是当前层，则什么都不做，来中止递归调用
				if (index !== layer) return;

				callback();// 显示当前层

				// 显示当前层的下一层
				Array.forEach(subList, (i, item) => {
					item.show(index); // 将需要显示的目标层号向下传递
				});
			});
		}

		function createTag(tag, val, attr) {
			if (typeIs(val, 'undefined')) {
				val = String.BLANK;
			}
			if (typeIs(val, 'object')) {
				attr = val;
				val = String.BLANK;
			}
			let element = $(`<${tag}>${val}</${tag}>`);
			if (attr) {
				element.attr(attr);
			}

			return element;
		}

		function createChild(layer, data, events) { // 所有目录和下级目录

			let listItems = [];

			let list = createTag(Coralian.constants.HtmlTag.UL, {
				'class': `menu_list ${data.name}`,
				id: `menu_list_${data.name}`,
				style: "margin-left:" + (!!layer ? 106 : -3) + "px; margin-top:" + (!!layer ? -2 : 1.6) + "rem"
			});

			let isOpen = false; // 每个下拉菜单都有一个 isOpen 属性
			list.hide(); // 初始状态隐藏自己
			list.isOpen = () => isOpen;

			override(layer, list, listItems);

			Array.forEach(data.list, (i, subData) => {

				let listItem = createTag(Coralian.constants.HtmlTag.LI, {
					'class': `list_menu`,
					id: `list_menu_${data.name}`,
				});
				let button = createTag(Coralian.constants.HtmlTag.DIV, subData.title);
				listItem.append(button);
				let subLists = [];

				override(layer, listItem, subLists);

				if (subData.list) {
					var subList = createChild(layer + 1, subData, events);
					listItem.append(subList); // 循环递归创建子目录
					subLists.push(subList);

					button.attr({
						'style': 'background-image:url(./../icons/arr_r_b.png);background-position:right center;background-repeat:no-repeat;'
					});

					button.on('click', (event) => {

						event.stopPropagation();

						if (subList.isOpen()) { // 子列表未开放
							subList.hide(); // 隐藏列表
						} else {
							Array.forEach(listItems, (i, tmpItem) => {
								if (listItem !== tmpItem) {
									tmpItem.hide(); // 隐藏其他所有同级列表
									tmpItem.show(layer); // 重新显示列表
								}
							})
							subList.show(layer + 1); // 显示子列表
						}
					});
				} else {
					listItem.on('click', (event) => {
						hideAll(event);
						events[subData.name](event);
					});
				}
				list.append(listItem);
				listItems.push(listItem);
			});

			return list;
		}

		function hideAll(event) {
			if (event) {
				event.stopPropagation();
			}
			// 隐藏所有列表
			Array.forEach(nodeList, (i, node) => {
				node.hide();
			});
		}

		return {
			create: (data, events) => {
				let menuBar = createTag(Coralian.constants.HtmlTag.DIV, {
					id: 'menubar_box',
					class: 'menubar_box'
				}); // 创建 root 节点

				Array.forEach(data, (i, itemData) => {

					let barItem = createTag(Coralian.constants.HtmlTag.DIV, {
						'class': 'menubar_item'
					}); // 节点
					let button = createTag(Coralian.constants.HtmlTag.DIV, itemData.title); // 按钮

					if (itemData.list) {
						let child = createChild(0, itemData, events); // 创建子节点
						barItem.append(child);
						nodeList.push(child);

						button.on('click', (event) => {
							hideAll(event);
							child.show(0); // 仅显示当前列表
						});
					} else {
						button.on('click', (event) => {
							hideAll(event);
							// 执行事件
							events[itemData.name](event);
						});
					}

					barItem.append(button);
					menuBar.append(barItem);
				});

				$(document).on('click', hideAll);

				return menuBar;
			},
			hide: hideAll
		};
	})()
};