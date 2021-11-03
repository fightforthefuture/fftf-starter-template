<template lang="pug">
  .modal.text-center.fade(:id="id" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" ref="modal")
    .modal-dialog
      .modal-content
        .modal-header(role="presentation")
          h1.modal-title(:class="titleSrOnly ? 'visually-hidden' : ''")
            slot(name="modal-title")
          button.btn-close(type="button" @click.prevent="closeModal" aria-label="Close")

        .modal-body
          slot
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    titleSrOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      modal: null
    }
  },

  async mounted() {
    if (process.browser) {
      const bootstrap = await import('bootstrap')
      this.modal = new bootstrap.Modal(this.$refs.modal)
      this.$refs.modal.addEventListener('shown.bs.modal', this.shown)
      this.$refs.modal.addEventListener('hidden.bs.modal', this.hidden)

      this.modal.show()
    }
  },

  beforeDestroy() {
    this.$refs.modal.removeEventListener('shown.bs.modal', this.shown)
    this.$refs.modal.removeEventListener('hidden.bs.modal', this.hidden)
  },

  methods: {
    shown() {
      const tabtraps = document.querySelectorAll(`#${this.id} .modal-dialog > span`)
      for (let el of tabtraps) {
        el.setAttribute('aria-hidden', 'true')
      }

      document.querySelector(`#${this.id} h1`).focus()
    },

    hidden() {
      this.$store.commit('hideModal')
    },

    closeModal() {
      this.modal.hide()
    }
  }


}
</script>
