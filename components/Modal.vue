<template lang="pug">
  b-modal(:static="true"
          centered
          modal-class="text-center"
          hide-footer
          v-model="modalShow"
          :id="id"
          title-tag="h1"
          :size="size"
          @shown="shown"
          :title-sr-only="titleSrOnly")
    template(v-slot:modal-title)
      slot(name="modal-title")
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
      modalShow: false
    }
  },

  mounted() {
    document.querySelector(`#${this.id}`).removeAttribute('aria-describedby')
    document.querySelector(`#${this.id}___BV_modal_content_`).removeAttribute('tabindex')

    document.querySelector(`#${this.id}___BV_modal_header_`).setAttribute('role', 'presentation')

    document.querySelector(`#${this.id}___BV_modal_title_`).setAttribute('tabindex', '-1')

    this.modalShow = true
  },

  methods: {
    shown() {
      const tabtraps = document.querySelectorAll(`#${this.id} .modal-dialog > span`)
      for (let el of tabtraps) {
        el.setAttribute('aria-hidden', 'true')
      }

      document.querySelector(`#${this.id} h1`).focus()
    },

    closeModal() {
      this.modalShow = false
    }
  }


}
</script>
