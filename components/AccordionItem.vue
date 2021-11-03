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
  <li class="accordion-item">
    <div class="card">
      <div class="card-header accordion-header p-0">
        <h3 class="d-grid">
          <button
            :id="`${id}-header`"
            :aria-controls="`${id}-panel`"
            :aria-expanded="visible"
            class="btn btn-primary accordion-button"
            :class="visible ? '' : 'collapsed'"
            data-bs-toggle="collapse"
            :data-bs-target="`#${id}-panel`">
            {{ title }}
          </button>
        </h3>
      </div>
      <div
        :id="`${id}-panel`"
        role="region"
        :class="visible ? 'show' : ''"
        :aria-labelledby="`${id}-header`"
        :data-bs-parent="`#${accordionId}`"
        class="card-body accordion-collapse collapse accordion-body">
        <slot />
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      accordionId: {
        type: String,
        required: true
      },
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
