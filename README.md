# Chinese
一个 JS 的基础增强库，以及部分常用的功能。

主要实现两个功能：
1. 针对 JS 自身的不足，补足相关功能、添加部分数据类型  
   设计方针基本符合《 JavaScript 语言精粹 》中的要求
   不同的是因为要设计一些数据类型（`Map`、`Set`、`Interface`、`Collection`、`XmlWrapper`）等<
   所以保留了对`new`关键字的使用

2. 简单化功能封装
   包括对一些 JS 中不尽人意的地方进行了封装，或者重新写了一些相适用的方法 / 函数集合
   所有实现均为对 ECMAScript 的扩展，**不包含任何与 `window`、`document` 等有关的操作**，如果有，则会强制要求 `browserOnly`。

## 使用
可以通用于 `node` 端和浏览器中。

### 浏览器

下载 dist 文件夹中的 coralian.js，然后导入即可
```
<script type="text/javascript" src="coralian.js"></script>
```
#### 适用浏览器

| 名称 | 最低版本号 |
| --- | --- |
| Firefox | 13 |
| Chrome | 38 |
| Opera | 25 |
| Edge | 12 |

### node

```
npm install coralian
```

然后在代码入口处引入`coralian`库
```
require("coralian")
```
即可使用，如：
```
Coralian.logger.log("hello world");
```

## License
Apache-2.0


# English
A function expand library of javascript.

## Use
### Browser

download the `coralian.js` under dist folder, and import it to your project.
```
<script type="text/javascript" src="coralian.js"></script>
```

#### Supported Browsers

| Name | Version |
| --- | --- |
| Firefox | 13 |
| Chrome | 38 |
| Opera | 25 |
| Edge | 12 |


### node

1 install it.
```
npm install coralian
```

2 require it in you project.
```
require("coralian")
```

Then could use it.
```
Coralian.logger.log("hello world");
```

## License
Apache-2.0