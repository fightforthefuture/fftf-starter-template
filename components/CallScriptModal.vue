<i18n src="~/locales/global.yml"></i18n>
<i18n src="~/locales/components/CallScriptModal.yml"></i18n>

<style lang="scss" scoped>
.icon-call {
  max-height: 2rem;
}
</style>

<template lang="pug">
  b-modal#call-script-modal(:visible="true" centered modal-class="text-center" hide-footer)
    template(v-slot:modal-title)
      img.icon-call(src="~/assets/images/call-icon.svg" alt="📞")
      |  {{ $t('calling_now') }}
    p
      b {{ $t('script_intro') }}
    p
      code {{ $t('global.callpower.script') }}
    p.text-warning
      small {{ $t('if_busy') }}
    hr
    h5 {{ $t('done_calling') }}
    SocialShareButtons
</template>

<script>
import SocialShareButtons from '~/components/SocialShareButtons'

export default {
  components: {
    SocialShareButtons
  }
}
</script>
