<template>
  <span><template v-if="!ltrim">&nbsp;</template><slot /><template v-if="!rtrim">&nbsp;</template></span>
</template>

<script>

export default {
  props: {
    ltrim: {
      type: Boolean,
      required: false,
      default: false
    },
    rtrim: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
