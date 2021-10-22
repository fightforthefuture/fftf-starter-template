<i18n src="~/locales/cms.yml"></i18n>

<template>
  <div>
    <nuxt />
    <PageFooter />

    <ArchivedModal v-if="modal === 'archived'" />
    <CallFormModal v-else-if="modal === 'call-form'" />
    <CallScriptModal v-else-if="modal === 'call-script'" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { createMetaTags } from '~/assets/js/helpers'
import CallFormModal from '~/components/CallFormModal'
import CallScriptModal from '~/components/CallScriptModal'
import ArchivedModal from '~/components/ArchivedModal'
import PageFooter from '~/components/PageFooter'

export default {
  components: {
    CallFormModal,
    CallScriptModal,
    ArchivedModal,
    PageFooter
  },

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
