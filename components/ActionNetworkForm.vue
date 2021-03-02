<i18n src="~/locales/components/ActionNetworkForm.yml"></i18n>
<i18n src="~/locales/global.yml"></i18n>

<template>
  <div>
    <!-- STEP 1: THE FORM -->
    <div v-if="!hasSigned">

      <noscript v-if="isJointPetition" class="alert-danger p-3 mb-3 d-block rounded text-left" v-html="$t('noscript_html', { petition_id: petitionId })"></noscript>

      <div v-if="isJointPetition"
        class="d-none"
        :id="`can-petition-area-${petitionId}`">
          <!-- The Action Network form embed will be inserted here -->
      </div>

      <form @submit.prevent="submitForm()"
            :action="isJointPetition ? '' : 'https://queue.fftf.xyz/action'"
            method="post"
            class="text-left">
        <input type="hidden" name="subject" :value="congressEmailSubject">
        <input type="hidden" name="hp_enabled" value="true">
        <input type="hidden" name="guard" value="">
        <input type="hidden" name="contact_congress" :value="contactCongress">
        <input type="hidden" name="fcc_ecfs_docket" :value="fccDocket">
        <input type="hidden" name="an_tags" :value="mothershipTags">
        <input type="hidden" name="an_petition_id" :value="petitionId">
        <input type="hidden" name="redirect_to" :value="redirectTo">

        <p v-if="errorMessage" class="alert-danger p-3 rounded">
          {{ errorMessage }}
        </p>

        <div class="form-row">
          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <label :for="getId('name')">{{ $t('form.name.label') }}</label>
              <input
                :id="getId('name')"
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
              <label :for="getId('email')">{{ $t('form.email.label') }}</label>
              <input
                :id="getId('email')"
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
              <label :for="getId('country')">{{ $t('form.country.label') }}</label>
              <select :id="getId('country')" class="form-control" v-model="country">
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
              <label :for="getId('address')">{{ $t('form.address.label') }}</label>
              <input
                :id="getId('address')"
                class="form-control"
                type="text"
                v-model.lazy.trim="address"
                name="member[street_address]"
                :placeholder="`${$t('form.address.placeholder')}${contactCongress ? '*' : ''}`"
                :required="contactCongress" />
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <label :for="getId('zip')">
                {{ $t('form.zip.label') }}
              </label>
              <input
                :id="getId('zip')"
                class="form-control"
                type="text"
                v-model.lazy.trim="zipCode"
                name="member[postcode]"
                :placeholder="$t('form.zip.placeholder')"
                required />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label :for="getId('phone')">{{ $t('form.phone.label') }}</label>
          <input
            :id="getId('phone')"
            class="form-control"
            type="tel"
            v-model.lazy.trim="phone"
            name="member[phone_number]"
            :aria-describedby="getId('phone-disclaimer')"
            :placeholder="$t('form.phone.placeholder')" />
          <small :id="getId('phone-disclaimer')" class="d-block mt-1 text-muted" v-html="$t('form.phone.disclaimer_html')"></small>
        </div>

        <div v-if="hasCompany" class="form-group">
          <label :for="getId('company')">{{ $t('form.company.label') }}</label>
          <input
            :id="getId('company')"
            class="form-control"
            v-model.lazy.trim="companyName"
            type="text"
            :placeholder="$t('form.company.placeholder')"
            name="member[company]" />
        </div>

        <div class="form-group" v-if="hasComment">
          <label :for="getId('comment')">{{ $t('form.comment.label') }}</label>
          <div class="textarea-with-btn">
            <textarea
              :id="getId('comment')"
              class="form-control"
              v-model="comment"
              ref="comment"
              :placeholder="$t('form.comment.placeholder')"
              name="action_comment"
              rows="3"
              max-rows="6"></textarea>
            <button class="btn btn-secondary" @click.prevent="clearComment()">
              {{ $t('global.common.clear') }} <custom-span class="sr-only">the comment field</custom-span>
            </button>
          </div>
        </div>

        <div v-if="isGDPRCountry" class="form-group opt-in-wrapper">
          <label :id="getId('gdpr')">{{ $t('gdpr.opt_in_label') }}</label>
          <radio-group :aria-label="getId('gdpr')" @set-radio-selection="setOptedOut" class="row">
            <radio-button :id="getId('gdpr-radio-button-yes')" class="col-md-6 mb-3">
              <span ref="optIn" class="btn btn-block btn-dark radio-label">
                {{ $t('gdpr.yes_label') }}
              </span>
            </radio-button>
            <radio-button :id="getId('gdpr-radio-button-no')" :aria-describedby="getId('gdpr-nudge')" class="col-md-6 mb-3">
              <span class="btn btn-block btn-dark radio-label">
                {{ $t('gdpr.no_label') }}
              </span>
            </radio-button>
          </radio-group>

          <div v-if="optedOut" class="mt-4 mb-5">
            <label :id="getId('gdpr-nudge')">{{ $t('gdpr.nudge') }}</label>
            <button class="btn btn-primary btn-sm" @click.prevent="$refs.optIn.click()">{{ $t('gdpr.nudge_button') }}</button>
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block btn-lg" :disabled="isSending" :aria-describedby="getId('privacy-disclaimer')">
            <span v-if="isSending">{{ $t('global.common.sending') }}</span>
            <span v-else>{{ buttonCta }}</span>
          </button>
          <small class="text-muted text-center d-block mt-1" v-if="!optedOut" :id="getId('privacy-disclaimer')">
            <span v-html="privacyDisclaimer"></span>
            <button class="btn-link" v-if="isJointPetition" @click.prevent="isEditingSubscription = !isEditingSubscription">{{ $t('edit_subscription') }}</button>
          </small>
        </div>

        <div class="form-group bg-dark p-3 rounded fade-in" v-if="isEditingSubscription && !optedOut">
          <div class="form-check mb-1">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox" v-model="optInToSponsors">
              {{ $t('sponsors_opt_in_label', { sponsor_list: sponsorList }) }}
            </label>
          </div>
          <div class="form-check" v-if="referrerGroup">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox" v-model="optInToReferrer">
              {{ $t('referrer_opt_in_label', { referrer: referrerGroup }) }}
            </label>
          </div>
        </div>
      </form>
    </div>

    <!-- STEP 2: AFTER-ACTION -->
    <div v-if="hasSigned" class="text-center mt-5">
      <h3 tabindex="-1" ref="afteraction" class="text-success">{{ $t('thanks.title') }}</h3>
      <p>{{ $t('thanks.share') }}</p>
      <div class="row">
        <div class="col-sm-12 col-lg-4 mb-2 mb-md-0">
          <ShareButton
            size="lg"
            network="twitter"
            class="btn-block"
            :text="shareTweet"
            @click.native="$trackClick(`twitter_share_button_success_${routeName}`)">
            <span>{{ $t('global.common.tweet') }}</span>
          </ShareButton>
        </div> <!-- .c -->
        <div class="col-sm-12 col-lg-4 mb-2 mb-md-0">
          <ShareButton
            size="lg"
            network="facebook"
            class="btn-block"
            @click.native="$trackClick(`facebook_share_button_sucess_${routeName}`)">
            <span>{{ $t('global.common.share') }}</span>
          </ShareButton>
        </div> <!-- .c -->
        <div class="col-sm-12 col-lg-4 mb-2 mb-md-0">
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
import RadioButton from '~/components/RadioButton'
import RadioGroup from '~/components/RadioGroup'
import ShareButton from '~/components/ShareButton'
import countries from '~/assets/data/countries'


function setValue(selector, newValue=null) {
  const elements = document ? document.querySelectorAll(selector) : []

  elements.forEach(el => {
    if (el.tagName === 'SELECT') {
      const opts = el.options

      for (let i = 0; i < opts.length; i++ ) {
        if (opts[i].value == newValue) {
          el.selectedIndex = i
          break
        }
      }
    }
    else if (el.type === 'checkbox') {
      el.checked = newValue
    }
    else {
      el.value = newValue
    }
  })
}

export default {
  components: {
    RadioButton,
    RadioGroup,
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
    },
    isJointPetition: {
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
      companyName: null,
      optedOut: null,
      referrerGroup: null,
      sponsorList: '',
      isEditingSubscription: false,
      optInToSponsors: true,
      optInToReferrer: true,
      jointPetitionMounted: false,
      uniqueId: null
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

    referrer() {
      return this.$route.query.referrer || this.$t('default_referrer')
    },

    firstName() {
      const words = (this.name || '').split(' ')
      return words.shift()
    },

    lastName() {
      const words = (this.name || '').split(' ')
      words.shift()
      return words.join(' ')
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
    },

    privacyDisclaimer() {
      if (this.isJointPetition && this.sponsorList) {
        return this.$t('joint_petition_sponsor_list_privacy_html', {
          sponsor_list: this.sponsorList
        })
      }
      else if (this.isJointPetition) {
        return this.$t('joint_petition_privacy_html')
      }
      else {
        return this.$t('privacy_html')
      }
    }
  },

  created() {
    this.comment = this.defaultComment
    this.uniqueId = Math.random(0,1000)
  },

  mounted() {
    if (this.$route.query.signed) {
      this.hasSigned = true
    }

    if (this.isJointPetition) {
      this.mountJointPetition()
    }
  },

  beforeDestroy() {
    if (this.isJointPetition) {
      this.teardownJointPetition()
    }
  },

  methods: {
    setOptedOut(value) {
      this.optedOut = value > 0
    },

    getId(field) {
      return `form-${field}-${this.uniqueId}`
    },

    mountJointPetition() {
      const script = document.createElement('script')
      script.id = 'ACTION_NETWORK_EMBED_SCRIPT'
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://actionnetwork.org/widgets/v3/petition/${this.petitionId}?format=js&source=widget&clear_id=true&referrer=${this.referrer}&js_inner=true`
      document.body.appendChild(script)

      document.addEventListener('can_embed_loaded', this.setupJointPetitionForm)
    },

    teardownJointPetition() {
      const script = document.getElementById('ACTION_NETWORK_EMBED_SCRIPT')

      if (script) {
        script.parentNode.removeChild(script)
      }

      document.removeEventListener('can_embed_loaded', this.setupJointPetitionForm)
      document.removeEventListener('can_embed_submitted', this.handleJointPetitionFormSuccess)
    },

    setupJointPetitionForm() {
      // Log referrer for debugging
      const labels = document.querySelectorAll('#d_sharing label')
      if (labels.length > 1) {
        this.referrerGroup = labels[1].innerText.replace(/Opt in to email updates from/, '').trim()
        if (typeof console !== 'undefined') console.log(`Referring group: ${this.referrerGroup}`)
      }

      // add sponsor list to our form
      this.sponsorList = this.extractSponsorList()
    },

    extractSponsorList() {
      let sponsorList = ''
      const sponsorLinks = document.querySelectorAll('.action_info_user:last-child a')

      sponsorLinks.forEach((a, i) => {
        sponsorList += a.innerText

        if (i < sponsorLinks.length - 2) {
          sponsorList += ', '
        }
        else if (i === sponsorLinks.length - 2) {
          sponsorList += `, ${this.$t('global.common.and')} `
        }
      })

      return sponsorList
    },

    async submitForm() {
      if (this.isSending) return

      this.isSending = true

      if (this.isJointPetition) {
        if (!this.jointPetitionMounted) {
          document.addEventListener('can_embed_submitted', this.handleJointPetitionFormSuccess)
          this.jointPetitionMounted = true
        }
        this.submitJointPetitionForm()
      }
      else {
        this.submitToMothership()
      }
    },

    submitJointPetitionForm() {
      // set input vals
      setValue('#form-first_name', this.firstName)
      setValue('#form-last_name', this.lastName)
      setValue('#form-email', this.email)
      setValue('#form-street', this.address)
      setValue('#form-zip_code', this.zipCode)
      setValue('#form-comments', this.comment)

      // set country val
      setValue('#form-country', this.country)

      // hard opt-out from GDPR form. uncheck all lists
      if (this.optedOut) {
        setValue('input[name="subscription[group]"]', false)
        setValue('input[name="subscription[group_referrer]"]', false)
      }
      // otherwise, use subscription settings
      else {
        // full sponsor list
        setValue('input[name="subscription[group]"]', this.optInToSponsors)

        // referrer group (if present)
        setValue('input[name="subscription[group_referrer]"]', this.optInToReferrer)
      }

      document.querySelector('#new_signature input[name="commit"]').click()
    },

    async handleJointPetitionFormSuccess() {
      this.$trackEvent(`joint_petition_form_${this.routeName}`, 'submit')
      this.$trackEvent(`joint_petition_form_${this.routeName}_${this.referrerGroup}`, 'submit')

      if (this.contactCongress) {
        this.submitToMothership()
      }
      else {
        this.$trackGoal('signPetition')
        this.showAfterAction()
      }
    },

    async submitToMothership() {
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
          skip_action_network: this.isJointPetition ? true : null,
          action_comment: this.hasComment ? this.comment : ''
        })

        this.$trackEvent(`petition_form_${this.routeName}`, 'submit')
        this.$trackGoal('signPetition')
        this.showAfterAction()
      }
      catch (err) {
        this.errorMessage = this.$t('global.common.error')
      }
    },

    showAfterAction() {
      if (this.callpowerId) {
        this.$store.commit('setCallpowerId', this.callpowerId)
        this.$store.commit('setCallpowerScript', this.callpowerScript)
        this.$store.commit('showModal', 'call-form')
      }

      this.isSending = false
      this.hasSigned = true

      setTimeout( () => {
        this.$refs.afteraction.focus()
      }, 300)
    },

    clearComment() {
      this.comment = ''
      this.$refs.comment.focus()
    }
  }
}
</script>
