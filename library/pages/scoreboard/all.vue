<i18n src="~/locales/pages/scoreboard/all.yml"></i18n>

<template>
  <DefaultLayout>
    <section class="sml-pad-y3 med-pad-y6">
      <div class="wrapper">
        <div class="row">
          <div class="sml-c12 lrg-c8 grid-center text-center">
            <h1>{{ $t('page_title') }}</h1>

            <ScoreboardLegend class="sml-push-y2 med-push-y4" />
            <ScoreboardStateSelect class="sml-push-y2 med-push-y3" />

            <div v-for="state in sortedStateNames"
                 :key="`state-${state}`"
                 :id="state">
              <h2 class="sml-push-y2">{{ states[state] }}</h2>
              <ScoreboardGroup
                v-if="politiciansByState[state].length > 0"
                :politicians="politiciansByState[state]"
                class="sml-push-y2 med-push-y3" />
            </div> <!-- v-for -->
          </div> <!-- .c -->
        </div> <!-- .row -->
      </div> <!-- .wrapper -->
    </section>
  </DefaultLayout>
</template>

<script>
import US_STATES from '~/assets/data/states'
import { smoothScrollTo } from '~/assets/js/helpers'
import DefaultLayout from '~/components/DefaultLayout'
import ScoreboardGroup from '~/components/ScoreboardGroup'
import ScoreboardLegend from '~/components/ScoreboardLegend'
import ScoreboardStateSelect from '~/components/ScoreboardStateSelect'

export default {
  components: {
    DefaultLayout,
    ScoreboardGroup,
    ScoreboardLegend,
    ScoreboardStateSelect
  },

  head() {
    return {
      titleTemplate: `%s - ${this.$t('page_title')}`
    }
  },

  async asyncData({ $axios }) {
    let politicians = []

    try {
      const { data } = await $axios.get('https://data.battleforthenet.com/scoreboard/all.json')
      politicians = data
    } catch (error) {
      //
    }

    return {
      politicians: politicians
    }
  },

  computed: {
    states() { return US_STATES },

    selectedState: {
      get() {
        return this.$store.state.selectedState
      },
      set(value) {
        this.$store.commit('setSelectedState', value)
      }
    },

    sortedStateNames() {
      return Object.keys(this.politiciansByState).sort()
    },

    politiciansByState() {
      const politiciansByState = {}

      for (const pol of this.politicians) {
        if (!politiciansByState[pol.state]) {
          politiciansByState[pol.state] = []
        }

        politiciansByState[pol.state].push(pol)
      }

      return politiciansByState
    }
  },

  watch: {
    selectedState(newValue) {
      if (newValue) {
        const el = document.getElementById(newValue)

        if (el) {
          smoothScrollTo(el.offsetLeft, el.offsetTop, 500)
          location.hash = `#${newValue}`
        }
      }
    }
  }
}
</script>
