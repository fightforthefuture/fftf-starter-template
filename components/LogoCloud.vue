<style lang="scss" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.bg-white {
  height: 5rem;

  img {
    max-width: 80%;
    max-height: 80%;
  }
}
</style>

<template lang="pug">
  ul.row
    li.col-6.col-sm-3(v-for="logo in logos")
      .bg-white.rounded.d-flex.align-items-center.justify-content-center.mb-2
        img(:src="logo.image_url" :alt="`${logo.name} logo`")
</template>

<script>
import logos from '~/assets/data/logos.json'

export default {
  computed: {
    logos: () => logos
  }
}
</script>
