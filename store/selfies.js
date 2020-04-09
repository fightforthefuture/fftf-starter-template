import config from '~/config'

// Note that most of this stuff will be broken until we fix
// the namespacing. See https://nuxtjs.org/guide/vuex-store/
// for details

let state, mutations, actions

if (config.features.selfies) {
  state = () => ({
    // State > Photo Gallery
    selfies: null,
    selfiesCurPageNum: 1,

    // State > Photo Submissions
    photoSource: null,
    selfie: {}
  })

  mutations = {
    // Mutations > Photo Gallery & Submissions
    setPhotoSource(state, value) {
      state.photoSource = value
    },

    setSelfie(state, value) {
      state.selfie = value
    },

    setSelfies(state, value) {
      state.selfies = value
      state.selfiesCurPageNum = 1
    },

    addSelfies(state, value) {
      state.selfies.data = state.selfies.data.concat(value.data)
      state.selfies.pages = value.pages
    },

    setSelfiesCurPageNum(state, value) {
      state.selfiesCurPageNum = value
    },

    // Mutations > US State Select
    setSelectedState(state, value) {
      state.selectedState = value
    }
  }

  actions = {
    // Actions > Photo Gallery
    async getSelfies({ commit, state }, query) {
      let q = ''
      if (query && query.page) {
        q = `-page${query.page}`
      } else if (query && query.state) {
        q = `-${query.state}`
      }

      try {
        // TODO: genericize URL or change per project
        const { data } = await this.$axios.get(`https://data.battleforthenet.com/deadline/selfies${q}.json`)
        if (query && query.page > 1) {
          commit('addSelfies', data)
        } else {
          commit('setSelfies', data)
        }
      } catch (error) {
        console.log('Something went wrong with fetching the selfies')
      }
    },

    openSelfieModal({ commit, state }, selfie) {
      commit('setModalVisibility', true)
      commit('setModalType', 'selfie')
      commit('setModalData', selfie)
    }
  }
}

export {
  state,
  mutations,
  actions
}
