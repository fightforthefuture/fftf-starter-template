<i18n src="~/locales/components/ActionNetworkForm.yml"></i18n>
<i18n src="~/locales/global.yml"></i18n>

<template>
  <div>
    <!-- STEP 1: THE FORM -->
    <form v-if="!hasSigned"
          @submit.prevent="submitForm()"
          action="https://queue.fftf.xyz/action"
          method="post"
          class="text-left"
    >
      <input type="hidden" name="subject" :value="congressEmailSubject">
      <input type="hidden" name="hp_enabled" value="true">
      <input type="hidden" name="guard" value="">
      <input type="hidden" name="contact_congress" :value="contactCongress">
      <input type="hidden" name="fcc_ecfs_docket" :value="fccDocket">
      <input type="hidden" name="an_tags" :value="mothershipTags">
      <input type="hidden" name="an_petition_id" :value="petitionId">
      <input type="hidden" name="redirect_to" :value="redirectTo">

      <p v-if="errorMessage" class="alert-danger">
        {{ errorMessage }}
      </p>

      <div class="form-row">
        <div class="col-sm-12 col-md-6">
          <div class="form-group">
            <label>{{ $t('form.name.label') }}</label>
            <input
              class="form-control"
              type="text"
              v-model.lazy.trim="name"
              name="member[first_name]"
              :placeholder="$t('form.name.placeholder')"
              required />
          </div>
        </div>
        <div class="col-sm-12 col-md-6">
          <div class="form-group">
            <label>{{ $t('form.email.label') }}</label>
            <input
              class="form-control"
              type="email"
              v-model.lazy.trim="email"
              name="member[email]"
              :placeholder="$t('form.email.placeholder')"
              required />
          </div>
        </div>
      </div>

      <div class="form-row" v-if="isInternational">
        <div class="col">
          <div class="form-group">
            <label>{{ $t('form.country.label') }}</label>
            <select class="form-control" v-model="country">
              <option v-for="(text, value) in countries"
                :value="value"
                :key="`country-select-${value}`">{{ text }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="col-sm-12 col-md-6">
          <div class="form-group">
            <label>{{ $t('form.address.label') }}</label>
            <input
              class="form-control"
              type="text"
              v-model.lazy.trim="address"
              name="member[street_address]"
              :placeholder="`${$t('form.address.placeholder')}${contactCongress ? '*' : ''}`"
              :required="contactCongress === 1" />
          </div>
        </div>
        <div class="col-sm-12 col-md-6">
          <div class="form-group">
            <label>
              {{ $t('form.zip.label') }}
            </label>
            <input
              class="form-control"
              type="text"
              v-model.lazy.trim="zipCode"
              name="member[postcode]"
              :placeholder="$t('form.zip.placeholder')"
              :required="isUnitedStates" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>{{ $t('form.phone.label') }}</label>
        <input
          class="form-control"
          type="tel"
          v-model.lazy.trim="phone"
          name="member[phone_number]"
          :placeholder="$t('form.phone.placeholder')"
          :required="contactCongress === 1" />
        <small class="d-block mt-1 text-muted" v-html="$t('form.phone.disclaimer_html')"></small>
      </div>

      <div v-if="hasCompany" class="form-group">
        <label>{{ $t('form.company.label') }}</label>
        <input
          class="form-control"
          v-model.lazy.trim="companyName"
          type="text"
          :placeholder="$t('form.company.placeholder')"
          name="member[company]" />
      </div>

      <div class="form-group" v-if="hasComment">
        <label>{{ $t('form.comment.label') }}</label>
        <div class="textarea-with-btn">
          <textarea
            class="form-control"
            v-model="comment"
            ref="comment"
            :placeholder="$t('form.comment.placeholder')"
            name="action_comment"
            rows="3"
            max-rows="6"></textarea>
          <a class="btn btn-secondary" href="#" @click.prevent="clearComment()">
            {{ $t('global.common.clear') }}
          </a>
        </div>
      </div>

      <div v-if="isGDPRCountry" class="form-group opt-in-wrapper">
        <label>{{ $t('gdpr.opt_in_label') }}</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="opt_out" :value="false" v-model="optedOut" required id="gdpr_yes">
          <label class="form-check-label" for="gdpr_yes">
            {{ $t('gdpr.yes_label') }}
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="opt_out" :value="true" v-model="optedOut" required id="gdpr_no">
          <label class="form-check-label" for="gdpr_no">
            {{ $t('gdpr.no_label') }}
          </label>
        </div>

        <div v-if="optedOut" class="mt-4 mb-5">
          <label>{{ $t('gdpr.nudge') }}</label>
          <a class="btn btn-primary btn-sm" @click.prevent="optedOut = false">{{ $t('gdpr.nudge_button') }}</a>
        </div>
      </div>

      <div class="form-group">
        <button class="btn btn-primary btn-block btn-lg" :disabled="isSending">
          <span v-if="isSending">{{ $t('global.common.sending') }}</span>
          <span v-else>{{ buttonCta }}</span>
        </button>
        <small class="text-muted text-center d-block mt-1" v-html="$t('privacy_html')"></small>
      </div>
    </form>

    <!-- STEP 2: AFTER-ACTION -->
    <div v-if="hasSigned" class="text-center mt-5">
      <h2 class="text-success">{{ $t('thanks.title') }}</h2>
      <p>{{ $t('thanks.share') }}</p>
      <div class="row">
        <div class="col-sm-12 col-lg-4">
          <ShareButton
            size="lg"
            network="twitter"
            class="btn-block"
            :text="shareTweet"
            @click.native="$trackClick(`twitter_share_button_success_${routeName}`)">
            <span>{{ $t('global.common.tweet') }}</span>
          </ShareButton>
        </div> <!-- .c -->
        <div class="col-sm-12 col-lg-4">
          <ShareButton
            size="lg"
            network="facebook"
            class="btn-block"
            @click.native="$trackClick(`facebook_share_button_sucess_${routeName}`)">
            <span>{{ $t('global.common.share') }}</span>
          </ShareButton>
        </div> <!-- .c -->
        <div class="col-sm-12 col-lg-4">
          <a :href="$t('global.donation_url')"
             class="btn btn-block btn-primary btn-lg"
             @click="$trackClick(`donate_button_success_${routeName}`)">
            <span>{{ $t('global.common.donate') }}</span>
          </a>
        </div>
      </div>
    </div>
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
    petitionId: {
      type: String,
      required: true
    },
    tags: {
      type: String,
      required: false
    },
    contactCongress: {
      type: Boolean,
      required: false,
      default: false
    },
    congressEmailSubject: {
      type: String,
      required: false,
      default: function () {
        return this.$t('global.site_title')
      }
    },
    fccDocket: {
      type: String,
      required: false
    },
    callpowerId: {
      type: String,
      required: false
    },
    callpowerScript: {
      type: String,
      required: false
    },
    hasComment: {
      type: Boolean,
      required: false,
      default: false
    },
    defaultComment: {
      type: String,
      required: false
    },
    hasCompany: {
      type: Boolean,
      required: false,
      default: false
    },
    isInternational: {
      type: Boolean,
      required: false,
      default: true
    },
    shareTweet: {
      type: String,
      required: false
    },
    buttonCta: {
      type: String,
      required: false,
      default: function () {
        return this.$t('form.button_cta')
      }
    },
    redirectTo: {
      type: String,
      required: false,
      default: function() {
        return `${this.$t('global.site_url')}?signed=true`
      }
    }
  },

  data() {
    return {
      isSending: false,
      hasSigned: false,
      errorMessage: null,
      comment: null,
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

    mothershipTags() {
      let tagsArray = this.tags || []

      if (typeof tagsArray === 'string') {
        tagsArray = this.tags.split(',').map(s => s.trim())
      }

      return JSON.stringify(Object.values(tagsArray))
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
    this.comment = this.defaultComment
  },

  mounted() {
    if (this.$route.query.signed) {
      this.hasSigned = true
    }
  },

  methods: {
    async submitForm() {
      if (this.isSending) return

      this.isSending = true

      try {
        const response = await sendToMothership({
          subject: this.congressEmailSubject,
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
          contact_congress: this.contactCongress,
          fcc_ecfs_docket: this.fccDocket,
          an_tags: this.mothershipTags,
          an_petition_id: this.petitionId,
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
        this.$store.commit('setCallpowerId', this.callpowerId)
        this.$store.commit('setCallpowerScript', this.callpowerScript)
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
