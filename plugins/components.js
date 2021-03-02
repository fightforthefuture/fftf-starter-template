import Vue from 'vue'
import CustomA from '~/components/CustomA.vue'
import CustomSpan from '~/components/CustomSpan.vue'
import Uppercase from '~/components/Uppercase.vue'
const components = { CustomA, CustomSpan, Uppercase }

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})
