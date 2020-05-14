<template lang="pug">
  .text-center
    .row
      .col
        ShareButton(
          network="Twitter"
          :url="url"
          :text="tweetText"
          :should-display-icon="false"
          class="btn-block"
          size="sm"
          @click.native="$trackClick(`twitter_share_button_${routeName}`)"
        )
      .col
        ShareButton(
          network="Facebook"
          :url="url"
          :should-display-icon="false"
          class="btn-block"
          size="sm"
          @click.native="$trackClick(`facebook_share_button_${routeName}`)"
        )
</template>

<script>
import ShareButton from '~/components/ShareButton'

export default {
  components: {
    ShareButton
  },

  props: {
    url: {
      type: String,
      required: false,
      default: null
    },
    tweetText: {
      type: String,
      required: false,
      default: null
    }
  },

  computed: {
    routeName() { return this.$nuxt.$route.name }
  }
}
</script>
