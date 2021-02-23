<style lang="scss">
ul[role=radiogroup] {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

ul[role=radiogroup]:focus {
  outline: none;
}

.radio-group {
  .active .btn {
    background-color: theme-color('primary');
  }
}
</style>
<template>
  <ul ref="groupNode"
      role="radiogroup"
      :aria-labelledby="ariaLabel"
      tabindex="0"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
      class="radio-group">
    <slot />
  </ul>
</template>

<script>
export default {

  props: {
    ariaLabel: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      radioButtons: [],
      firstRadioButton: null,
      lastRadioButton: null,
    }
  },

  mounted() {
    const rbs = this.$refs.groupNode.querySelectorAll('[role=radio]')

    for (let i = 0; i < rbs.length; i++) {
      const rb = rbs[i]
      rb.addEventListener('click', this.handleClick.bind(this))
      this.radioButtons.push(rb)
      if (!this.firstRadioButton) {
        this.firstRadioButton = rb
      }
      this.lastRadioButton = rb
    }
  },

  methods: {
    setChecked(currentItem) {
      for (var i = 0; i < this.radioButtons.length; i++) {
        var rb = this.radioButtons[i]
        rb.setAttribute('aria-checked', 'false')
        rb.classList.remove('focus')
        rb.classList.remove('active')
      }

      currentItem.setAttribute('aria-checked', 'true')
      currentItem.classList.add('focus')
      currentItem.classList.add('active')

      this.$refs.groupNode.setAttribute('aria-activedescendant', currentItem.id)
      this.$refs.groupNode.focus()

      this.$emit('set-answer', this.radioButtons.indexOf(currentItem))
    },

    setCheckedToPreviousItem(currentItem) {
      var index;

      if (currentItem === this.firstRadioButton) {
        this.setChecked(this.lastRadioButton)
      } else {
        index = this.radioButtons.indexOf(currentItem)
        this.setChecked(this.radioButtons[index - 1])
      }
    },

    setCheckedToNextItem(currentItem) {
      var index;

      if (currentItem === this.lastRadioButton) {
        this.setChecked(this.firstRadioButton)
      } else {
        index = this.radioButtons.indexOf(currentItem)
        this.setChecked(this.radioButtons[index + 1])
      }
    },

    getCurrentRadioButton() {
      var id = this.$refs.groupNode.getAttribute('aria-activedescendant');
      if (!id) {
        this.$refs.groupNode.setAttribute(
          'aria-activedescendant',
          this.firstRadioButton.id
        );
        return this.firstRadioButton
      }
      for (var i = 0; i < this.radioButtons.length; i++) {
        var rb = this.radioButtons[i];
        if (rb.id === id) {
          return rb
        }
      }
      this.$refs.groupNode.setAttribute(
        'aria-activedescendant',
        this.firstRadioButton.id
      );
      return this.firstRadioButton
    },

    handleKeydown(event) {
      var flag = false;

      var currentItem = this.getCurrentRadioButton()
      switch (event.key) {
        case ' ':
        case 'Enter':
          this.setChecked(currentItem)
          flag = true
          break

        case 'Up':
        case 'ArrowUp':
        case 'Left':
        case 'ArrowLeft':
          this.setCheckedToPreviousItem(currentItem)
          flag = true
          break

        case 'Down':
        case 'ArrowDown':
        case 'Right':
        case 'ArrowRight':
          this.setCheckedToNextItem(currentItem)
          flag = true
          break

        default:
          break
      }

      if (flag) {
        event.stopPropagation()
        event.preventDefault()
      }
    },

    handleClick(event) {
      this.setChecked(event.currentTarget)
    },

    handleFocus() {
      const currentItem = this.getCurrentRadioButton()
      currentItem.classList.add('focus')
    },

    handleBlur() {
      const currentItem = this.getCurrentRadioButton()
      currentItem.classList.remove('focus')
    }
  }
}
</script>