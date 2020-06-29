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
        h2 ActionNetworkForm (Joint Petition)
        br
        ActionNetworkForm(
          petition-id="international-petition-test"
          has-comment
          is-joint-petition
        )

    section
      .container
        h2 Letter
        br
        Letter.text-left(
          letter-title="TITLE OF LETTER"
          download-file="/share.jpg"
        )

    section
      .container
        h2 YoutubeVideo
        br
        YoutubeVideo(
          youtube-id="ZjIPq4pidYU"
        )
        br
        YoutubeVideo(
          youtube-id="jZjmlJPJgug"
          placeholder-image="https://i.imgur.com/AXF1Ar1.jpg"
        )


    section
      .container
        h2 LogoCloud
        br
        LogoCloud

    section(v-if="hasMap")
      .container
        h2 Map
        br
        Map(:events="mapEvents")

    section
      .container
        h2 ProgressBar
        br
        ProgressBar

    section
      .container
        h2 QuoteScroller
        br
        QuoteScroller

    section
      .container
        h2 Modals
        br
        .d-flex.justify-content-around
          button.btn.btn-info(@click.prevent="$store.commit('showModal', 'archived')") Archived
          button.btn.btn-info(@click.prevent="$store.commit('showModal', 'call-form')") Call Form
          button.btn.btn-info(@click.prevent="$store.commit('showModal', 'call-script')") Call Script

    section
      .container
        h2 ClickToCopy
        br
        ClickToCopy(text-to-copy="this is the text to copy")

</template>

<script>
import config from '~/config'
import ActionNetworkForm from '~/components/ActionNetworkForm'
import Letter from '~/components/Letter'
import LogoCloud from '~/components/LogoCloud'
import Map from '~/components/Map'
import ProgressBar from '~/components/ProgressBar'
import QuoteScroller from '~/components/QuoteScroller'
import ClickToCopy from '~/components/ClickToCopy'
import YoutubeVideo from '~/components/YoutubeVideo'

export default {
  components: {
    ActionNetworkForm,
    ClickToCopy,
    Letter,
    LogoCloud,
    Map,
    ProgressBar,
    QuoteScroller,
    YoutubeVideo
  },

  computed: {
    hasMap() {
      return config.features.map
    },

    mapEvents() {
      return [{"id":"124d7eda-8337-11ea-abe7-e56e53e580eb","title":"Washington for Net Neutrality","address":"Washington","url":"https://www.facebook.com/groups/301820760363761/ ","image":"","latitude":"47.41129684","longitude":"-120.5562668","start_date":"2037-09-01T00:00:00.000Z","formatted_start_date":"Tuesday, September 1 at 12AM","category":"facebook_group"},{"id":"124d57c0-8337-11ea-abe7-e56e53e580eb","title":"Utah for Net Neutrality","address":"Utah","url":"https://www.facebook.com/groups/1128003474019104/","image":"","latitude":"39.3237381","longitude":"-111.6782379","start_date":"2037-09-01T00:00:00.000Z","formatted_start_date":"Tuesday, September 1 at 12AM","category":"facebook_group"}]
    }
  }
}
</script>
