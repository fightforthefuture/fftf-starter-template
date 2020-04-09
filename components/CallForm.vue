<i18n src="~/locales/components/CallForm.yml"></i18n>

<template lang="pug">
  form(@submit.prevent="submitForm()")
    p.text-danger(v-if="errorMessage") {{ errorMessage }}
    .row.text-left
      .col-sm-6
        .form-groups
          label.mb-0(for="call-form-phone") {{ $t('phone_label') }}
          input.form-control#call-form-phone(
            v-model.trim.lazy="phone"
            type="tel"
            :placeholder="$t('phone_placeholder')"
          )
      .col-sm-6
        .form-group
          label.mb-0(for="call-form-zip") {{ $t('zip_label') }}
          input.form-control#call-form-zip(
            v-model.trim.lazy="zipCode"
            type="tel"
            :placeholder="$t('zip_placeholder')"
          )
    button.btn.btn-primary.btn-block(:disabled="isSending")
      span(v-if="isSending") {{ $t('sending') }}
      span(v-else) {{ $t('call') }}
    small.d-block.mt-1.text-muted(v-html="$t('privacy_html')")
</template>


<script>
import { postFormData } from '~/assets/js/helpers'

export default {
  data() {
    return {
      isSending: false,
      errorMessage: null
    }
  },

  computed: {
    phone: {
      get() {
        return this.$store.state.phone
      },
      set(value) {
        this.$store.commit('setPhone', value)
      }
    },

    zipCode: {
      get() {
        return this.$store.state.zipCode
      },
      set(value) {
        this.$store.commit('setZipCode', value)
      }
    }
  },

  methods: {
    async submitForm() {
      this.isSending = true

      try {
        const { data } = await postFormData(
          'https://call-congress.fightforthefuture.org/create', {
            campaignId: this.$store.state.callpowerCampaignId,
            userPhone: this.phone,
            userLocation: this.zipCode
          }
        )

        this.$trackEvent(`call_form_${this.$nuxt.$route.name}`, 'submit')
      }
      catch (err) {
        this.errorMessage = this.$t('error')
      }

      this.isSending = false
      this.$store.commit('showModal', 'call-script')
    }
  }
}
</script>
