<style lang="scss" scoped>
  .persistent-button {
    z-index: 1983;
    position: fixed;
    bottom: 2.5rem;
    right: 2.5rem;
    transform: translate3d(0, 200%, 0);
    transition: transform 0.2s ease-in;

    &.visible {
      transform: translate3d(0, 0, 0);
    }

    @include media-breakpoint-down('sm') {
      border-radius: 0;
      bottom: 0;
      box-shadow: none;
      display: block;
      right: 0;
      left: 0;

      width: 100%;
    }
  }
</style>

<template>
  <button class="persistent-button btn btn-lg btn-info shadow-lg"
            :class="{ visible: isVisible }"
            @click="$trackClick('sticky_button_homepage'); scrollTo(`#${target}`);" >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    target: {
      type: String,
      required: false,
      default: null
    },
    alwaysVisible: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      isVisible: false
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    document.body.classList.add('has-persistent-button')
  },

  created() {
    if (this.alwaysVisible) {
      this.isVisible = true
    }
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      if (this.target && !this.alwaysVisible) {
        const targetEl = document.getElementById(this.target);
        const top = targetEl.offsetTop + targetEl.offsetHeight;

        // IE11 uses pageYOffset. everything else uses scrollY
        const scrollY = window.scrollY || window.pageYOffset

        this.isVisible = scrollY > top
      }
    },

    scrollTo(hash) {
      const duration = 500
      this.$scrollTo(hash, duration)
      setTimeout(() => {
        location.hash = hash
      }, duration)
    }
  }
}
</script>
