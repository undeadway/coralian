# Chinese
一个 JS 的基础增强库。

主要实现两个功能：
1. 针对 JS 自身的不足，补足相关功能、添加部分数据类型  
   设计方针基本符合《 JavaScript 语言精粹 》中的要求
   不同的是因为要设计一些数据类型（`Map`、`Set`、`Interface`、`Collection`、`XmlWrapper`）等<
   所以保留了对`new`关键字的使用

2. 简单化功能封装
   包括对一些 JS 中不尽人意的地方进行了封装，或者重新写了一些相适用的方法 / 函数集合
   所有实现均为对 ECMAScript 的扩展，不包含任何与 `window`、`document` 等有关的 DOM、BOM操作

## 使用
### 客户端

下载 dist 文件夹中的 coralian.js，然后导入即可
```
<script type="text/javascript" src="coralian.js"></script>
```
#### 适用浏览器

| 名称 | 最低版本号 |
| --- | --- |
| Firefox | |
| Chrome | |
| Opera | |
| Edge | |

### node端

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
