<i18n src="~/locales/global.yml"></i18n>
<template>
  <div>
    <label type="text" :for="name" v-if="label">{{ label }}</label>
    <textarea v-if="type==='textarea'"
      :name="name"
      :ref="name"
      v-model.lazy="localModel"
      :placeholder="placeholder"
      :required="required"
    ></textarea>
    <input v-else
      :name="name"
      v-model.lazy="localModel"
      :placeholder="placeholder"
      :required="required"
      :type="type">

    <a v-if="showClear" class="btn btn-sml btn-alt" @click.prevent="clearText()">
      {{ $t('global.common.clear') }}
    </a>

    <small class="text-purple" v-html="disclaimer" v-if="disclaimer"></small>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: String,
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
      type: {
        type: String,
        required: false,
        default: 'text'
      },
      label: {
        type: String,
        required: false,
        default: null
      },
      disclaimer: {
        type: String,
        required: false,
        default: null
      },
      showClear: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    computed: {
      localModel: {
        get() { return this.value },
        set(localModel) {this.$emit('input', localModel)}
      }
    },
    methods: {
      clearText() {
        this.localModel = ''
        this.$refs[this.name].focus()
      }
    }
  }
</script>
