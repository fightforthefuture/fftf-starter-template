<template>
  <div class="parallax-element" :data-speed="speed" :data-grayscale="isGrayscale" :data-start-distance="startDistance" :data-stop-at-el="stopAtEl" :data-mobile-px="mobileSize">
    <slot />
  </div>
</template>



<script>
import parallax from '~/assets/js/parallax'
export default {
  props: {
    speed: {
      type: Number,
      required: false,
      default: 0.6
    },
    isGrayscale: {
      type: Boolean,
      required: false,
      default: false
    },
    mobileSize: {
      type: Number,
      required: false,
      default: null
    },
    startDistance: {
      type: Number,
      required: false,
      default: null
    },
    stopAtEl: {
      type: String,
      required: false,
      default: null
    }
  },

  mounted() {
    setTimeout(() => {
      document.querySelectorAll('.parallax-element:not(.parallaxed)').forEach( (el) => {
        parallax(el)
        el.classList.add('parallaxed')
      })
    }, 500)
  }
}
</script>
