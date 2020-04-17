<i18n src="~/locales/components/ActionNetworkForm.yml"></i18n>
<i18n src="~/locales/global.yml"></i18n>

<template>
  <div>
    <!-- STEP 1: THE FORM -->
    <div v-if="!hasSigned">

      <div v-if="petitionUrl"
        style="display:none"
        :id="`can-petition-area-${petitionUrl}`">
          <!-- The Action Network form embed will be inserted here -->
      </div>

      <form @submit.prevent="submitForm()" class="text-left">
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

        <div class="form-row">
          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <label>{{ $t('form.address.label') }}{{ contactCongress ? '*' : '' }}</label>
              <input
                class="form-control"
                type="text"
                v-model.lazy.trim="address"
                name="member[street_address]"
                :placeholder="$t('form.address.placeholder')"
                :required="contactCongress === 1" />
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-group">
              <label>{{ $t('form.zip.label') }}*</label>
              <input
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
              max-rows="6"
              ></textarea>
            <a class="btn btn-secondary" href="#" @click.prevent="clearComment()">
              {{ $t('global.common.clear') }}
            </a>
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block btn-lg" :disabled="isSending">
            <span v-if="isSending">{{ $t('global.common.sending') }}</span>
            <span v-else>{{ buttonCta }}</span>
          </button>
          <small class="text-muted d-block mt-1" v-html="$t('join_petition_disclaimer_html')"></small>
        </div>
      </form>
    </div> <!-- /!hasSigned -->

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

function setValue(inputId, newValue) {
  const input = document ? document.getElementById(inputId) : null

  if (input) {
    input.value = newValue
  }
}

export default {
  components: {
    ShareButton
  },

  props: {
    petitionUrl: {
      type: String,
      required: true
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
    }
  },

  data() {
    return {
      isSending: false,
      hasSigned: false,
      errorMessage: null,
      comment: null,
      companyName: null,
      referrerGroup: null
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

    referrer() {
      return this.$route.query.referrer
    },

    firstName() {
      const words = (this.name || '').split(' ')
      return words.shift()
    },

    lastName() {
      const words = (this.name || '').split(' ')
      words.shift()
      return words.join(' ')
    }
  },

  watch: {
    name(newValue) {
      setValue('form-first_name', this.firstName)
      setValue('form-last_name', this.lastName)
    },

    email(newValue) {
      setValue('form-email', newValue)
    },

    address(newValue) {
      setValue('form-street', newValue)
    },

    zipCode(newValue) {
      setValue('form-zip_code', newValue)
    },

    comment(newValue) {
      setValue('form-comments', newValue)
    }
  },

  created() {
    this.comment = this.defaultComment
  },

  mounted() {
    if (this.$route.query.signed) {
      this.hasSigned = true
      return
    }

    const script = document.createElement('script')
    script.id = 'ACTION_NETWORK_EMBED_SCRIPT'
    script.type = 'text/javascript'
    script.async = true
    script.src = `https://actionnetwork.org/widgets/v3/petition/${this.petitionUrl}?format=js&source=widget&clear_id=true&referrer=${this.referrer}`
    document.body.appendChild(script)

    document.addEventListener('can_embed_loaded', this.setupForm)
    document.addEventListener('can_embed_submitted', this.handleFormSuccess)
  },

  destroyed() {
    const script = document.getElementById('ACTION_NETWORK_EMBED_SCRIPT')

    if (script) {
      script.parentNode.removeChild(script)
    }

    document.removeEventListener('can_embed_loaded', this.setupForm)
    document.removeEventListener('can_embed_submitted', this.handleFormSuccess)
  },

  methods: {
    submitForm() {
      if (!this.isSending) {
        this.isSending = true
        document.querySelector('#new_signature input[name="commit"]').click()
      }
    },

    setupForm() {
      // fill in AN form
      setValue('form-first_name', this.firstName)
      setValue('form-last_name', this.lastName)
      setValue('form-street', this.address)
      setValue('form-zip_code', this.zipCode)
      setValue('form-comments', this.comment)

      // Log referrer for debugging
      const labels = document.querySelectorAll('#d_sharing label')
      if (labels.length > 1) {
        this.referrerGroup = labels[1].innerText.replace(/Opt in to updates from/, '').trim()
        if (typeof console !== 'undefined') console.log(`Referring group: ${this.referrerGroup}`)
      }
    },

    async handleFormSuccess() {
      this.$trackEvent(`joint_petition_form_${this.routeName}`, 'submit')
      this.$trackEvent(`joint_petition_form_${this.routeName}_${this.referrerGroup}`, 'submit')

      if (this.contactCongress) {
        try {
          await sendToMothership({ // eslint-disable-line no-unused-vars
            subject: this.subject,
            member: {
              first_name: this.name,
              email: this.email,
              phone_number: this.phone,
              street_address: this.address,
              postcode: this.zipCode,
              country: 'US'
            },
            hp_enabled: 'true',
            guard: '',
            contact_congress: true,
            skip_action_network: true,
            action_comment: this.comment
          })
        } catch (error) {
          console.error(error)
        }
      }

      if (this.callpowerId) {
        this.$store.commit('setCallpowerId', this.callpowerId)
        this.$store.commit('setCallpowerScript', this.callpowerScript)
        this.$store.commit('showModal', 'call-form')
      }

      this.isSending = false
      this.hasSigned = true
    },

    clearComment() {
      this.comment = ''
      this.$refs.comment.focus()
    }
  }
}
</script>
