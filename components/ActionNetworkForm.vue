<i18n src="~/locales/components/ActionNetworkForm.yml"></i18n>
<i18n src="~/locales/global.yml"></i18n>
<template>
  <div>
    <div class="text-center"  v-if="hasSigned">
      <h2 class="text-success">{{ $t('thanks.title') }}</h2>
      <p>{{ $t('thanks.share') }}</p>
      <b-container>
        <b-row>
          <b-col sm="12" lg="4">
            <ShareButton
              size="lg"
              network="twitter"
              class="btn-block"
              :text="tweetText"
              @click.native="$trackClick(`twitter_share_button_success_${routeName}`)">
              <span>{{ $t('global.common.tweet') }}</span>
            </ShareButton>
          </b-col> <!-- .c -->
          <b-col sm="12" lg="4">
            <ShareButton
              size="lg"
              network="facebook"
              class="btn-block"
              @click.native="$trackClick(`facebook_share_button_sucess_${routeName}`)">
              <span>{{ $t('global.common.share') }}</span>
            </ShareButton>
          </b-col> <!-- .c -->
          <b-col sm="12" lg="4">
            <b-button :href="$t('global.donation_url')"
               class="btn btn-block btn-primary"
               size="lg"
               @click="$trackClick(`donate_button_success_${routeName}`)">
              <span>{{ $t('global.common.donate') }}</span>
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-form v-if="!hasSigned"
          @submit.prevent="submitForm()"
          action="https://queue.fftf.xyz/action"
          method="post">
      <input type="hidden" name="subject" :value="subject">
      <input type="hidden" name="hp_enabled" value="true">
      <input type="hidden" name="guard" value="">
      <input type="hidden" name="contact_congress" :value="shouldContactCongress">
      <input type="hidden" name="fcc_ecfs_docket" :value="fccDocket">
      <input type="hidden" name="an_tags" :value="mothershipTags">
      <input type="hidden" name="an_petition_id" :value="anPetitionId">
      <input type="hidden" name="redirect_to" :value="$t('redirect_url')">

      <p v-if="errorMessage" class="alert-danger">
        {{ errorMessage }}
      </p>
      <b-container>
        <b-form-row>
          <b-col sm="12" md="6">
            <b-form-group
              :label="$t('form.name.label')"
              label-for="member[first_name]">
              <b-form-input
                type="text"
                v-model.lazy="name"
                name="member[first_name]"
                :placeholder="$t('form.name.placeholder')"
                required />
            </b-form-group>
          </b-col>
          <b-col sm="12" md="6">
            <b-form-group
              :label="$t('form.email.label')"
              label-for="member[email]">

              <b-form-input
                type="email"
                v-model.lazy="email"
                name="member[email]"
                :placeholder="$t('form.email.placeholder')"
                required />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row v-if="isInternational">
          <b-col>
            <b-form-group
              :label="$t('form.country.label')"
              label-for="member[country]">
              <b-form-select v-model="country">
                <b-form-select-option v-for="(text, value) in countries"
                  :value="value"
                  :key="`country-select-${value}`">{{ text }}</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col sm="12" md="6">
            <b-form-group
              :label="$t('form.address.label')"
              label-for="member[street_address]">
              <b-form-input
                type="text"
                v-model.lazy="address"
                name="member[street_address]"
                :placeholder="`${$t('form.address.placeholder')}${shouldContactCongress === 1 ? '*' : ''}`"
                :required="contactCongress === 1" />
            </b-form-group>
          </b-col>
          <b-col sm="12" md="6">
            <b-form-group
              :label="$t('form.zip.label') + (isUnitedStates ? '*' : '')"
              label-for="member[postcode]">

              <b-form-input
                type="text"
                v-model.lazy="zipCode"
                name="member[postcode]"
                :placeholder="$t('form.zip.placeholder')"
                :required="isUnitedStates" />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-group
          :label="$t('form.phone.label')"
          label-for="member[phone_number]">
          <b-form-input
            type="tel"
            v-model.lazy="phone"
            name="member[phone_number]"
            :placeholder="$t('form.phone.placeholder')"
            :required="contactCongress === 1" />
            <small class="text-muted" v-html="$t('form.phone.disclaimer_html')"></small>
        </b-form-group>

        <div v-if="hasCompany">
          <b-form-group v-if="hasCompanyToggle"
            :label="$t('form.is_an_org')"
            label-for="isBusinessOwner"
            label-cols-lg="9"
            label-cols-md="9"
            label-cols-sm="auto">
            <b-form-radio-group
              v-model="isBusinessOwner"
              :options="$t('form.business_owner_options')"
              buttons
              button-variant="primary"
              size="lg"
              class="btn-block"
              name="isBusinessOwner"
            ></b-form-radio-group>
          </b-form-group>
          <b-form-group>
            <b-form-input v-if="isBusinessOwner || !hasCompanyToggle"
              v-model.lazy="companyName"
              type="text"
              :placeholder="`${$t('form.company')}${hasCompanyToggle ? '*': ''}`"
              :required="hasCompanyToggle"
              name="member[company]" />
          </b-form-group>
        </div>

        <b-form-group class="textarea-with-btn" v-if="hasComment || shouldContactCongress">
          <b-form-textarea
            v-model="comment"
            ref="comment"
            :placeholder="$t('form.comment')"
            name="action_comment"
            rows="3"
            max-rows="6"
            required></b-form-textarea>
            <b-button @click.prevent="clearComment()">
              {{ $t('global.common.clear') }}
            </b-button>
        </b-form-group>

        <b-form-group v-if="isGDPRCountry" class="opt-in-wrapper">
          <p>{{ $t('gdpr.opt_in_label') }}</p>
          <b-form-radio-group
              v-model="optedOut"
              :options="$t('gdpr.opt_out_options')"
              stacked
              name="optedOut"
            ></b-form-radio-group>
        </b-form-group>
        <b-form-group v-if="optedOut" class="opt-in-pitch">
          <p>{{ $t('gdpr.nudge') }}</p>
          <b-button size="sm" variant="primary" @click.prevent="optedOut = false" >{{ $t('gdpr.nudge_button') }}</b-button>
        </b-form-group>

        <b-form-group class="text-center">
          <button class="btn btn-primary btn-block btn-lg" :disabled="isSending">
            <span v-if="isSending">{{ $t('global.common.sending') }}</span>
            <span v-else>{{ buttonText }}</span>
          </button>
          <small class="text-muted" v-html="$t('privacy_html')"></small>
        </b-form-group>

      </b-container>
    </b-form>
  </div>
</template>

<script>
import { sendToMothership } from '~/assets/js/helpers'
import ShareButton from '~/components/ShareButton'
import countries from '~/assets/data/countries'

export default {
  components: {
    ShareButton
  },

  props: {
    anPetitionId: {
      type: String,
      required: false,
      default: function () {
        return this.$te('global.action_network.petition_id') ? this.$t('global.action_network.petition_id') : ''
      }
    },
    subject: {
      type: String,
      required: false,
      default: function () {
        return this.$t('global.congress.email_subject')
      }
    },
    contactCongress: {
      type: String,
      required: false,
      default: function () {
        return this.$t('global.congress.enabled')
      }
    },
    fccDocket: {
      required: false,
      default: function () {
        return this.$te('global.fcc.docket_number') ? this.$t('global.fcc.docket_number') : ''
      }
    },
    callpowerId: {
      required: false,
      default: function () {
        return this.$te('global.callpower.campaign_id') ? this.$t('global.callpower.campaign_id') : ''
      }
    },
    tags: {
      type: Object,
      required: false,
      default: function () {
        return this.$t('global.action_network.tags')
      }
    },
    buttonText: {
      type: String,
      required: false,
      default: function () {
        return this.$t('form.button_cta')
      }
    },
    hasComment: {
      type: Boolean,
      required: false,
      default: false
    },
    hasCompany: {
      type: Boolean,
      required: false,
      default: false
    },
    hasCompanyToggle: {
      type: Boolean,
      required: false,
      default: false
    },
    tweetText: {
      type: String,
      required: false,
      default: null
    },
    letterText: {
      type: String,
      required: false,
      default: function () {
        return this.$t('global.letter_text')
      }
    },
    isInternational: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      isSending: false,
      hasSigned: false,
      errorMessage: null,
      comment: null,
      isBusinessOwner: false,
      companyName: null,
      optedOut: null
    }
  },

  computed: {
    routeName() { return this.$nuxt.$route.name },

    name: {
      get() {
        return this.$store.state.name
      },
      set(value) {
        this.$store.commit('setName', value)
      }
    },

    email: {
      get() {
        return this.$store.state.email
      },
      set(value) {
        this.$store.commit('setEmail', value)
      }
    },

    address: {
      get() {
        return this.$store.state.address
      },
      set(value) {
        this.$store.commit('setAddress', value)
      }
    },

    zipCode: {
      get() {
        return this.$store.state.zipCode
      },
      set(value) {
        this.$store.commit('setZipCode', value)
      }
    },

    phone: {
      get() {
        return this.$store.state.phone
      },
      set(value) {
        this.$store.commit('setPhone', value)
      }
    },

    country: {
      get() {
        return this.$store.state.country
      },
      set(value) {
        this.$store.commit('setCountry', value)
      }
    },

    shouldContactCongress() {
      return this.$t('global.congress.enabled').toLowerCase() === 'yes'
    },

    mothershipTags() {
      return JSON.stringify(Object.values(this.tags))
    },

    countries() {
      return countries
    },

    isGDPRCountry() {
      return [
        "AT",
        "BE",
        "BG",
        "HR",
        "CY",
        "CZ",
        "DK",
        "EE",
        "FI",
        "FR",
        "DE",
        "GR",
        "HU",
        "IE",
        "IT",
        "LV",
        "LT",
        "LU",
        "MT",
        "NL",
        "PL",
        "PT",
        "RO",
        "SK",
        "SI",
        "ES",
        "SE",
        "GB"
      ].includes(this.country)
    },

    isUnitedStates() {
      return this.country === 'US'
    }
  },

  created() {
    this.comment = this.letterText
  },

  methods: {
    async submitForm() {
      if (this.isSending) return

      this.isSending = true

      try {
        const response = await sendToMothership({
          subject: this.subject,
          member: {
            first_name: this.name,
            email: this.email,
            phone_number: this.phone,
            street_address: this.address,
            postcode: this.zipCode,
            country: this.country,
            company: this.companyName
          },
          hp_enabled: 'true',
          guard: '',
          contact_congress: this.shouldContactCongress,
          fcc_ecfs_docket: this.fccDocket,
          an_tags: this.mothershipTags,
          an_petition_id: this.anPetitionId,
          action_comment: this.hasComment ? this.comment : ''
        })

        this.$trackEvent(`petition_form_${this.routeName}`, 'submit')
        this.hasSigned = true

      }
      catch (err) {
        this.errorMessage = this.$t('global.common.error')
      }

      this.isSending = false

      if (this.callpowerId) {
        this.$store.commit('showModal', 'call-form')
      }
    },

    clearComment() {
      this.comment = ''
      this.$refs.comment.focus()
    }
  }
}
</script>
