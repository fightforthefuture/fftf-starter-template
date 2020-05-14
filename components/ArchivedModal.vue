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
  b-modal#archived-modal(:visible="true" centered modal-class="text-center" hide-footer)
    p
      img(src="~assets/images/fftf-logo-dark.svg" :alt="$t('global.common.logo_alt')")
    p(v-html="$t('message_html')")
</template>
