import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedCards = JSON.parse(localStorage.getItem('cards'))

export default new Vuex.Store({
  state: {
    cards: savedCards || [
      {
        id: 1,
        title: 'title 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, asperiores aspernatur beatae blanditiis corporis cumque dicta dignissimos dolores eos expedita',
      },
      {
        id: 2,
        title: 'title 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, asperiores aspernatur beatae blanditiis corporis cumque dicta dignissimos dolores eos expedita',
      }
    ]
  },
  mutations: {
    setCards(state, cards) {
      this.cards = cards
    }
  },
  actions: {
    setCards({ commit }, cards) {
      commit('setCards', cards)
      localStorage.setItem('cards', JSON.stringify(cards))
    }
  },
  getters: {
    cards: state => state.cards
  },
})
