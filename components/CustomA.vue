<i18n src="~/locales/components/CustomA.yml"></i18n>
<template>
  <a :href="href"
     :target="target"><slot :aria-hidden="srText" /><custom-span class="visually-hidden">{{ srDisplayText }}</custom-span></a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: false,
      default: null
    },
    srText: {
      type: String,
      required: false,
      default: null
    }
  },

  computed: {
    srDisplayText() {
      return this.srText ? this.srText : this.$t('default_sr_text')
    }
  }

}
</script>
