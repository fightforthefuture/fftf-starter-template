<i18n src="~/locales/cms.yml"></i18n>

<template>
  <a :href="shareURL" target="_blank"
     :class="`btn btn-${size} ${isButton ? `btn-${networkName}` : 'link'}`"
     @click.prevent="share()">
    <slot>
      <img v-if="networkName === 'twitter' && shouldDisplayIcon"
           src="~/assets/images/twitter-logo.svg"
           alt="Twitter logo">
      <img v-if="networkName === 'facebook' && shouldDisplayIcon"
           src="~/assets/images/facebook-logo.svg"
           alt="Facebook logo">
      <span v-if="shouldDisplayText">
        {{ network }}
      </span>
    </slot>
  </a>
</template>

<script>
import { openPopup } from '~/assets/js/helpers'

export default {
  props: {
    text: {
      type: String,
      required: false,
      default: null
    },
    url: {
      type: String,
      required: false,
      default: null
    },
    network: {
      type: String,
      required: true,
      default: null
    },
    isButton: {
      type: Boolean,
      required: false,
      default: true
    },
    shouldDisplayText: {
      type: Boolean,
      required: false,
      default: true
    },
    shouldDisplayIcon: {
      type: Boolean,
      required: false,
      default: true
    },
    size: {
      type: String,
      required: false,
      default: 'sm'
    }
  },

  computed: {
    networkName() {
      return this.network.toLowerCase()
    },
    shareURL() {
      const network = this.networkName
      let url = this.url || `${this.$t('cms.site_url')}${this.$nuxt.$route.path}`
      const text = this.text || this.$t('cms.default_tweet_text')

      if (network === 'facebook' && !url.match(/facebook\.com\/sharer/)) {
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      } else if (network === 'twitter' && !url.match(/twitter\.com\/intent\/tweet/)) {
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.trim())}&url=${encodeURIComponent(url)}`
      }
      return url
    }
  },

  methods: {
    share() {
      if (this.network=='email') {
        location.href = this.url
      } else {
        openPopup(this.shareURL, 'share')
      }
    }
  }
}
</script>
