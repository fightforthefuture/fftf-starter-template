<i18n src="~/locales/global.yml"></i18n>

<template>
  <div>
    <nuxt />
    <PageFooter />

    <LazyArchivedModal v-if="modal === 'archived'" />
    <LazyCallFormModal v-else-if="modal === 'call-form'" />
    <LazyCallScriptModal v-else-if="modal === 'call-script'" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { createMetaTags } from '~/assets/js/helpers'

export default {
  head() {
    return {
      title: this.$t('global.site_title'),
      meta: createMetaTags({
        siteName: this.$t('global.site_title'),
        title: this.$t('global.sharing.title'),
        description: this.$t('global.sharing.description'),
        image: this.$t('global.sharing.image'),
        url: this.$t('global.sharing.url')
      })
    }
  },

  computed: {
    ...mapState(['modal'])
  },

  mounted() {
    // update state when bootstrap modal is closed
    this.$root.$on('bv::modal::hidden', (bvEvent, modalId) => {
      this.$store.commit('hideModal')
    })
  }
}
</script>
