import config from '~/config'

// Note that most of this stuff will be broken until we fix
// the namespacing. See https://nuxtjs.org/guide/vuex-store/
// for details

let state, mutations

if (config.features.map) {
  state = () => ({
    mapboxToken: config.mapboxToken,
    map: {
      zoom: null,
      currentPin: null
    }
  })

  mutations = {
    setMapZoom(state, value) {
      state.map.zoom = value
    },

    setMapCurrentPin(state, value) {
      state.map.currentPin = value
    }
  }
}

export {
  state,
  mutations
}
