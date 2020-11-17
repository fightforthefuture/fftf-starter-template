<i18n src="~/locales/global.yml"></i18n>

<template>
  <div>
    <nuxt />
    <PageFooter />

    <ArchivedModal v-if="modal === 'archived'" />
    <CallFormModal v-else-if="modal === 'call-form'" />
    <CallScriptModal v-else-if="modal === 'call-script'" />
    <SelfieFormModal v-else-if="modal === 'selfie-form'" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { createMetaTags } from '~/assets/js/helpers'
import CallFormModal from '~/components/CallFormModal'
import CallScriptModal from '~/components/CallScriptModal'
import ArchivedModal from '~/components/ArchivedModal'
import SelfieFormModal from '~/components/SelfieFormModal'
import PageFooter from '~/components/PageFooter'

export default {
  components: {
    CallFormModal,
    CallScriptModal,
    ArchivedModal,
    SelfieFormModal,
    PageFooter
  },

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
