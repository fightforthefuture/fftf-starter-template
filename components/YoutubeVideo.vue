<i18n src="~/locales/components/YoutubeVideo.yml"></i18n>

<style lang="scss" scoped>
.video-container {
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div class="video-container ratio ratio-16x9 rounded">
    <a v-show="!showVideo" href="#" @click.prevent="showAndPlayVideo()">
      <img :src="placeholderImage" :alt="$t('placeholder_alt')"
        class="rounded hover-scale">
    </a>

    <iframe
      v-show="showVideo"
      ref="youtube"
      :src="`https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&modestbranding=1&rel=0`"
      class="mx-auto"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; autoplay"
      frameborder="0"
      allowfullscreen>
    </iframe>
  </div>
</template>

<script>
export default {
  head() {
    return {
      script: [
        {
          src: 'https://www.youtube.com/iframe_api'
        }
      ]
    }
  },

  props: {
    youtubeId: {
      type: String,
      default: null,
      required: true
    },

    placeholderImage: {
      type: String,
      default: '/images/video-placeholder.jpg',
      required: false
    }
  },

  data() {
    return {
      showVideo: false
    }
  },

  mounted() {
    this.initPlayer()
  },

  methods: {
    initPlayer() {
      if (window.YT && window.YT.Player) {
        this.player = new window.YT.Player(this.$refs.youtube)
      } else {
        setTimeout(this.initPlayer, 500)
      }
    },

    showAndPlayVideo() {
      this.showVideo = true
      this.player.playVideo() // play video through youtube js api
      this.$trackClick('playVideo')
      this.$trackGoal('playVideo')
    }
  }
}
</script>
