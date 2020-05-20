<style lang="scss" scoped>
.bg-white {
  height: 5rem;

  img {
    max-width: 80%;
    max-height: 80%;
  }
}
</style>

<template lang="pug">
  .row
    .col-6.col-sm-3(v-for="logo in logos")
      .bg-white.rounded.d-flex.align-items-center.justify-content-center.mb-2
        img(:src="logo.image_url" :alt="logo.name")
</template>

<script>
import logos from '~/assets/data/logos.json'

export default {
  computed: {
    logos: () => logos
  }
}
</script>
