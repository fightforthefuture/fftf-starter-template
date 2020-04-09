<i18n src="~/locales/components/CallFormModal.yml"></i18n>

<template lang="pug">
b-modal#call-form-modal(:visible="true" centered modal-class="text-center" hide-footer)
  template(v-slot:modal-title)
    span.text-success {{ $t('thanks') }}
    |  {{ $t('please_call') }}
  p {{ $t('instructions') }}
  CallForm
</template>

<script>
import CallForm from '~/components/CallForm'

export default {
  components: {
    CallForm
  }
}
</script>
