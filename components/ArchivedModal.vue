<i18n src="~/locales/components/ArchivedModal.yml"></i18n>
<i18n src="~/locales/global.yml"></i18n>

<style lang="scss">
#archived-modal {
  .modal-header {
    border-bottom: none;
    z-index: 2;
  }

  .modal-body {
    margin-top: -2rem;
  }
}
</style>

<template lang="pug">
  Modal(id="archived-modal" title-sr-only)
    template(v-slot:modal-title) {{ $t('title') }}
    p
      img(src="~assets/images/fftf-logo-dark.svg" :alt="$t('global.common.logo_alt')")
    p(v-html="$t('message_html')")
</template>
