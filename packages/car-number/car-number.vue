<template>
  <div class="car__number__container">
    <div @click="clickMask()" v-if="visible" class="mask__container" :style="{backgroundColor: maskBackground}"></div>

    <!-- 输入框 -->
    <div @click="openFun()" ref="inputContainer">
      <slot :value="inputValue">
        <div
          class="input__container"
          :style="{border: `1px solid ${borderColor}`, borderRadius: borderRadius + 'px', width: width + 'px', height: height + 'px', backgroundColor: backgroundColor}"
        >
          <div
            class="input__box"
            v-for="item in carNumberLength"
            :key="item"
            :style="{fontSize: fontSize + 'px', color: fontColor}"
          >
          <div class="line" v-if="item != carNumberLength" :style="{backgroundColor: borderColor}"></div>
            {{ inputValue[item - 1] }}
          </div>
        </div> 
      </slot>
    </div>
    <!-- 键盘 -->
    <transition name="keyboard">
      <div v-if="visible" class="keyboard__container">
        <header class="keybord__header">
          <span @click.stop="cancel()">清空</span>
          <span @click.stop="submit()">关闭</span>
        </header>

        <div class="keyboard__body">
          <ul class="keyboard__body__province__list" v-if="keybordType === 'ABC'">
            <li
              @click.stop="inputWord(item)"
              class="button"
              v-for="item in provinceList.slice(0, 30)"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
          <div v-else>
            <ul class="keyboard__body__letter__list">
              <li
                @click.stop="inputWord(item)"
                class="button"
                v-for="item in letterList.slice(0, 10)"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
            <ul class="keyboard__body__letter__list">
              <li
                @click.stop="inputWord(item)"
                class="button"
                v-for="item in letterList.slice(10, 20)"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
            <ul class="keyboard__body__letter__list__surplus">
              <li
                @click.stop="inputWord(item)"
                class="button"
                v-for="item in letterList.slice(20, 29)"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="keyboard__body__bottom">
            <div @click.stop="toggle()" class="other__button">
              {{ keybordType }}
            </div>
            <ul class="keyboard__body__bottom__item__list" :style="{columnCount: keybordType === 'ABC' ? 7 : 5}">
              <li @click.stop="inputWord(item)" class="button" v-for="item in surplusList" :key="item">
                {{ item }}
              </li>
            </ul>
            <div @click.stop="deleteOne()" class="other__button">
              <i class="iconfont-cjc icon-cjc-delete delete__btn"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import '../assets/font/iconfont.css'
export default {
  name: 'CarNumber',
  props: {
    // 输入框宽度
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 30
    },
    // 输入框边框颜色
    borderColor: {
      type: String,
      default: '#959595'
    },
    // 输入框背景颜色
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    // 边框圆角
    borderRadius: {
      type: Number,
      default: 0
    },
    // 文字颜色
    fontColor: {
      type: String,
      default: '#959595'
    },
    // 文字大小
    fontSize: {
      type: Number,
      default: 16
    },
    // 默认车牌号
    defaultCarPlate: {
      type: String
    },
    // 遮罩颜色
    maskBackground: {
      type: String,
      default: 'transparent'
    },
    // 是否点击遮罩关闭键盘
    clickMaskCloseKeyBoard: {
      type: Boolean,
      default: true
    },
    // 是否新能源车牌
    isNewEnergy: {
      type: Boolean,
      default: false
    },
    // 是否禁用输入
    disabled:{
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      inputValue: [],
      carNumberLength: 7,
      keybordType: 'ABC',
      placehoderDom: null,
      isOcclusion: false,
      provinceList: [
        '京',
        '津',
        '渝',
        '沪',
        '冀',
        '晋',
        '辽',
        '吉',
        '黑',
        '苏',
        '浙',
        '皖',
        '闽',
        '赣',
        '鲁',
        '豫',
        '鄂',
        '湘',
        '粤',
        '琼',
        '川',
        '贵',
        '云',
        '陕',
        '甘',
        '青',
        '蒙',
        '桂',
        '宁',
        '新',
        '藏',
        '使',
        '领',
        '警',
        '学',
        '港',
        '澳'
      ],
      letterList: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
    }
  },
  watch: {
    isNewEnergy: {
      handler (val) {
        this.carNumberLength = val ? 8 : 7
      },
      immediate: true
    },
    defaultCarPlate: {
      handler (val) {
        if (val) {
          this.inputValue = []
          for (let i = 0, len = val.length; i < len; i++) {
            this.inputValue.push(val[i])
          }
        }
      },
      immediate: true
    },
    inputValue: {
      handler () {
        let len = this.isNewEnergy ? 8 : 7
        if (this.inputValue.length === 0) this.keybordType = 'ABC'
        if (this.inputValue.length > 0 && this.inputValue.length < len) this.keybordType = '返回'
      },
      immediate: true
    },
    visible (val) {
      if (val) {
        // 输入框被挡住,同时页面无滚动条时，展示占位块，让页面可滚动
        if (this.checkOcclusion()) {
          this.placehoderDom.style.display = 'block'
        }
        // 只有输入框被挡住的时候才滚动
        if (this.isOcclusion) {
          window.scrollTo(0, 250)
        }
      } else {
        if (this.isOcclusion) {
          document.body.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
          })
        }
        this.placehoderDom.style.display = 'none'
      }
    }
  },
  computed: {
    surplusList () {
      if (this.keybordType === 'ABC') {
        return this.provinceList.slice(29, 36)
      } else {
        return this.letterList.slice(29, 34)
      }
    }
  },
  created () {
    if (window !== 'undefined') {
      this.placehoderDom = document.createElement('div')
      this.placehoderDom.style.cssText = 'height: 260px; width: 100%; background: red; opacity: 0'
      this.placehoderDom.style.display = 'none'
      document.body.appendChild(this.placehoderDom)
    } else {
      throw new Error('不支持非window环境')
    }
  },
  methods: {
    // 关闭键盘
    close () {
      this.visible = false
    },
    // 点击输入框
    openFun(){
      if(this.disabled) return;
      this.open();
    },
    // 打开键盘
    open () {
      this.visible = true
    },
    // 清空
    cancel () {
      this.inputValue = []
      this.$emit('submit', this.inputValue.join(''))
    },
    // 完成输入
    submit () {
      this.$emit('submit', this.inputValue.join(''))
      this.close()
    },
    // 键盘类型切换
    toggle () {
      let len = this.isNewEnergy ? 7 : 6
      if (this.inputValue.length > 0 && this.inputValue.length < len) return
      this.keybordType = this.keybordType === 'ABC' ? '返回' : 'ABC'
    },
    // 删除一个字符
    deleteOne () {
      this.inputValue.pop()
    },
    // 输入
    inputWord (val) {
      if (this.isNewEnergy) {
        if (this.inputValue.length === 8) return
      } else {
        if (this.inputValue.length === 7) return
      }
      this.inputValue.push(val)
    },
    // 检测键盘是否遮挡输入框
    checkOcclusion () {
      const clientHeight = document.documentElement.clientHeight
      const scrollHeight = document.documentElement.scrollHeight
      const inputTopHeight = this.$refs.inputContainer.getBoundingClientRect().top
      const inputHeight = this.$refs.inputContainer.scrollHeight
      // 键盘是否挡住输入框
      this.isOcclusion = inputHeight + 250 + inputTopHeight >= clientHeight
      // 如果输入框被挡住，并且页面没有滚动条,返回true
      if (
        inputHeight + 250 + inputTopHeight >= clientHeight &&
        scrollHeight === clientHeight
      ) {
        return true
      } else {
        return false
      }
    },
    clickMask () {
      if (this.clickMaskCloseKeyBoard) {
        this.submit()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.car__number__container {
  user-select: none;
  .keyboard-enter-active,
  .keyboard-leave-active {
    transition: all 0.2s linear;
    transform: translateY(0px);
  }
  .keyboard-enter, .keyboard-leave-to {
    transform: translateY(250px);
}
  .mask__container {
    width: 100vw;
    overflow-y: scroll;
    height: calc(100vh + 250px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
  }
  .input__container {
    position: relative;
    z-index: 99;
    display: flex;
    .input__box {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .line {
      width: 1px;
      position: absolute;
      transform: translate(0, -50%);
      top: 50%;
      right: 0;
      height: 50%;
    }
  }
  
  .keyboard__container {
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 250px;
    background: #d0d3dc;
    box-shadow: 0 6px 10px 3px #959595;
    .keybord__header {
      padding: 0 15px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      background: rgb(240, 240, 240);
    }
    .keyboard__body {
      padding: 5px 5px 15px 5px;
      box-sizing: border-box;
      &__province__list {
        list-style: none;
        padding: 0;
        margin: 0;
        column-count: 10;
        column-gap: 5px;
      }
      &__letter__list {
        list-style: none;
        padding: 0;
        margin: 0;
        column-count: 10;
        column-gap: 5px;
      }
      &__letter__list__surplus {
        list-style: none;
        padding: 0;
        margin: 0;
        column-count: 9;
        column-gap: 5px;
        padding: 0 13px;
      }
      &__bottom {
        display: flex;
        justify-content: space-between;
        &__item__list {
          width: 100%;
          margin: 0;
          padding: 0 5px;
          list-style: none;
          column-count: 7;
          column-gap: 5px;
        }
      }
    }
  }
  .button {
    &:active {
      background: rgb(240, 237, 237);
    }
    text-align: center;
    line-height: 40px;
    height: 40px;
    border-radius: 5px;
    background: white;
    color: black;
    margin-bottom: 7px;
  }
  .other__button {
    &:active {
      background: white;
    }
    width: 15vw;
    height: 40px;
    background: #a8b0bd;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    color: #000;
    .delete__btn {
      font-size: 24px;
      color: #000;
    }
  }
}
</style>