<i18n src="~/locales/cms.yml"></i18n>

<template lang="pug">
  main.index-page.text-center

    section#intro(aria-labelledby="h1-intro")
      h1#h1-intro(v-html="$t('cms.intro_title')")
      .container
        p(v-html="$t('cms.intro_description')")
        a.btn.btn-link(@click.prevent="$scrollTo('#sign')")
          img(src="~assets/images/arrow-down-light.svg" alt="Scroll down to sign the petition")

    section#petition(aria-labelledby="h2-petition")
      .container
        h2#h2-petition(v-html="$t('cms.petition_title')")
        p(v-html="$t('cms.petition_description')")
        ActionNetworkForm(
          :petition-id="$t('cms.petition_id')"
          tags="$te('cms.petition_tags') ? $t('cms.petition_tags') : ''"
        )
</template>

<script>
import ActionNetworkForm from '~/components/ActionNetworkForm'

export default {
  components: {
    ActionNetworkForm
  }
}
</script>
