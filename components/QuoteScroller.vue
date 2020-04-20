<i18n src="~/locales/components/QuoteScroller.yml"></i18n>

<style lang="scss">
.carousel-caption {
  bottom: 0;
  padding: 0;
  top: 0;

  .source {
    margin-bottom:0;
  }
}
</style>

<template lang="pug">
  b-carousel(v-model="slide"
    :interval="0"
    controls
    img-width="1024"
    img-height="300")
    b-carousel-slide(
        v-for="(quote, index) in $t('quotes')"
        :key="`slide-${index}`"
        img-blank)
      .d-flex.h-100.align-items-center.justify-content-center
        div
          blockquote {{ quote.text }}
          p.source {{ quote.source }}
</template>
<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    }
  }
</script>
