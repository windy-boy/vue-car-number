import CarNumber from './car-number'

CarNumber.install = function(Vue) {
  Vue.component(CarNumber.name, CarNumber)
}

export default CarNumber;