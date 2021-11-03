<i18n src="~/locales/components/QuoteScroller.yml"></i18n>

<style lang="scss">
.carousel,
.carousel-inner {
  // height: 300px;
}
.carousel-item {
  // height: 300px;
}
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
  #carousel.carousel.slide(data-bs-ride="carousel")
    .carousel-inner
      .carousel-item(v-for="(quote, index) in $t('quotes')" :class="index==0 ? 'active' : ''")
        img(src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221024%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20%25%7Bw%7D%20%25%7Bh%7D%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20style%3D%22fill%3Atransparent%3B%22%3E%3C%2Frect%3E%3C%2Fsvg%3E" width="1024" height="300" class="img-fluid w-100 d-block")
        .carousel-caption.d-flex.h-100.align-items-center.justify-content-center
          div
            blockquote {{ quote.text }}
            p.source {{ quote.source }}
    button.carousel-control-prev(type="button" data-bs-target="#carousel" data-bs-slide="prev")
      span.carousel-control-prev-icon(aria-hidden="true")
      span.visually-hidden Previous
    button.carousel-control-next(type="button" data-bs-target="#carousel" data-bs-slide="next")
      span.carousel-control-next-icon(aria-hidden="true")
      span.visually-hidden Next

</template>
<script>
  export default {
    async mounted() {
      if (process.browser) {
        const bootstrap = await import('bootstrap')
      }
    }
  }
</script>
