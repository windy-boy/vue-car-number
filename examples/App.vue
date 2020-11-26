<template>
  <div id="app">
    <div style="height: 500px; width: 100%;"></div>
    <div @click="change" class="btn">{{text}}</div>
    <div class="btn" @click="isCustomize = !isCustomize">{{text1}}</div>
    <template v-if="isCustomize">
      <CarNumber
        @submit="submit"
        :isNewEnergy="isNewEnergy">
        <template #default="slotProps">
          <div class="box">
            <div v-for="item in num" :key="item" class="item">{{slotProps.value[item - 1]}}</div>
          </div>
        </template>
      </CarNumber>
    </template>
    <template v-else>
      <CarNumber
        :isNewEnergy="isNewEnergy"
        :borderRadius="10"
        @submit="submit"
      ></CarNumber>
    </template>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      isNewEnergy: false,
      isCustomize: false
    }
  },
  computed: {
    text() {
      return this.isNewEnergy ? '传统能源' : '新能源'
    },
    text1() {
      return this.isCustomize ? '基本控件' : '自定义控件'
    },
    num() {
      return this.isNewEnergy ? 8 : 7
    }
  },
  methods: {
    submit(val) {
      console.log(val, 'val')
    },
    change() {
      this.isNewEnergy = !this.isNewEnergy
    }
  }
}
</script>

<style>
#app .btn {
  width: 80px;
  padding: 5px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  color: #333;
  display: inline-block;
  margin-right: 20px;
}
.box {
  display: flex;
  margin-top: 20px;
}
.item {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-right: 10px;
  border: 1px solid #959595;
}
</style>
