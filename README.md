# car-number

### 介绍
* car-number是一款基于vue的车牌号输入控件，支持自定义输入框。

### 项目中使用
* 下载

```
npm install vue-car-number
```
* 在main.js中加入

```
import CarNumber from 'vue-car-number';
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
height|Number|30| 输入框边框颜色
borderColor|String|#959595| 输入框边框颜色
borderRadius|Number|0| 边框圆角
fontColor|String|#959595| 文字颜色
fontSize|Number|16| 文字大小
defaultProvince|String|null| 默认省份
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