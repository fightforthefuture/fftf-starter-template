<style lang="scss" scoped>
  video.video-hero {
    margin: 0 auto;
    width: 100%;
  }
  .video-wrapper {
    position: relative;
  }
  .video-wrapper:after {
    background: linear-gradient(rgba($body-bg, 0), rgba($body-bg,1));
    bottom:0;
    content: '';
    height:10vw;
    left: 0;
    position: absolute;
    width:100%;
  }
</style>

<template>
  <div class="video-wrapper">
    <video autoplay loop muted playsinline class="video-hero"
           poster="images/video-bg-poster.jpg">
      <source src="~assets/videos/video-header.mp4" type="video/mp4" />
    </video>
  </div>
</template>
