# vue-car-number

### 介绍
* vue-car-number是一款基于vue的车牌号输入控件，支持自定义输入框。
* vue3版： [car-number-vue3](https://github.com/windy-boy/car-number-vue3#readme)

### 示例
[gitHub](https://windy-boy.github.io/vue-car-number-demo)

[gitee](http://chenjiancong.gitee.io/vue-car-number-demo)

### 项目中使用
* 下载

```
npm install vue-car-number
```
* 在main.js中加入

```
import CarNumber from 'vue-car-number'
import 'vue-car-number/lib/carNumber.css'
Vue.use(CarNumber);
```
* 在需要的页面中使用

```
<CarNumber></CarNumber>
```

## API

### Props
名字|类型|默认值|说明
--|--|--|--
width|Number|200| 输入框宽度
height|Number|30| 输入框高度
borderColor|String|#959595| 输入框边框颜色
backgroundColor|String|transparent| 输入框背景颜色
borderRadius|Number|0| 边框圆角
fontColor|String|#959595| 文字颜色
fontSize|Number|16| 文字大小
defaultCarPlate|String|null| 默认车牌号
maskBackground|String|transparent| 遮罩颜色
clickMaskCloseKeyBoard|Boolean|true| 是否点击遮罩关闭键盘
isNewEnergy|Boolean|false| 是否新能源车牌

### Events
名字|参数|说明
--|--|--
@submit|--|关闭键盘时触发；返回输入的值

### Slots
参数|slotProps|说明
--|--|--
default|value:Array|自定义输入框

## 贡献
有任何意见或建议都欢迎提 issue

## License
[MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89)

## 特别感谢
[vue](https://github.com/vuejs/vue)

[input-number-plate](https://github.com/wokeT/input-number-plate)

## Change Log
* 1.0.6

增加参数backgroundColor，增加键盘阴影

* 1.0.5

修复键盘没有挡住输入框，但页面存在滚动条的时候，键盘弹出页面会滚动的问题

* 1.0.4

none

* 1.0.3

默认省份改为默认车牌号

* 1.0.2

默认样式调整

* 1.0.1

默认样式调整

* 1.0.0

首次发版
