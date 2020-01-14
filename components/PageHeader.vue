<template>
  <header>
    <VideoHeader v-if="video" />
    <div class="sml-pad-y-top3 med-pad-y-top6">
      <div class="wrapper">
        <div class="row">
          <div class="sml-c12 med-c10 grid-center text-center">
            <Logo class="grid-center text-center sml-pad-y2" />
          </div>
        </div>
      </div> <!-- .wrapper -->
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo'
import VideoHeader from '~/components/VideoHeader'

export default {
  components: {
    Logo,
    VideoHeader
  },

  props: {
    video: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
