<template>
  <span>
    &nbsp;
    <slot />
    &nbsp;
  </span>
</template>

<script>
export default {
  mounted() {
    console.log('mounted span')
  }
}
</script>
