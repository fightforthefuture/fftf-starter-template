<i18n src="~/locales/components/ProgressBar.yml"></i18n>

<style lang="scss" scoped>
  .progress {
    position: relative;
    @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    .progress-bar span {
      left: 0;
      position: absolute;
      right: 0;
      text-align: center;
      animation: fadein 2s ease;
    }
  }
</style>
<template lang="pug">
  .progress
    .progress-bar(role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :aria-valuetext="$t('aria_text', {count: this.totalSignatures})"
                  :style="`width: ${percentComplete}%;`")
      span(v-show="totalSignatures") {{ totalSignatures }} SIGNERS
</template>

<script>
export default {
  data() {
    return {
      totalSignatures: null,
      percentComplete: 0
    }
  },

  created() {
    this.fetchTotalSignatures()
    setTimeout(() => {
      this.percentComplete = 75
    }, 100)
  },

  methods: {
    async fetchTotalSignatures() {
      try {
        const { data } = await this.$axios.get('https://data.fightforthefuture.org/takethisseriously/data.json')
        this.totalSignatures = this.$n(data.total_signatures)
      }
      catch (error) {
        console.error('Failed to load signature count')
      }
    }
  }
}
</script>
