!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t){Object.defineProperty(Array,"TYPE_NAME",{get:()=>"array"}),Object.defineProperty(Boolean,"TYPE_NAME",{get:()=>"boolean"}),Object.defineProperty(Error,"TYPE_NAME",{get:()=>"error"}),Object.defineProperty(Function,"TYPE_NAME",{get:()=>"function"}),Object.defineProperty(Number,"TYPE_NAME",{get:()=>"number"}),Object.defineProperty(Number,"NaN_TYPE_NAME",{get:()=>"NaN"}),Object.defineProperty(Number,"Infinity_TYPE_NAME",{get:()=>"Infinity"}),Object.defineProperty(Object,"TYPE_NAME",{get:()=>"object"}),Object.defineProperty(Object,"NULL_TYPE_NAME",{get:()=>"null"}),Object.defineProperty(Object,"UNDEFINED_TYPE_NAME",{get:()=>"undefined"}),Object.defineProperty(String,"TYPE_NAME",{get:()=>"string"}),Object.defineProperty(RegExp,"TYPE_NAME",{get:()=>"regexp"});const r=t.isArray=Array.isArray?Array.isArray:e=>e&&(e instanceof Array||typeof e===Object.TYPE_NAME&&typeof e.length===Number.TYPE_NAME&&e.propertyIsEnumerable("length")),n=t.keyArray=Object.keys?Object.keys:e=>{let t=[];for(let r in e)e.hasOwnProperty(r)&&t.push(r);return t},{errorCast:i,noReference:o,unsupportedType:a,indexOutOfBounds:u,unsupportedOperation:s,noSuchMethod:l}=Error;function c(e){var t;return null===e?t=Object.NULL_TYPE_NAME:r(e)?t=Array.TYPE_NAME:e!=e?t=Number.NaN_TYPE_NAME:e===1/0||e===-1/0?t=Infinity_TYPE_NAME:e instanceof RegExp?t=RegExp.TYPE_NAME:e instanceof Number?t=Number.TYPE_NAME:e instanceof Boolean?t=Boolean.TYPE_NAME:e instanceof String?t=String.TYPE_NAME:(t=typeof e)===Number.TYPE_NAME&&isNaN(e)&&(t=Number.NaN_TYPE_NAME),t}function f(e,t){var n=c(e),i=t;return 2===arguments.length&&typeof t===String.TYPE_NAME?n===t:(!r(t)&&arguments.length>2&&(i=Array.prototype.slice.call(arguments,1)),Array.has(i,n))}t.typeOf=c,t.typeIs=f;const E="#{".length,p="${",g="}";function h(e,t,r,n){f(e,String.TYPE_NAME)||i(e,String),r=r||p,n=n||g;for(var o=String.BLANK,a=0,u=0;-1!==(a=e.indexOf(r,u))&&(a>u&&(o+=e.substring(u,a)),-1!==(u=e.indexOf(n,a+r.length)));){let i=e.substring(a+r.length,u).split("."),s=t;for(let e=0,t=i.length;e<t&&(s=s[i[e]]);e++);null!=s&&(o+=s),u+=n.length}return-1===a?o+=e.substring(u,e.length):-1===u&&(o+=e.substring(a,e.length)),o}function T(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function N(e,t){var r=t.prototype;r&&(e.__proto__=r,e.constructor=r.constructor)}h.LOOP_REG_START="#{",h.LOOP_REG_END="#{/",h.LOOP_IN_START="#:{",h.LOOP_REG_START_L=E,h.DEFAULT_PREFIX=p,h.DEFAULT_SURFIX=g,t.replaceElement=h,t.hasOwnProperty=T,t.instanceTo=N;let A=t.getFunctionName=(e=>{var t=String.BLANK,r=e.name;if(void 0!==r)t=r;else{let r=null,n=e.toString();(r="["===n.charAt(0)?n.match(/\[\w+\s*(\w+)\]/):n.match(/function\s*(\w+)/))&&2===r.length&&(t=r[1])}return t});const m=t.getFunctionDefine=((e,t)=>{var r=[];for(let e=0;e<t;e++)r.push("arg"+e);return"function "+e+"("+r.join()+");"});function O(e){var t=[];for(let r=0,n=e.length;r<n;r++)t.push(b(e[r]));return t}function b(e){if(null==e)return e;if(e!=e)return e;if(f(e,String.TYPE_NAME,Number.TYPE_NAME,Number.Infinity_TYPE_NAME,Boolean.TYPE_NAME,RegExp.TYPE_NAME,Function.TYPE_NAME))return e;if(e.clone)return e.clone();if(r(e))return O(e);var t={};for(let r in e)T(e,r)&&(t[r]=b(e[r]));return N(t,P(e)),t}function y(e){null==e&&o();var t=r(e);t||f(e,Object.TYPE_NAME)||a(e);var i=n(e),s=0,l=i.length;this.hasNext=function(){return s<l},this.next=function(){var r=i[s++];return t?r:e[r]},this.first=function(){return i[0]},this.last=function(){return i[l-1]},this.goto=function(e){e<0&&u(e,0),e>=l&&u(e,l)},this.forward=function(e){var t=s+e;t<0&&u(t,0),t>=l&&u(t,l),s=t}}function d(e,t,r,n){var i=e.length,o=m(t,i);this.getDefine=function(){return o},this.parameterCount=function(){return i},this.newInstance=function(){return r(),n?new e:newInstance(e,arguments)}}function S(e){return e===String||e===Number||e===Boolean||e===Symbol}function _(e){var t=e.constructor||Object,n=e.prototype||Object,i=S(t),o=R(e),a=r(e),u=t===Function,s=t===Object||i||a||t===RegExp,l=A(t);function c(){if(s||i)throw new Error("请使用字面量来构造对象");if(o)throw new Error("请使用 Coralian.util.Interface 类的 newInterface 方法来构造接口")}this.getName=function(){return l},this.getStatic=t.getStatic,this.isLiteral=function(){return s},this.isArray=function(){return a},this.isInterface=function(){return o},this.isPrimitive=function(){return S},this.isFunction=function(){return u},this.newInstance=function(){return c(),u?new t:newInstance(t)},this.getPrototype=function(){return n},this.typeIs=function(){return f(e,arguments)},this.instanceOf=function(e){return t===e||t instanceof e},this.getConstructor=function(){return new d(t,l,c,u)}}t.newInstance=((e,t)=>{var r={},n=e.apply(r,t);return N(f(n,Object.TYPE_NAME)?n:r,e)}),t.arrayClone=O,t.objectClone=b,t.Iterator=y,t.isPrimitive=S;let P=t.getType=(e=>new _(e));function I(e,t){for(let e=0,r=t.length;e<r;e++){let r=t[e];f(r,String.TYPE_NAME)||i(r,String)}this.getName=function(){return e},this.iterator=function(){return new y(t)}}function M(e,t){if(1===arguments.length)throw new Error("构建接口至少定义一个方法");return Array.isArray(t)||(t=array_slice.call(arguments,1)),new I(e,t)}function R(e){return e instanceof I}t.Interface={newInterface:M,ensureImplements:function(e){if(arguments.length<2)throw new Error("判定对象是否是实现某接口，必须先提供至少一个被判定的接口");for(let t=1,r=arguments.length;t<r;t++){let r=arguments[t];R(r)||i(e,I);let n=r.iterator();for(;n.hasNext();){let t=n.next(),r=e[t];r&&f(r,Function.TYPE_NAME)||l(t)}}},isInterface:R,Collection:M("Collection",["add","clear","exists","existsAll","equals","isEmpty","remove","size","toArray"])},t.isNumber=((e,t)=>e==e&&(16!==(t=t||10)||String.startsWith(e.toString().toLowerCase(),"0x")||(e="0x"+e),isFinite(e))),t.formatString=((e,...t)=>(t||s("至少需要一个字符来进行替换"),Object.TYPE_NAME===c(t[0])?e=h(e,t[0]):Object.forEach(t,function(t,r){e=e.replace(/\%s/,r)}),e));let w=typeof window!==Object.UNDEFINED_TYPE_NAME;t.side=w;t.browserOnly=(()=>{if(!w)throw new Error(formatString("只能在%s中使该功能用","浏览器"))}),t.serverOnly=(()=>{if(w)throw new Error(formatString("只能在%s中使该功能用","服务端"))})},function(e,t,r){const{hasOwnProperty:n,formatString:i}=r(0),{unsupportedType:o,unsupportedOperation:a,errorCast:u}=Error,{isNumber:s}=Number,l="YYYY-MM-DD hh:mm:ss",c=/(Y+)/,f=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],E=["周日","周一","周二","周三","周四","周五","周六"],p=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],g=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],h=["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],T=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],N=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],A=["January","February","March","April","May","June","July","Augst","September","October","November","December"],m=[31,28,31,30,31,30,31,31,30,31,30,31],O=["zh","xq","yue","nian"],b=["M","D","h","m","s"],y=29;function d(e,t){e instanceof Date||u(e,Date),t=t||l;var r=e.getMonth(),i=e.getDay(),o={"M+":r+1,yue:N[r],month:A[r],mon:A[r].slice(0,3),"D+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),ms:e.getMilliseconds(),zh:E[i],xq:f[i],w:T[i].slice(0,3),week:T[i]};c.test(t)&&(t=t.replace(RegExp.$1,e.getFullYear().toString().substr(4-RegExp.$1.length)));for(let e in o)if(n(o,e)){let r=new RegExp("("+e+")");if(r.test(t)){let n=o[e];Array.has(O,e)?t=t.replace(r,n):(!Array.has(b,RegExp.$1)&&n<10&&(n="0"+n),t=t.replace(r,n))}}return t}function S(e,t){if(!e)return new Date;if(e instanceof Date)return e;if(s(e)){let r=new Date;switch(t=t||8){case 0:r.setFullYear(e);break;case 1:_data.setYear(e);break;case 2:_data.setMonth(parseInt(e)-1);break;case 4:_data.setDate(e);break;case 6:r.setYear(parseInt(e/1e4)),r.setMonth(parseInt(e/100)%100-1),r.setDate(e%100);break;case 8:r.setFullYear(parseInt(e/1e4)),r.setMonth(parseInt(e/100)%100-1),r.setDate(e%100);break;case 16:r.setTime(e);break;default:a("所选择的格式化参数不正确")}return r}o(e)}function _(e){return e%4==0&&(e%100!=0||e%400==0)}function P(e){s(e)||u(e,Number),(e<1||12<e)&&a(e+" 不是一个合法的月份")}function I(e){s(e)||u(e,Number)}function M(e,t){var r=_(e);return 1===t&&r?y:m[t]}e.exports=t={monthly:function(e,t){var r=e;e instanceof Date?(t=e.getMonth(),e=e.getFullYear()):(e&&I(e),t&&(P(t),t-=1),r=new Date,e&&r.setYear(e),t&&r.setMonth(t)),r.setDate(1);for(var n=r.getDay(),i=0,o=[],a=M(e,t);!(i>=a);){let e=[null,null,null,null,null,null,null];for(let t=n;t<7&&++i<=a;t++)e[t]=i;n=0,o.push(e)}return o},nextWeekDay:function(e,t){var r=new Date;return t&&r.setDate(t),e=7-(e||r.getDay()),new Date(r.getTime()+864e5*e)},getTime:function(e,t){return e&&!typeIs(e,Number.TYPE_NAME)&&(e=parseInt(e)),d(S(e,16),t)},formatTime:d,instanceTime:S,isLeapYear:function(e){return s(e)||u(e,Number),_(e)},getMonthDays:function(e,t){return I(e),P(t),M(e,t)},getWeekDay:function(e,t){return i(S(e,t||16))},ChineseCalendar:{getChineseZodiac:function(e){return I(e),h[(e-CHINESE_SEXAGENARY_CYCLE_FIRST)%12]},getCelestialStem:function(e){return I(e),g[(e-4)%10]+p[(e-4)%12]},getSpringFestival:function(e){I(e),a("暂不支持农历年表示法")},getMonthlyCalendar:function(e){I(e),a("暂不支持农历年表示法")}}},Object.defineProperty(t,"YYYY",{value:0,writable:!1}),Object.defineProperty(t,"YY",{value:1,writable:!1}),Object.defineProperty(t,"Month",{value:2,writable:!1}),Object.defineProperty(t,"Date",{value:4,writable:!1}),Object.defineProperty(t,"YYMMDD",{value:6,writable:!1}),Object.defineProperty(t,"YYYYMMDD",{value:8,writable:!1}),Object.defineProperty(t,"MILLISECOND",{value:16,writable:!1}),Object.defineProperty(t,"ONE_DAY_MILLISECONDS",{value:864e5,writable:!1}),Object.defineProperty(t,"CHINESE_MONTH",{value:N,writable:!1}),Object.defineProperty(t,"ENGLISH_WEEK",{value:T,writable:!1}),Object.defineProperty(t,"SHORT_ENGLISH_WEEK",{value:function(){var e=[];for(let t=0,r=T.length;t<r;t++)e[t]=T[t].slice(0,3);return e},writable:!1}),Object.defineProperty(t,"LONG_CHINESE_WEEK",{value:f,writable:!1}),Object.defineProperty(t,"SHORT_CHINESE_WEEK",{value:E,writable:!1}),Object.defineProperty(t,"ENGLISH_MONTH",{value:A,writable:!1}),Object.defineProperty(t,"SHORT_ENGLISH_MONTH",{value:function(){var e=[];for(let t=0,r=A.length;t<r;t++)e[t]=A[t].slice(0,3);return e},writable:!1})},function(e,t,r){(function(e){r(4),r(5),r(6),r(7),r(8);let{side:t,typeOf:n,typeIs:i,formatString:o,browserOnly:a,serverOnly:u}=r(0);var s=null;t?((s=window).global=window,window.console?window.console.log||(s.console.log=s.alert):s.cosole={log:s.alert,err:s.alert,warn:s.alert}):(s=e).alert=function(e){String.contains(e,Error.TYPE_NAME)&&console.log(new Error),console.log(e)},s.typeOf=n,s.typeIs=i;let{noReference:l,unsupportedType:c}=Error;s.Coralian={ABOUT:"Coralian",VERSION:"0.0.6",HREF:"http://wpl.waygc.net/prj=coralian",AUTHOR:"hzwaygc@gmail.com",side:function(){return t},browserOnly:a,serverOnly:u,setToGlobal:function(e,t){if(null==t&&l(),i(e,String.TYPE_NAME)||c(e),String.isEmpty(e))throw new Error("不能使用空字符串作为属性名");!function e(t,r,n){let i=r[0];if(r.length>1){let o=t[i];o||(o=t[i]={}),e(o,r.slice(1),n)}else t[i]=n}(s,e.split("."),t)},exports:function(e,t){setExports(s,e,t)},logger:r(9),constants:r(10),util:r(11),dom:r(12),Calendar:r(1),Formatter:r(13),Random:r(14),ReplaceHolder:r(15),Validator:r(16)}}).call(this,r(3))},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){let n,i;function o(){if(!n||!i){let e=r(0);n=e.isNumber,i=e.getFunctionName}}function a(e){throw alert("message:"+e.message),alert("stack:"+e.stack),e}function u(e,t){o(),Function.TYPE_NAME!==typeof t&&u(t,Function);var r=new TypeError;console.error(r.message),console.error(r.stack),a(r=typeOf(e)+" 类型的数据无法转变为 "+i(t)+"。")}Error.errorCast=u,Error.indexOutOfBounds=function(e,t){o(),n(e)||u(e,Number),n(t)||u(t,Number),a(t<e?new Error("请求的下标 "+e+" 超过了上限 "+t):new Error("请求的下标 "+e+" 没有达到下限 "+t))},Error.noReference=function(e){var t=new ReferenceError;t.message=e||"当前引用错误。",a(t)},Error.unsupportedType=function(e){var t=new TypeError;t.message=typeOf(e)+"类型的数据不被当前操作所支持。",a(t)},Error.unsupportedOperation=function(e){a(new Error(e+=" 不被支持的操作"))},Error.noSuchMethod=function(e){a(new Error("方法 "+e+" 不存在。"))},Error.noSuchProperty=function(e){a(new Error("属性 "+e+" 不存在。"))},Error.errorStatement=function(){a(new Error("语法错误，或被执行的逻辑不正确。"))},Error.illegalArguments=function(e){a(e=e||"函数参数不正确")}},function(e,t,r){const{isArray:n,arrayClone:i}=r(0),{unsupportedType:o,indexOutOfBounds:a,errorCast:u}=Error;var s,l,c,f,E=Array.prototype.slice;if(Array.removeEach||(Array.removeEach=function(e,t){for(typeIs(e,Array.TYPE_NAME)||o(e);void 0!==(node=e.shift());)t(node)}),Array.forEach=function(e,t,r,n){switch(typeIs(e,Array.TYPE_NAME)||o(e),arguments.length){case 2:n=t,t=0,r=e.length;break;case 3:n=r,r=e.length}t<0&&a(t,0),r>e.length&&a(r,e.length);for(let i=t;i<r;i++){let t=n(i,e[i]);if(!1===t)break}},!Array.equals){Array.equals=function(e,t){if(n(t)||u(t,Array),e.equals)return e.equals(t);n(e)||u(e,Array);var r=arg1.length;if(r===t.length){for(let n=0;n<r;n++)if(!Object.equals(e[n],t[n]))return!1;return!0}return!1}}Array.isEmpty||(Array.isEmpty=function(e){return 0===e.length}),Array.asObject||(Array.asObject=function(e){for(var t={},r=0,n=e.length;r<n;r++)t[r]=e[r];return t}),Array.has||(Array.has=function(e,t){for(let r=0,n=e.length;r<n;r++)if(Object.equals(t,e[r]))return!0;return!1}),Array.find||(Array.find=function(e,t){for(let r=0,n=this.length;r<n;r++)if(Object.equals(t,e[r]))return r;return-1}),Array.last||(Array.last=function(e,t){let r=e.length;return t?(typeIs(t,Number.TYPE_NAME)||o(t),t>r&&a(t,r),t>0?e[r-t]:e[0-t]):e[r-1]}),Array.of||(Array.of=function(){return E.call(arguments)}),Array.clone||(Array.clone=i),Array.from||(Array.from=(s=Object.prototype.toString,l=function(e){return typeof e===Function.TYPE_NAME||"[object Function]"===s.call(e)},c=Math.pow(2,53)-1,f=function(e){var t=function(e){var t=Number(e);return isNaN(t)?0:0!==t&&isFinite(t)?(t>0?1:-1)*Math.floor(Math.abs(t)):t}(e);return Math.min(Math.max(t,0),c)},function(e){var t=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var r,n=arguments.length>1?arguments[1]:void 0;if(typeof n!==Object.UNDEFINED_TYPE_NAME){if(!l(n))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(r=arguments[2])}for(var i,o=f(t.length),a=l(this)?Object(new this(o)):new Array(o),u=0;u<o;)i=t[u],a[u]=n?typeof r===Object.UNDEFINED_TYPE_NAME?n(i,u):n.call(r,i,u):i,u+=1;return a.length=o,a}))},function(e,t,r){const{keyArray:n,hasOwnProperty:i,instanceTo:o,objectClone:a,isPrimitive:u}=r(0),{unsupportedType:s,noReference:l}=Error;function c(e,t){typeIs(e,Object.TYPE_NAME,Array.TYPE_NAME)||s(e),typeIs(t,Object.TYPE_NAME,Array.TYPE_NAME)||s(t);for(let r in e)if(i(e,r)){let n=e[r];if(typeIs(n,Object.TYPE_NAME)){let e={};c(n,e),t[r]=e}else t[r]=e[r]}}Object.isEmpty||(Object.isEmpty=function(e){if(null==e)return!0;if(e.isEmpty)return e.isEmpty();for(let t in e)if(i(e,t))return!1;return!0}),Object.addAll=c,Object.keys||(Object.keys=function(e){if(e!==Object(e))throw new TypeError("Object.keys called on a non-object");let t=[];for(let r in e)i(e,r)&&t.push(r);return t.sort()}),Object.values||(Object.values=function(e){if(e!==Object(e))throw new TypeError("Object.keys called on a non-object");var t=[];for(let r in e)i(e,r)&&t.push(e[r]);return t.sort()}),Object.equals=function e(t,r){if(t===r)return!0;let i=typeOf(t);if(i!==typeOf(r))return!1;if(t==r)return!0;if(t.equals)return t.equals(r);switch(i){case Number.NaN_TYPE_NAME:return!0;case Function.TYPE_NAME:case Number.Infinity_TYPE_NAME:return t===r;case Array.TYPE_NAME:if(t.length!==r.length)return!1;for(let e=0,n=t.length;e<n;e++)if(!Array.equals(!t[e],r[e]))return!1;return!0;case Object.TYPE_NAME:var o=n(t),a=n(r);if(o.length===a.length){if(o.toString()===a.toString()){for(let n=0,i=o.length;n<i;n++)if(!e(t[o[n]],r[a[n]]))return!1;return!0}return!1}case RegExp.TYPE_NAME:return t.toString==r.toString();default:return JSON.stringify(t)===JSON.stringify(r)}},Object.forEach=((e,t)=>{if(null==e&&l(),e instanceof Map)for(let[r,n]of e.entries())t(r,n);else switch(typeOf(e)){case Array.TYPE_NAME:Array.forEach(e,t);break;case Object.TYPE_NAME:for(let r in e)if(i(e,r)){let n=t(r,e[r]);if(!1===n)break;if(!0===n)continue}break;default:s(e)}}),Object.mix||(Object.mix=function(){let e=arguments[0],t=1;typeIs(e,Boolean.TYPE_NAME)||(e=!1,t=0);let r={};for(let n=t;n<arguments.length;n++){let t=arguments[n];typeIs(t,Object.TYPE_NAME)||s(t),c(e?JSON.parse(JSON.stringify(t)):t,r)}return r}),Object.isPrimitive=(e=>{if(null==e)return!0;let t=e.constructor;return u(t)}),Object.clone||(Object.clone=a),Object.instanceTo||(Object.instanceTo=o)},function(e,t){const{errorCast:r,unsupportedType:n}=Error,i="";function o(e,t){if(typeIs(e,String.TYPE_NAME)||r(e,String),typeIs(t,String.TYPE_NAME)||r(e,String),String(e)===String(t))return!0;if(e.equals)return e.equals(t);if(e.length===t.length){for(let r=0,n=e.length;r<n;r++)if(e.charAt(r)!==t.charAt(r))return!1;return!0}return!1}function a(e){return e.trimZeroWidth?e.trimZeroWidth():e.replace(/\uFEFF/,i)}String.isEmpty||(String.isEmpty=function(e){return null==e||(typeIs(e,String.TYPE_NAME)||n(e),e.isEmpty?e.isEmpty():0===e.length||o(e,i))}),String.equals||(String.equals=o),String.contains||(String.contains=function(e,t,r){return e.contains?e.contains(t,r):-1!==String.prototype.indexOf.call(e,t,r)}),String.equalsIgnoreCase||(String.equalsIgnoreCase=function(e,t){return e===t||(e.equalsIgnoreCase?e.equalsIgnoreCase(t):(null!=t||e.length===t.length)&&o(e.toUpperCase(),t.toUpperCase()))}),String.endsWith||(String.endsWith=function(e,t,r){if(e.endsWith)return e.endsWith(t,r);r=r||e.length,r-=t.length;var n=e.lastIndexOf(t);return-1!==n&&n===r}),String.last=function(e){return e.last?e.last():e[e.length-1]},String.lastCode=function(e){return e.lastCode?e.lastCode():e.charCodeAt(e.length-1)},String.startsWith||Object.defineProperty(String,"startsWith",{enumerable:!1,configurable:!1,writable:!1,value:function(e,t,r){return e.startsWith?e.startsWith(t,r):(r=r||0,e.indexOf(t,r)===r)}}),String.trim||(String.trim=function(e){return e.trim?e.trim():a(e=e.replace(/^\s+|\s+$/gm,i))}),String.trimLeft||(String.trimLeft=function(e){return e.trimLeft?e.trimLeft():(e.replace(/(^\s*)/g,i),a(e))}),String.trimRight||(String.trimRight=function(e){return e.trimRight?e.trimRight():(e.replace(/(\s*$)/g,i),a(e))}),String.compareTo||(String.compareTo=function(e,t){if(e.compareTo)return e.compareTo(t);var r=e.length,n=t.length,i=r-n,o=i<=0?r:n,a=e.charCodeAt,u=t.charCodeAt;for(let e=0;e<o;e++){let t=a(e)-u(e);if(0!==t)return t}return i}),String.fromCodePoint||function(){var e=function(){try{var e={};return Object.defineProperty(e,e,e)&&Object.defineProperty}catch(e){}}(),t=String.fromCharCode,r=Math.floor;function n(){var e,n,o=[],a=-1,u=arguments.length;if(!u)return i;for(var s=i;++a<u;){let i=Number(arguments[a]);if(!isFinite(i)||i<0||i>1114111||r(i)!=i)throw RangeError("Invalid code point: "+i);i<=65535?o.push(i):(e=55296+((i-=65536)>>10),n=i%1024+56320,o.push(e,n)),(a+1==u||o.length>16384)&&(s+=t.apply(null,o),o.length=0)}return s}e?e(String,"fromCodePoint",{value:n,configurable:!0,writable:!0}):String.fromCodePoint=n}(),String.prototype.codePointAt||function(){"use strict";Object.defineProperty(String.prototype,"codePointAt",{value:function(e){if(null==this)throw TypeError();var t=String(this),r=t.length,n=e?new Number(e):0;if(n!=n&&(n=0),!(n<0||n>=r)){var i,o=t.charCodeAt(n);return o>=55296&&o<=56319&&r>n+1&&(i=t.charCodeAt(n+1))>=56320&&i<=57343?1024*(o-55296)+i-56320+65536:o}},configurable:!0,writable:!0})}();const u=/[\s\S]/gi;String.asArray=function(e){return e.match(u)},Object.defineProperty(String,"BLANK",{value:i,writable:!1}),String.from=(e=>null==e?i:e.valueOf())},function(e,t,r){const{hasOwnProperty:n,getFunctionName:i,getFunctionDefine:o,getType:a,isNumber:u}=r(0),{errorCast:s,unsupportedType:l,noReference:c}=Error;function f(e,t){if(e===t)return!0;if(Function.getName(a(e))!==Function.getName(a(t)))return!1;if(e.size!==t.size)return!1;e[Symbol.iterator](),t[Symbol.iterator]()}Date.toJSON=Date.toString=function(e){return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()},Date.clone=function(e){return e instanceof Date||s(e,Date),new Date(e.getTime())},Number.isNumber||(Number.isNumber=u),Number.equals=function(e,t){return u(e)||l(e),u(t)||l(t),e==t},Number.from=(e=>u(e)?Number(e):NaN),Function.getName||(Function.getName=i),Function.EMPTY_BODY||Object.defineProperty(Function,"EMPTY_BODY",{value:()=>{},writable:!1}),Function.getStatic||(Function.getStatic=(e=>{var t={};for(let r in e)n(e,r)&&(t[r]=e[r]);return Object.isEmpty(t)?void 0:t})),Function.getDefine=(e=>o(i(e),e.count)),Map.isEmpty||(Map.isEmpty=function(e){return 0===e.size}),Map.equals||(Map.equals=f),Set.isEmpty||(Set.isEmpty=(e=>0===e.size)),Set.equals||(Set.equals=f)},function(e,t,r){const n=r(1),i=r(0).formatString,o="[${date}] ${level} ${message}",a="YYYY-MM-DD hh:mm:ss.ms";function u(e,t){return i(o,{date:n.formatTime(new Date,a),level:e,message:t})}t.log=t.ingo=(e=>{console.log(u("INFO",e))}),t.err=(e=>{console.error(e.message),console.error(u("ERROR",e.stack))}),t.warn=(e=>{console.warn(u("WARN",e))})},function(e,t){e.exports={MimeType:{JSON:"application/json",PDF:"application/pdf",JAVASCRIPT:"application/javascript",OCTET_STREAM:"application/octet-stream",DTD:"application/xml-dtd",ZIP:"application/zip",TEXT:"text/plain",HTML:"text/html",XML:"text/xml",CSS:"text/css",CSV:"text/csv",GIF:"image/gif",PNG:"image/png",JPG:"image/jpeg",BMP:"image/bmp",WEBP:"image/webp",ICON:"image/x-icon",SVG:"image/svg+xml"},HttpRequestMethod:{GET:"GET",PUT:"PUT",POST:"POST",DELETE:"DELETE",CONNECT:"CONNECT",HEAD:"HEAD",OPTIONS:"OPTIONS",TRACE:"TRACE",PATCH:"PATCH"},HttpStatusCode:{CONTINUE:100,SWITCHING_PROTOCOLS:101,PROCESSING:102,OK:200,CREATED:201,ACCEPTED:202,NON_AUTHORITATIVE_INFORMATION:203,NO_CONTENT:204,RESET_CONTENT:205,PARTIAL_CONTENT:206,MULTI_STATUS:207,ALREADY_REPORTED:208,IM_USED:226,MULTIPLE_CHOICES:300,MOVED_PERMANENTLY:301,FOUND:302,SEE_OTHER:303,NOT_MODIFIED:304,USE_PROXY:305,TEMPORARY_REDIRECT:307,PERMANENT_REDIRECT:308,BAD_REQUEST:400,UNAUTHORIZED:401,PAYMENT_REQUIRED:402,FORBIDDEN:403,NOT_FOUND:404,METHOD_NOT_ALLOWED:405,NOT_ACCEPTABLE:406,PROXY_AUTHENTICATION_REQUIRED:407,REQUEST_TIMEOUT:408,CONFLICT:409,GONE:410,LENGTH_REQUIRED:411,PRECONDITION_FAILED:412,PAYLOAD_TOO_LARGE:413,URI_TOO_LONG:414,UNSUPPORTED_MEDIA_TYPE:415,RANGE_NOT_SATISFIABLE:416,EXPECTATION_FAILED:417,I_AM_A_TEAPOT:418,MISDIRECTED_REQUEST:421,UNPROCESSABLE_ENTITY:422,LOCKED:423,FAILED_DEPENDENCY:424,UNORDERED_COLLECTION:425,UPGRADE_REQUIRED:426,PRECONDITION_REQUIRED:428,TOO_MANY_REQUESTS:429,REQUEST_HEADER_FIELDS_TOO_LARGE:431,UNAVAILABLE_FOR_LEGAL_REASONS:451,INTERNAL_SERVER_ERROR:500,NOT_IMPLEMENTED:501,BAD_GATEWAY:502,SERVICE_UNAVAILABLE:503,GATEWAY_TIMEOUT:504,HTTP_VERSION_NOT_SUPPORTED:505,VARIANT_ALSO_NEGOTIATES:506,INSUFFICIENT_STORAGE:507,LOOP_DETECTED:508,BANDWIDTH_LIMIT_EXCEEDED:509,NOT_EXTENDED:510,NETWORK_AUTHENTICATION_REQUIRED:511},NumberNonation:{HEX:16,DEC:10,OCT:8,BIN:2},HtmlTagAttribute:{input:{BUTTON:"button",CHECKBOX:"checkbox",COLOR:"color",DATE:"date",DATETIME_LOCAL:"datetime-local",EMAIL:"email",FILE:"file",HIDDEN:"hidden",IMAGE:"image",MONTH:"month",NUMBER:Number.TYPE_NAME,PASSWORD:"password",RADIO:"radio",RANGE:"range",RESET:"reset",SEARCH:"search",SUBMIT:"submit",TEL:"tel",TEXT:"text",TIME:"time",URL:"url",WEEK:"week"}},HtmlTag:{A:"a",ABBR:"abbr",ACRONYM:"acronym",ADDRESS:"address",APPLET:"applet",AREA:"area",ARTICLE:"article",ASIDE:"aside",AUDIO:"audio",B:"b",BASE:"base",BASEFONT:"basefont",BDI:"bdi",BDO:"bdo",BIG:"big",BLOCKQUOTE:"blockquote",BODY:"body",BR:"br",BUTTON:"button",CANVAS:"canvas",CAPTION:"caption",CENTER:"center",CITE:"cite",CODE:"code",COL:"col",COLGROUP:"colgroup",COMMAND:"command",DATALIST:"datalist",DD:"dd",DEL:"del",DETAILS:"details",DFN:"dfn",DIALOG:"dialog",DIR:"dir",DIV:"div",DL:"dl",DT:"dt",EM:"em",EMBED:"embed",FIELDSET:"fieldset",FIGCAPTION:"figcaption",FIGURE:"figure",FONT:"font",FOOTER:"footer",FORM:"form",FRAME:"frame",FRAMESET:"frameset",H1:"h1",H2:"h2",H3:"h3",H4:"h4",H5:"h5",H6:"h6",HEAD:"head",HEADER:"header",HR:"hr",HTML:"html",I:"i",IFRAME:"iframe",IMG:"img",INPUT:"input",INS:"ins",KBD:"kbd",KEYGEN:"keygen",LABEL:"label",LEGEND:"legend",LI:"li",LINK:"link",MAP:"map",MARK:"mark",MENU:"menu",META:"meta",METER:"meter",NAV:"nav",NOFRAMES:"noframes",NOSCRIPT:"noscript",OBJECT:Object.TYPE_NAME,OL:"ol",OPTGROUP:"optgroup",OPTION:"option",OUTPUT:"output",P:"p",PARAM:"param",PRE:"pre",PROGRESS:"progress",Q:"q",RP:"rp",RT:"rt",RUBY:"ruby",S:"s",SAMP:"samp",SCRIPT:"script",SECTION:"section",SELECT:"select",SMALL:"small",SOURCE:"source",SPAN:"span",STRIKE:"strike",STRONG:"strong",STYLE:"style",SUB:"sub",SUMMARY:"summary",SUP:"sup",TABLE:"table",TBODY:"tbody",TD:"td",TEXTAREA:"textarea",TFOOT:"tfoot",TH:"th",THEAD:"thead",TIME:"time",TITLE:"title",TR:"tr",TRACK:"track",TT:"tt",U:"u",UL:"ul",VAR:"var",VIDEO:"video",WBR:"wbr"}}},function(e,t,r){const{hasOwnProperty:n,Interface:i,Iterator:o,objectClone:a,getType:u}=r(0),{unsupportedOperation:s,unsupportedType:l,errorCast:c,illegalArguments:f}=Error;e.exports={Interface:i,Iterator:o,MathUtil:{hexConvert:function(){const e=2,t=8,r=10,n=16;SIXTY_FOUR=64;const i="0b",o="0o",a="0x",u=Number.NaN_TYPE_NAME,s={};function l(u,l){switch(l){case e:return u=i+u,Number(u);case t:return u=o+u,Number(u);case r:return Number(u);case n:return u=a+u,Number(u);default:return function(e,t){var r=t.length,n=0,i=0;for(let o of e){let e=t.indexOf(o);if(-1===e)return NaN;i+=Math.pow(r,n)*e,n++}return i}(u,s[l])}}function c(e,t=r,i=r){t=Number(t),i=Number(i),t>n&&!(t in s)&&f("不支持的输入进制基数："+t),i>n&&!(i in s)&&f("不支持的输出进制基数："+i);let o=typeOf(e);switch(o){case String.TYPE_NAME:if(e=l(e,t),Object.is(e,NaN))return u;break;case Number.TYPE_NAME:i=t;break;default:f("不被支持的参数类型："+o)}return function(e,t){var r=t.length,n=[];do{n.push(e%r),e=Math.floor(e/r)}while(e>0);for(var i=[];n.length;)i.push(t[n.pop()]);return i.join(String.BLANK)}(e,i<r?s[r].slice(0,i):s[i])}return s[r]="0123456789",s[n]=s[r]+"ABCDEF",s[26]="abcdefghijklmnopqrstuvwxyz",s[SIXTY_FOUR]=(s[r]+s[26]+s[26].toUpperCase()).replace(/[Oo01lI]/g,String.BLANK)+"!@$&#%",s[62]=s[SIXTY_FOUR].slice(2),c.BIN=e,c.OCT=t,c.DEC=r,c.HEX=n,c.TWENTY_SIX=26,c.SIXTY_TWO=62,c.SIXTY_FOUR=SIXTY_FOUR,c}(),PrimeNumber:function(){const e=[3,5,7,11,13,17,19,23,29,31,37,41,43,47];return{calcByInput:(t,r)=>{Number.isNumber(t)||c(t,Number),Number.isNumber(r)||c(r,Number),t>r&&s("开始数必须大于结束数"),(r<0||t<0)&&s("开始数必须大于 0");let n=e.slice(),i=function(e,t){let r=[];for(let n=e.length-1;n>=0&&!(e[n]<t);n--)r.unshift(e[n]);return t<2&&r.unshift(2),r}(n,t);e:for(let e=53;e<r;e+=2){for(let t=0;t<n.length;t++)if(e%n[t]==0)continue e;n.push(e),e>=t&&i.push(e)}return i},checkIs:t=>{typeIs(t,Number.TYPE_NAME)||c(t,Number);let r=Math.sqrt(t);for(let n=0;n<e.length;n++){let i=e[n];if(i>r)return!0;if(t%i==0)return!1}for(let e=51;e<r;e+=2)if(t%e==0)return!1;return!0}}}()},ObjectUtil:{iterator:e=>new o(e),hasOwnProperty:n,override:function(e,t,r){var n=e[t];e[t]=r(function(){return n.apply(e,arguments)})},argumentsToArray:function(){return Array.of(arguments)},clone:a,getType:u},StringUtil:{normal:function(e){return e.replace(/<(\/)?(b|i|strike|em|u|strong|sub|sup)>/gi,EMPTY_STRING)},weight:function(e){return"<"+e+">"+input+"</"+e+">"},queryString:function(e){if(typeIs(e,String.TYPE_NAME))return encodeURI(e);var t=[];for(var r in e)n(e,r)&&(typeIs(e[r],Object.TYPE_NAME)?t.push(r+"="+JSON.stringify(encodeURIComponent(e[r]))):t.push(r+"="+encodeURIComponent(e[r])));return t.join("&")},firstToUpperCase:function(e){return typeIs(e,String.TYPE_NAME)||c(e,String),e.charAt(0).toUpperCase()+e.slice(1)},firstToLowserCase:function(e){return typeIs(e,String.TYPE_NAME)||c(e,String),e.charAt(0).toLowserCase()+e.slice(1)}},NumberUtil:{addBeforeZero:function(e,t){typeIs(e,Number.TYPE_NAME)||l(e),typeIs(t,Number.TYPE_NAME)||l(t);var r=[];for(let e=0;e<t;e++)r.push("0");return r.join(EMPTY_STRING)+e},addComma:(e,t)=>{isNumber(e)||c(e,Number),void 0===t||isNumber(t)||c(t,Number),t=parseInt(Math.pow(10,t||3));for(var r=String.BLANK;;){let n=e%t;if(e=parseInt(e/t),rersult=n+r,0===e)break;r=","+r}return r},parseInt:function(e,t){return parseNumber(e,t,parseInt)},parseFloat:function(e,t){return parseNumber(e,t,parseFloat)}},CharUtil:function(){function e(e){throw new Error(e+" 不是合法的字符")}var t=65,r=90,n=97,i=122,o=[" ","\t","\r","\n","\r\n","\v","\f","","","",""];function a(o){u(o)||e(o);var a=letter.charCodeAt(0);return a>=t&&a<=r||a>=n&&a<=i}function u(e){return typeIs(e,String.TYPE_NAME)||c(e,String),1===e.length}return{isChar:u,isNumber:Number.isNumber,isAlphabet:a,isNumberOrAlphabet:function(e){return Number.isNumber(e)||a(e)},isASCII:t=>(u(t)||e(t),t.charAodeAt(0)<128),isSpace:function(t){return u(t)||e(t),Array.has(o,t)},change:function(e,t){if(Number.isNumber(t)||c(t,Number),u(e))return String.fromCharCode(e.charCodeAt(0)+t);s(e+" 不是合法的字符")},compare:function(t,r){return u(t)||e(t),u(r)||e(r),t.charCodeAt(0)-r.charCodeAt(0)},asUnicodeEncode:function(t){var r;switch(Number.isNumber(t)?r=t.toString():(u(t)||e(t),r=t.charCodeAt(0).toString(16)),(r=r.toUpperCase()).length){case 1:r="000"+r;break;case 2:r="00"+r;break;case 3:r="0"+r}return"\\u"+r},ZERO:48,NINE:57,UPPER_A:t,UPPER_Z:r,LOWER_A:n,LOWER_Z:i}}()}},function(e,t,r){const{browserOnly:n,hasOwnProperty:i}=r(0),{unsupportedType:o,indexOutOfBounds:a,errorCast:u}=Error,s=String.BLANK,l="<",c="</",f=">",E=" />",p=["img","input","br","hr","title"],g=["html","head","title","body","a","i","b","del","u","strike"],h=["script"],T=new Map;function N(e,t,r){let i,A="$=!"+(2388/Math.random()+Math.sin(Date.now()));if(!e||!typeIs(e,String.TYPE_NAME))throw new Error("只有非空文本能作为标签");if(Array.has(h,e))throw new Error("不允许使用 XmlWrapper 来动态构建 "+e+" 元素");t instanceof Map?i=t:(i=new Map,t&&Object.forEach(t,function(e,t){i.set(e,t)}));var m=0,O=0,b=[],y=null;this.add=function(t,r){if(e||b.push({index:m++,type:String,parse:void 0===r||r}),Array.has(p,e))throw new Error("不能向当前标签（"+e+"）内无法添加元素");if(t instanceof N){if(Array.has(g,e)&&e===t.getTag())throw new Error("当前 XML 节点的标签（"+e+"）中不被允许储存同名子节点");b.push({index:O++,type:N,element:t}),t.setParent(this)}else typeIs(t,String.TYPE_NAME)?b.push({index:m++,type:String,element:t,parse:void 0===r||r}):o(t);return this},this.clear=function(){this.clearChildren(),i.clear(),y=null},this.clearChildren=function(){O=0,m=0,b=[]},this.nodeCount=function(e){if(!e)return O;var t=0;return Object.forEach(b,function(r,n){n.type===N&&n.element.getTag()===e&&t++}),t},this.isEmpty=function(){return Object.isEmpty(b)},this.setXmlType=function(e){r=e},this.setParent=function(e){y=e},this.getParent=function(){return y},this.isRoot=function(){return null==y},this.getElement=function(e){return b[e]},this.getText=function(e){if(isNumber(e))if(e<m)for(let t=0,r=b.length;t<r;t++){let r=b[t];if(String===r.type&&r.index===e)return r.element}else a(m,e);else u(e,Number)},this.getTexts=function(){var e=[];for(let t=0,r=b.length;t<r;t++){let r=b[t];String===r.type&&e.push(r.element)}return e},this.hashCode=function(){return A},this.getNode=function(e,t){if(t)if(e<O)for(let r=0,n=b.length;r<n;r++){let n=b[r],i=n.element;if(n.type===N&&e===n.index&&i.getTag()===t)return i}else a(O,e);else if(Number.isNumber(e))if(e<O)for(let t=0,r=b.length;t<r;t++){let r=b[t];if(r.type===N&&e===r.index)return r.element}else a(O,e);else u(e,Number);return null},this.lastNode=function(e){if(e)if(typeIs(e,String.TYPE_NAME))for(let t=b.length-1;t>=0;t--){let r=b[t],n=r.element;if(r.type===N&&n.getTag()===e)return n}else u(e,String);else for(let e=b.length-1;e>=0;e--){let t=b[e];if(t.type===N)return t.element}return null},this.getNodes=function(e){let t=[];if(e)if(typeIs(e,String.TYPE_NAME))for(let r=0,n=b.length;r<n;r++){let n=b[r],i=n.element;n.type===N&&i.getTag()===e&&t.push(i)}else u(e,String);else for(let e=0,r=b.length;e<r;e++){let r=b[e];r.type===N&&t.push(r.element)}return t},this.size=function(){return b.length},this.update=function(e,t){Number.isNumber(e)||u(e,Number);var r=typeof t;String.TYPE_NAME===r||t instanceof N||o(t);var n=b.length;e>=n&&a(e,n);var i=b[e];if(r!==typeof i.element){i.element=t;var s=!0;for(e+=1;e<n;e++){let t=b[e];r===typeof t.element?(s&&(i.index=t.index,s=!1),t.index++):t.index--}String.TYPE_NAME===r?(O++,m--):(m++,O--)}else i.element=t},this.compare=function(t){if(this===t)return!0;if(!(t instanceof Map))return!1;if(e!==t.getTag())return!1;for(let[e,n]of i.entries()){var r=t.get(e);if(typeof n!=typeof r)return!1;if(n!==r&&!n.compare(r))return!1}return!0},this.on=function(e,t){n()},this.render=function(){n();let t=document.createElement(e);return i.forEach(function(e,r){t[function(e){return T.has(e)?T.get(e):e}(r)]=e}),Object.forEach(b,function(e,r){switch(r.type){case String:r.parse?t.appendChild(document.createTextNode(r.element)):t.innerHTML=r.element;break;case N:t.appendChild(r.element.render());break;default:o(r.type)}}),t},this.remove=function(e,t,r,n){var i=b.length;(e<0||e>=i)&&a(e,0);var u=e+t;i<=u&&a(u,i);var s=[];for(let t=e;t<u;t++){let e=b[t];switch(e.type){case String:r===String.TYPE_NAME&&(tRemoved++,s.push(e.element));break;case N:"node"===r&&(n&&e.element.getTag()===n?(s.push(e.element),0):n||(s.push(e.element),0));break;default:o(e.type)}}m-=0,O-=nRevmoed;for(let e=u;e<i;e++){let t=b[e];switch(t.type){case String:t.index-=0;break;case N:t.index-=nRevmoed;break;default:o(t.type)}}return s},this.putAttribute=function(e,t){i.set(e,t)},this.putAllAttributes=function(e){Object.forEach(e,function(e,t){i.set(e,t)})},this.removeAttribute=function(e){return i.delete(e)},this.getAttribute=function(e){return i.get(e)},this.containsAttribute=function(e){return i.has(e)},this.getTag=function(){return e},this.toString=this.toHTML=function(){var t=[l,e];i.forEach(function(e,r){t.push(" "+r+'="'+i.get(r)+'"')});var n=b.length;if(0===n)r?t.push(E):Array.has(p,e)?t.push(E):t.push(f+c+e+f);else{t.push(f);for(var o=0;o<n;o++)t.push(b[o].element.toString());t.push(c+e+f)}return t.join(s)}}T.set("class","className"),e.exports={newXmlWrapper:function(e,t,r){return new N(e,t,r)},isXmlWrapper:function(e){return e instanceof N},jsonToHTML:function e(t){Array.isArray(t)||o(t);var r=[];for(let i=0,o=t.length;i<o;i++){let o=t[i];if(typeIs(o,Object.TYPE_NAME)){let t=new N(o.tag,o.attribute),i=o.child;if(i)if(typeIs(i,String.TYPE_NAME))t.add(i);else{var n=e(i);for(let e=0,r=n.length;e<r;e++)t.add(n[e])}r.push(t)}else r.push(o.toString())}return r.join(String.BLANK)},jsonToXml:function e(t,r){typeIs(t,Object.TYPE_NAME,Array.TYPE_NAME,String.TYPE_NAME,Number.TYPE_NAME)||o(t);var n=new N(r||"root");if(n.setXmlType(!0),typeOf(t,String.TYPE_NAME))n.add(t);else for(let r in t)if(i(t,item)){let i=t[r];n.add(e(i,r))}return n},XML:!1,HTML:!0}},function(e,t,r){function n(e){var t=(e=e.toString().split("."))[1];if(t&&t.length>2){let e=parseInt(t[2]);t=parseInt(t.slice(0,2)),e>4&&(t+=1)}return e=e[0]+"."+(t||0)}e.exports={formatNumber:n,formatFileSize:function(e,t){return t=t||"#.00",e<1048576?n(e/1024)+" KB":e<1073741824?n(e/1048576)+" MB":e<1099511627776?n(e/1073741824)+" GB":n(e/1099511627776)+" TB"},formatString:r(0).formatString}},function(e,t){const r="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",n="1234567890";function i(e,t){var r=[],n=e.length;for(let i=0;i<t;i++)r[i]=e[parseInt(Math.random()*n)];return r.join(EMPTY_STRING)}e.exports={getRandCode:function(e){return i("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",e)},randAllCase:function(e){return i(r,e)},randUpperCase:function(e){return i("ABCDEFGHIJKLMNOPQRSTUVWXYZ",e)},randLowerCase:function(e){return i("abcdefghijklmnopqrstuvwxyz",e)},randNumber:function(e){if((e=e||16)>16)throw new Error("最多只能获取不超过 16 位的整数");return parseInt(Math.random()*Math.pow(10,e))},randNumberAndLetter:function(e){var t,i,o=[];switch(arguments[1]){case 0:t=r+n,i=62;break;case 1:t="ABCDEFGHIJKLMNOPQRSTUVWXYZ"+n,i=36;break;case 2:t="abcdefghijklmnopqrstuvwxyz"+n,i=36}for(let r=0;r<e;r++)o[r]=t[parseInt(Math.random()*i)];return o},ALL_CASE:0,UPPER_CASE:1,LOWER_CASE:2}},function(e,t,r){const n=r(0).replaceElement,{LOOP_REG_START:i,LOOP_REG_END:o,LOOP_IN_START:a,DEFAULT_SURFIX:u,LOOP_REG_START_L:s}=n;e.exports={replaceElement:n,replaceLoop:function e(t,r,l){for(var c=[];;){let E=t.indexOf(i);if(E>0)c.push(t.slice(0,E)),t=t.slice(E);else if(E<0){c.push(t);break}let p=t.indexOf(u),g=t.slice(s,p);var f=o+g+u;let h=t.slice(p+1,t.indexOf(f)),T=r,N=g.split(".");for(let e=0,t=N.length;e<t&&T;e++)T=T[N[e]];if(null!=T){let t=Array.isArray(T),r=t?T:Object.keys(T);for(let i=0,o=r.length;i<o;i++){let o=T[t?i:r[i]],u=h;u=(u=u.replace(new RegExp(a+"id}","g"),i)).replace(new RegExp(a+"key}","g"),r[i]),String.TYPE_NAME===typeof o?c.push(u.replace(new RegExp(a+"text}","g"),r[i])):(u=e(u,o),u=l(u=n(u,o,a+g+"."),o,g+"."),c.push(u))}}t=t.slice(t.indexOf(f)+f.length)}return c.join(String.BLANK)},htmlEscape:function(e,t){var r,n,i,o;return e=e.replace(/\&/g,"&amp;"),t&&(r=t.first,n=t.second,i=t.third,o=t.forth),e=(e=(e=r?r(e):e).replace(/  /gi," &nbsp;")).replace(/\t/gi,"&nbsp;&nbsp;&nbsp;&nbsp;\ufeff"),e=(e=(e=n?n(e):e).replace(/</gi,"&lt;")).replace(/>/gi,"&gt;"),e=(e=i?i(e):e).replace(/(\r\n|\n|\r)/gi,"<br />"),e=o?o(e):e}}},function(e,t,r){const n=r(1),i=/[A-Z]/,o=/[a-z]/,a=/[0-9]/,u=/[\@#\$\%\&\*\!\^\+\=\-_\~:\;\,\.\?]/;function s(e,t){return{message:e,id:t||"password"}}e.exports={passwordCheckError:s,checkPassword:function(e){if(String.isEmpty(e))return s("密码不能为空");if(e.length<6)return s("密码长度最少 6 位");var t=0;return i.test(e)&&(t+=8),o.test(e)&&(t+=4),a.test(e)&&(t+=2),u.test(e)&&(t+=1),t<13&&7!==t&&11!==t?s("密码至少要包含大写字母、小写字母、数字或特殊字符中的三项"):void 0},isIDNumber:function(e){var t=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],r=0;if(!/^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i.test(e))return!1;var i=e.substr(6,4),o=e.substr(10,2),a=e.substr(12,2);if(e.substr(6,8)!==n.formatTime(new Date(i,o,a),"YYYYMMDD"))return!1;for(let n=0;n<17;n++)r+=e[n]*t[n];var u="10X98765432"[r%11];return String.last(e).toUpperCase()===u.toUpperCase()}}}]);