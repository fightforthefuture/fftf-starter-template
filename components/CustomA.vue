<template>
  <a :href="href"
     :target="target"><slot :aria-hidden="srText" /><span v-if="srText" class="sr-only">{{ srText }}</span></a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: false,
      default: null
    },
    srText: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>
