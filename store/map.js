import config from '~/config'

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
    setZoom(state, value) {
      state.map.zoom = value
    },

    setCurrentPin(state, value) {
      state.map.currentPin = value
    }
  }
}

export {
  state,
  mutations
}
