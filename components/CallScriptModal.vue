<i18n src="~/locales/global.yml"></i18n>
<i18n src="~/locales/components/CallScriptModal.yml"></i18n>

<style lang="scss">
#call-script-modal {
  h1 {
    @include font-size($h5-font-size);
    margin: 0;
    padding: 0;
  }

  h2 {
    @include font-size($h5-font-size);
  }
  .icon-call {
    max-height: 2rem;
  }
}
</style>

<template lang="pug">
  Modal(id="call-script-modal")
    template(v-slot:modal-title)
      img.icon-call(src="~/assets/images/call-icon.svg" alt="" aria-hidden="true")
      |  {{ $t('calling_now') }}
    p
      b {{ $t('script_intro') }}
    p
      code {{ callpowerScript }}
    p.text-warning
      small(v-html="$t('if_busy')")
    hr(aria-hidden="true")
    h2 {{ $t('done_calling') }}
    SocialShareButtons
</template>

<script>
import { mapState } from 'vuex'
import Modal from '~/components/Modal'
import SocialShareButtons from '~/components/SocialShareButtons'

export default {
  components: {
    Modal,
    SocialShareButtons
  },

  computed: {
    ...mapState(['callpowerScript'])
  }
}
</script>
