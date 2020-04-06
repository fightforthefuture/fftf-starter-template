<i18n src="~/locales/global.yml"></i18n>
<template>
  <div class="sml-pad-half" :class="isButton ? '' : 'radio-toggle'">
    <div class="flex-grid sml-flex-row">
      <div v-for="(option, index) in radioOptions" :class="isButton ? 'faux-btn' : ''">
        <input
          :id="`${name}-${index}`"
          v-model="localModel"
          type="radio"
          :value="option.value" />
        <label :for="`${name}-${index}`">{{ option.label }}</label>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        required: false,
        default: null
      },
      name: {
        type: String,
        required: true
      },
      required: {
        type: Boolean,
        required: false,
        default: false
      },
      placeholder: {
        type: String,
        required: false,
        default: null
      },
      options: {
        type: Array,
        required: false,
        default: null
      },
      isButton: {
        type: Boolean,
        required: false,
        default: false
      }
    },

    computed: {
      localModel: {
        get() { return this.value },
        set(localModel) {this.$emit('input', localModel)}
      },
      radioOptions() {
        if (this.options) {
          return this.options
        } else {
          return [
            {
              value: true,
              label: this.$t('global.common.yes')
            },
            {
              value: false,
              label: this.$t('global.common.no')
            }
          ]
        }
      }
    }
  }
</script>
