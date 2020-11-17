<i18n src="~/locales/global.yml"></i18n>

<style lang="scss">
#selfie-modal___BV_modal_header_ {
  border-bottom: none;
}

#selfie-modal .modal-dialog {
  width: 800px;
  max-width: 96%;
}
</style>

<template lang="pug">
  b-modal#selfie-modal(:visible="true" centered modal-class="text-center" hide-footer).bg-primary
    SelfieForm
</template>

<script>
import SelfieForm from '~/components/SelfieForm'

export default {
  components: {
    SelfieForm
  }
}
</script>
