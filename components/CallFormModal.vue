<i18n src="~/locales/components/CallFormModal.yml"></i18n>
<style lang="scss">
#call-form-modal h1 {
  @include font-size($h5-font-size);
  margin: 0;
  padding: 0;
}
</style>
<template lang="pug">
Modal(id="call-form-modal")
  template(v-slot:modal-title)
    span.text-success {{ $t('thanks') }}
    |  {{ $t('please_call') }}
  p {{ $t('instructions') }}
  CallForm
</template>

<script>
import CallForm from '~/components/CallForm'
import Modal from '~/components/Modal'

export default {
  components: {
    CallForm,
    Modal
  }
}
</script>
