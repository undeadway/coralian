const { newWindow } = require("./parts");

var TO_TOP = 0,
	TO_RIGHT = 1,
	TO_BOTTOM = 2,
	TO_LEFT = 3;

function funcInterval(speed, target, inner, direction, callback) {

	return setInterval(function () {
		switch (direction) {
			case 0:
				if (target.scrollTop <= 0)
					target.scrollTop = inner[1].offsetHeight;
				else {
					target.scrollTop--;
				}
				break;
			case 1:
				if (target.scrollLeft === 0)
					target.scrollLeft = inner[1].offsetWidth;
				else {
					target.scrollLeft--;
				}
				break;
			case 2:
				if (inner[1].offsetHeight - target.scrollTop <= 0)
					target.scrollTop -= inner[0].offsetHeight;
				else {
					target.scrollTop++;
				}
				break;
			case 3:
				if (inner[1].offsetWidth - target.scrollLeft <= 0)
					target.scrollLeft -= inner[0].offsetWidth;
				else {
					target.scrollLeft++;
				}
				break;
			default:
				throw new Error("错误的方向");
		}

		if (callback) callback();

	}, speed);
}

function setting(node, width, height, tag, callback) {
	node.style.width = width + "px";
	node.style.height = height + "px";
	node.style.overflow = node.style.overflowX = node.style.overflowY = "hidden";

	var target = node.getElementsByTagName("div")[0];
	if (!target)
		return;
	var innerTag = target.getElementsByTagName(tag);
	if (!innerTag)
		return;

	callback(target, innerTag);
}

/*
 * marquee 模块
 * JS Marquee Version 1.2(Javascript实现Marquee的效果,实现无缝/有间隙的二维滚动效果)
 * Author : ChenReal Email : chenreal@21cn.com Date : 2007-10-22 
 * 有修改
 * 
 * id : 滚动目标的 ID
 * tag : 滚动目标的标签
 * width : 滚动范围的宽度
 * height : 滚动范围的高度
 * direction : 滚动方向：0:下->上，1:左->右，2:上->下，3:右->左
 * speed : 滚动速度，0最快，无最慢
 * space : 滚动时是否有间隙：true - 有间隙；false - 无间隙
 * stop : 鼠标覆盖时是否停止：true - 停止；false - 不停止
 */
function marquee(id, tag, width, height, direction, speed, space, stop) {

	var intervalID;
	var target = $dom.getNode(id);

	setting(target, width, height, tag, function (innerDiv, innerTag) {

		innerDiv.innerHTML += innerDiv.innerHTML;
		switch (direction) {
			case 0:
				innerDiv.style.width = width + "px";
				innerTag[0].style.width = width + "px";
				innerTag[1].style.width = width + "px";
				if (height >= innerTag[1].offsetHeight || space) {
					innerTag[0].style.paddingBottom = height + "px";
				}
				break;
			case 1:
				innerDiv.noWrap = true;
				if (width >= innerTag[1].offsetWidth || space) {
					innerTag[0].style.paddingLeft = width + "px";
					innerTag[1].style.paddingLeft = width + "px";
				}
				break;
			case 2:
				innerDiv.style.width = width + "px";
				innerTag[0].style.width = width + "px";
				innerTag[1].style.width = width + "px";
				if (height >= innerTag[1].offsetHeight || space) {
					innerTag[0].style.paddingTop = height + "px";
					innerTag[1].style.paddingTop = height + "px";
				}
				break;
			case 3:
				innerDiv.noWrap = true;
				if (width >= innerTag[1].offsetWidth || space) {
					innerTag[0].style.paddingLeft = width + "px";
					innerTag[1].style.paddingLeft = width + "px";
				}
				break;
			default:
				var e = new Error("错误的方向");
				alert(direction);
				alert(e.stack);
				throw e;
		}

		if (stop) {
			target.onmouseover = function () {
				clearInterval(intervalID);
			};
			target.onmouseout = function () {
				intervalID = funcInterval(speed, target, innerTag, direction);
			};
		}
		intervalID = funcInterval(speed, target, innerTag, direction);
	});
}

function addButtons(node, elements, size, onMouseOverCallback, onMouseOutCallback) {

	// 创建按钮
	var buttons = $dom.create("ul", {
		className: 'slide_buttons'
	}),
		btnArray = [];

	// 添加 button 和 隐藏对象
	for (var i = 0; i < size; i++) {
		(function (element, index) {
			var li = $dom.create("li", {
				onmouseover: function () {
					onMouseOverCallback(index);
				},
				onmouseout: onMouseOutCallback,
				innerHTML: index + 1, // 显示编号
				className: "slice_button_" + ((i === 0) ? "on" : "out") // 设置初始状态
			});

			buttons.appendChild(li);
			btnArray.push(li);
		})(elements[i], i);
	}

	node.appendChild(buttons);

	return btnArray;
}

function changeButton(before, after) {
	before.className = "slice_button_out";
	after.className = "slice_button_on";
}

function slideshow(node, childTagName, interval, width, height, data) {

	var elements, intervalID, index = 0,
		size, buttons, _target;

	// 获得要进行移动的节点对象
	setting(node, width, height, "div", function (target, innerTag) {
		elements = target.getElementsByTagName(childTagName);
		size = elements.length;

		// 为整个 div 添加 onclick 事件，这样就不用为每个元素单独添加 onclick 事件了
		target.onclick = function () {
			var link = data[index].link;
			newWindow(link.url, elements[index].name, link.features);
		};

		_target = target;
	});

	function changeAltTitle() {
		_target.title = elements[index].name;
	}

	return {
		change: function () {

			function runChange() {
				intervalID = setInterval(function () {
					var before = index++;
					elements[before].style.display = "none";
					if (index === size) {
						index = 0;
					}
					elements[index].style.display = "block";
					changeButton(buttons[before], buttons[index]);
					changeAltTitle();
				}, interval);
			}

			buttons = addButtons(node, elements, size, function (i) {
				clearInterval(intervalID);
				elements[index].style.display = "none";
				elements[i].style.display = "block";
				changeButton(buttons[index], buttons[i]);
				changeAltTitle();
				index = i;
			}, runChange);
			runChange();
		},
		move: function (direction, speed) {

			function runMove() {
			}

			buttons = addButtons(node, elements, size, function () {
				clearInterval(intervalID);
			}, runMove);
			runMove();
		},
		fadeInOut: function (speed) {

			for (var i = 0; i < size; i++) {
				elements[i].zIndex = i;
				var style = elements[i].style;
				style.position = "absolute";
				style.top = "0px";
				style.left = "0px";
				style.opacity = 0;
			}
			elements[0].style.opacity = 1;

			function changeImg(before, now) {
				var opacityInterval = setInterval(function () {
					if (now.style.opacity > 1) {
						clearInterval(opacityInterval);
					}
					before.style.opacity -= 0.2;
					// 因为 style 全是字符串形式，用+会变成字符串连接，数字<->字符串之间的来回变换太烦，
					// 所以这里为了偷懒，直接用减法语法糖计算
					now.style.opacity -= -0.2;
				}, speed);

			}

			function runFadeInOut() {
				intervalID = setInterval(function () {
					var before = index++;
					elements[before].style.opacity = 1;
					if (index === size) {
						index = 0;
					}
					elements[index].style.opacity = 0;

					changeButton(buttons[before], buttons[index]);
					changeImg(elements[before], elements[index]);
					changeAltTitle();

				}, interval);
			}

			buttons = addButtons(node, elements, size, function (i) {
				changeImg(elements[index], elements[i]);
				changeButton(buttons[index], buttons[i]);
				index = i;
				clearInterval(intervalID);
				changeAltTitle();
			}, runFadeInOut);
			runFadeInOut();
		},
		/*
		 * firstColor：第一种颜色
		 * secondColor：第二种颜色
		 * rCnt：行
		 * cCnt：列
		 */
		chessboard: function (firstColor, secondColor, rCnt, cCnt, speed) {

			function runChessboard() { }

			buttons = addButtons(node, elements, size, function () {

			}, runChessboard);
			runChessboard();
		}
	};
}

exports = module.exports = {
	TO_TOP: TO_TOP,
	TO_LEFT: TO_LEFT,
	TO_RIGHT: TO_RIGHT,
	TO_BOTTOM: TO_BOTTOM,
	marquee: marquee,
	slideshow: slideshow
};