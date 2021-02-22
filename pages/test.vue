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

    section#parallax
      .container
        parallax(:speed="0.8" is-grayscale stop-at-el="#parallax h2" :start-distance="100")
          img(src="~/assets/images/fftf-logo-light.svg")
        h2 Parallax
        p.mt-5 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel dapibus tortor. Nam a hendrerit turpis. Aliquam mollis porta lacus, id pellentesque massa tincidunt et. Phasellus facilisis pellentesque justo id egestas. Praesent orci augue, congue id consectetur eget, pharetra at ligula. Donec a augue ornare, vestibulum velit eget, lacinia orci. Aliquam erat volutpat. Donec molestie congue neque, non rutrum lacus maximus a. Proin sed pharetra magna. Fusce est urna, porta et laoreet non, ullamcorper id tellus. Quisque tempor odio sed orci malesuada, quis fringilla urna tristique. Proin at elementum libero.

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

    section
      .container
        h2 Accordion
        br
        Accordion
          AccordionItem(id="accordion-item-1" title="Item Number 1" :visible="true")
            | This is the first accordion item
          AccordionItem(id="accordion-item-2" title="Item Number 2")
            | This is the second accordion item
          AccordionItem(id="accordion-item-3" title="Item Number 3")
            | This is the third accordion item
</template>

<script>
import config from '~/config'
import Accordion from '~/components/Accordion'
import AccordionItem from '~/components/AccordionItem'
import ActionNetworkForm from '~/components/ActionNetworkForm'
import ClickToCopy from '~/components/ClickToCopy'
import Letter from '~/components/Letter'
import LogoCloud from '~/components/LogoCloud'
import Map from '~/components/Map'
import Parallax from '~/components/Parallax'
import ProgressBar from '~/components/ProgressBar'
import QuoteScroller from '~/components/QuoteScroller'
import YoutubeVideo from '~/components/YoutubeVideo'

export default {
  components: {
    Accordion,
    AccordionItem,
    ActionNetworkForm,
    ClickToCopy,
    Letter,
    LogoCloud,
    Map,
    Parallax,
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
