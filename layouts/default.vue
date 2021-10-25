<i18n src="~/locales/cms.yml"></i18n>

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
      title: this.$t('cms.site_title'),
      meta: createMetaTags({
        siteName: this.$t('cms.site_title'),
        title: this.$t('cms.open_graph_title'),
        description: this.$t('cms.open_graph_description'),
        image: this.$t('cms.open_graph_image'),
        url: this.$t('cms.site_url')
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
