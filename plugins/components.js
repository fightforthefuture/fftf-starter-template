import Vue from 'vue'
import CustomA from '~/components/CustomA.vue'
import CustomSpan from '~/components/CustomSpan.vue'
const components = { CustomA, CustomSpan }

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})
