import config from '~/config'

export const state = () => ({
  // State > Config
  isArchived: config.isArchived,

  // State > Modal
  modal: config.isArchived ? 'archived' : null,
  // modalData: null,

  // State > Petition Form Fields
  name: null,
  email: null,
  address: null,
  zipCode: null,
  phone: null,

  // State > US State Select
  selectedState: null
})

export const mutations = {
  // Mutations > Modal
  showModal(state, value) {
    state.modal = value
  },

  hideModal(state, value) {
    state.modal = null
  },

  // Mutations > Petition Form Fields
  setName(state, value) {
    state.name = value
  },

  setEmail(state, value) {
    state.email = value
  },

  setAddress(state, value) {
    state.address = value
  },

  setZipCode(state, value) {
    state.zipCode = value
  },

  setPhone(state, value) {
    state.phone = value
  },

  // Mutations > US State Select
  setSelectedState(state, value) {
    state.selectedState = value
  }
}
