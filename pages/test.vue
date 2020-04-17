<template lang="pug">
  .text-center
    section
      h1.text-uppercase This is the component test page
      p
        a(href="#" @click.prevent="$scrollTo('#sign')")
          img(src="~assets/images/arrow-down-light.svg" alt="Scroll down")

    section#sign
      .container
        h2 ActionNetworkForm
        br
        ActionNetworkForm(:has-comment="true")

    section
      .container
        h2 LogoCloud
        br
        LogoCloud

    section
      .container
        h2 Modals
        br
        .d-flex.justify-content-around
          button.btn.btn-info(@click.prevent="$store.commit('showModal', 'archived')") Archived
          button.btn.btn-info(@click.prevent="$store.commit('showModal', 'call-form')") Call Form
          button.btn.btn-info(@click.prevent="$store.commit('showModal', 'call-script')") Call Script


</template>

<script>
import ActionNetworkForm from '~/components/ActionNetworkForm'
import LogoCloud from '~/components/LogoCloud'

export default {
  components: {
    ActionNetworkForm,
    LogoCloud
  }
}
</script>
