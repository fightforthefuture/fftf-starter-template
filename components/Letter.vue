<i18n src="~/locales/global.yml"></i18n>
<template>
  <div class="card">
    <div class="card-header">
      <div class="row align-items-center">
        <div class="col-sm-4 col-md-6" v-if="downloadFile">
          <a :href="downloadFile" target="_new" class="btn btn-primary btn-block">{{ $t('global.common.download') }}</a>
        </div>
        <div class="col" v-html="letterTitle"></div>
      </div>
    </div>
    <div class="card-body text-left" v-html="letterText"></div>
  </div>
</template>

<script>
export default {
  props: {
    letter: {
      type: String,
      required: false,
      default: null
    },
    letterTitle: {
      type: String,
      required: false,
      default: null
    },
    downloadFile: {
      type: String,
      required: false,
      default: null
    }
  },

  computed: {
    letterText() {
      const letter = this.letter ? this.letter : this.$t('global.letter_text')
      return letter.split('\n\n').map(l => `<p>${l}</p>`).join('')
    }
  }
}
</script>
