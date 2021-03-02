<template>
  <span>
    <span class="text-uppercase" aria-hidden="true">
      <slot />
    </span>
    <custom-span class="sr-only">
      <slot />
    </custom-span>
  </span>
</template>

<script>
import CustomSpan from '~/components/CustomSpan'

export default {
  components: {
    CustomSpan
  }
}
</script>
