<i18n src="~/locales/components/ClickToCopy.yml"></i18n>

<template lang="pug">
  form.copy-input
    .input-group
      input.form-control(
        type="text"
        :value="textToCopy"
        readonly
        )
      button.btn.btn-primary.js-clipboard(
        type="button"
        @click.prevent
        :data-clipboard-text="textToCopy"
        v-text="buttonText")
</template>

<script>
import Clipboard from 'clipboard'

export default {
  props: {
    textToCopy: {
      type: String,
      required: true,
      default: null
    }
  },

  data() {
    return {
      hasRecentlyCopied: false
    }
  },

  computed: {
    buttonText() {
      return this.hasRecentlyCopied ? this.$t('copied_button_text') : this.$t('copy_button_text')
    }
  },

  mounted() {
    const clipboard = new Clipboard('.js-clipboard')
    const self = this
    clipboard.on('success', function (ev) {
      self.successNotification(ev)
      ev.clearSelection()
    })
  },

  methods: {
    successNotification(ev) {
      const self = this
      if (ev.text === this.textToCopy) {
        this.hasRecentlyCopied = true
        setTimeout(function () {
          self.hasRecentlyCopied = false
        }, 2000)
      }
    }
  }
}
</script>
