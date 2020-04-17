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
        ActionNetworkForm(
          petition-id=""
          has-comment
        )

    section
      .container
        h2 JointPetitionForm
        br
        JointPetitionForm(
          petition-url="ban-facial-recognition-list-swap"
          has-comment
          default-comment="this is a test"
        )

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
import JointPetitionForm from '~/components/JointPetitionForm'
import LogoCloud from '~/components/LogoCloud'

export default {
  components: {
    ActionNetworkForm,
    JointPetitionForm,
    LogoCloud
  }
}
</script>
