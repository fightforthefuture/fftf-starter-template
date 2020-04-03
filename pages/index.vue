<i18n src="~/locales/pages/index.yml"></i18n>

<style lang="scss" scoped>
.container {
  max-width: 680px;
}

section {
  padding: 3rem;

  &:nth-child(even) {
    background-color: $grey-light-color;
  }
}
</style>

<template lang="pug">
  .index-page.text-center
    include ../templates/index.html
</template>

<script>
import { smoothScrollToElement } from '~/assets/js/helpers'
import ActionNetworkForm from '~/components/ActionNetworkForm'

export default {
  components: {
    ActionNetworkForm
  },

  head() {
    return {
      titleTemplate: `%s - ${this.$t('page_title')}`
    }
  },

  methods: {
    scrollTo(hash) {
      const duration = 500
      smoothScrollToElement(hash, duration)
      setTimeout(() => {
        location.hash = hash
      }, duration)
    }
  }
}
</script>
