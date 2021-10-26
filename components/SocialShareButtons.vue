<template lang="pug">
  .text-center
    .row
      .col.d-grid
        ShareButton(
          network="Twitter"
          :url="url"
          :text="tweetText"
          :should-display-icon="false"
          size="sm"
          @click.native="$trackClick(`twitter_share_button_${routeName}`)"
        )
      .col.d-grid
        ShareButton(
          network="Facebook"
          :url="url"
          :should-display-icon="false"
          size="sm"
          @click.native="$trackClick(`facebook_share_button_${routeName}`)"
        )
</template>

<script>

export default {
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
