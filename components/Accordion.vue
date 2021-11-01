<style lang="scss">
ul.accordion {
  list-style-type: none;
  margin: 0;
  padding: 0;

  .card {
    border-radius: 0;

    .card-header {
      background-color: unset;
    }

    .card-header .btn {
      border-radius: 0;
    }
  }

  li:first-child .card,
  li:first-child .card .card-header,
  li:first-child .card .card-header .btn {
    border-radius: $border-radius $border-radius 0 0;
  }

  li:last-child .card,
  li:last-child .card .card-body,
  li:last-child .card .card-header .btn.collapsed {
    border-radius: 0 0 $border-radius $border-radius;
  }
}

</style>
<template>
  <ul :id="accordionId" ref="accordion" class="accordion text-left mt-3">
    <slot />
  </ul>
</template>

<script>

export default {
  props: {
    accordionId: {
      type: String,
      required: true
    }
  },

  async mounted() {
    if (process.browser) {
      const bootstrap = await import('bootstrap')
      this.accordion = new bootstrap.Collapse(this.$refs.accordion)
    }
  }
}
</script>
