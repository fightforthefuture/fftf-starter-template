<template lang="pug">
  .text-center
    section
      h1.text-uppercase This is the component test page
      p
        a(href="#" @click.prevent="$scrollTo('#sign')")
          img(src="~assets/images/arrow-down-light.svg" alt="Scroll down")

    section#sign(aria-labelledby="h2-form")
      .container
        h2#h2-form ActionNetworkForm
        br
        ActionNetworkForm(
          petition-id=""
          has-comment
          has-company
        )

    section(aria-labelledby="h2-joint-form")
      .container
        h2#h2-joint-form ActionNetworkForm (Joint Petition)
        br
        ActionNetworkForm(
          petition-id="international-petition-test"
          has-comment
          is-joint-petition
        )

    section(aria-labelledby="h2-letter")
      .container
        h2#h2-letter Letter
        br
        Letter.text-start(
          letter-title="TITLE OF LETTER"
          download-file="/share.jpg"
        )

    section(aria-labelledby="h2-youtube")
      .container
        h2#h2-youtube YoutubeVideo
        br
        YoutubeVideo(
          youtube-id="ZjIPq4pidYU"
        )
        br
        YoutubeVideo(
          youtube-id="jZjmlJPJgug"
          placeholder-image="https://i.imgur.com/AXF1Ar1.jpg"
        )


    section(aria-labelledby="h2-logo-cloud")
      .container
        h2#h2-logo-cloud LogoCloud
        br
        LogoCloud

    section(v-if="hasMap" aria-labelledby="h2-map")
      .container
        h2#h2-map Map
        br
        Map(:events="mapEvents")

    section(aria-labelledby="h2-progress-bar")
      .container
        h2#h2-progress-bar ProgressBar
        br
        ProgressBar

    section(aria-labelledby="h2-quote-scroller")
      .container
        h2#h2-quote-scroller QuoteScroller
        br
        QuoteScroller

    section#parallax(aria-labelledby="h2-parallax")
      .container
        parallax(:speed="0.8" is-grayscale stop-at-el="#parallax h2" :start-distance="100")
          img(src="~/assets/images/fftf-logo-light.svg")
        h2#h2-parallax Parallax
        p.mt-5 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel dapibus tortor. Nam a hendrerit turpis. Aliquam mollis porta lacus, id pellentesque massa tincidunt et. Phasellus facilisis pellentesque justo id egestas. Praesent orci augue, congue id consectetur eget, pharetra at ligula. Donec a augue ornare, vestibulum velit eget, lacinia orci. Aliquam erat volutpat. Donec molestie congue neque, non rutrum lacus maximus a. Proin sed pharetra magna. Fusce est urna, porta et laoreet non, ullamcorper id tellus. Quisque tempor odio sed orci malesuada, quis fringilla urna tristique. Proin at elementum libero.

    section(aria-labelledby="h2-modals")
      .container
        h2#h2-modals Modals
        br
        .d-flex.justify-content-around
          button.btn.btn-info(@click.prevent="$store.commit('showModal', 'archived')") Archived
          button.btn.btn-info(@click.prevent="$store.commit('showModal', 'call-form')") Call Form
          button.btn.btn-info(@click.prevent="$store.commit('showModal', 'call-script')") Call Script

    section(aria-labelledby="h2-click-copy")
      .container
        h2#h2-click-copy ClickToCopy
        br
        ClickToCopy(text-to-copy="this is the text to copy")

    section(aria-labelledby="h2-accordion")
      .container
        h2#h2-accordion Accordion
        br
        Accordion
          AccordionItem(id="accordion-item-1" title="Item Number 1" :visible="true")
            | This is the first accordion item
          AccordionItem(id="accordion-item-2" title="Item Number 2")
            | This is the second accordion item
          AccordionItem(id="accordion-item-3" title="Item Number 3")
            | This is the third accordion item

    section(aria-labelledby="h2-radio-group")
      .container
        h2#h2-radio-group Radio Group
        h3#radio-group-label Which option do you like best?
        RadioGroup(aria-label="radio-group-label" class="row")
          RadioButton(id="radio-button-1" class="col-md-6 mb-3")
            span.btn.btn-block.btn-alt.radio-label Option 1
          RadioButton(id="radio-button-2" class="col-md-6 mb-3")
            span.btn.btn-block.btn-alt.radio-label Option 2
          RadioButton(id="radio-button-3" class="col-md-6 mb-3")
            span.btn.btn-block.btn-alt.radio-label Option 3
          RadioButton(id="radio-button-4" class="col-md-6 mb-3")
            span.btn.btn-block.btn-alt.radio-label Option 4

    section(aria-labelledby="h2-uppercase-group")
      .container
        h2#h2-uppercase-group Uppercase
        Uppercase
          | This text should be uppercase for sighted users and normal case for non-sighted users

    PersistentButton(target="sign") Sign the petition
</template>

<script>
import config from '~/config'

export default {
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
