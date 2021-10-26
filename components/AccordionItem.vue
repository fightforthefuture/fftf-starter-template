<style lang="scss" scoped>
.card {
  border-top: 1px solid darken($primary, 10%);

  &:first-child {
    border-top: none;
  }

  .card-header {
    h3 {
      color: $body-color;
      margin-bottom: 0;
    }

    .btn {
      font-size: $h3-font-size;
      padding-left: $spacer;
      text-align: left;

      &:hover {
        transform: unset;
      }
    }
  }
  .card-body {
    background: none;

  }
}

</style>
<template>
  <li>
    <div class="card">
      <div class="card-header p-0">
        <h3>
          <button
            :id="`${id}-header`"
            :aria-controls="`${id}-panel`"
            :aria-expanded="visible"
            class="btn btn-block btn-primary"
            v-b-toggle="`${id}-panel`">
            {{ title }}
          </button>
        </h3>
      </div>
      <b-collapse
        :id="`${id}-panel`"
        accordion="format-accordion"
        role="region"
        :visible="visible"
        :aria-labelledby="`${id}-header`"
        class="card-body">
        <slot />
      </b-collapse>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      visible: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>
