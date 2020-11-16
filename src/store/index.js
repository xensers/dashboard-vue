import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedCards = JSON.parse(localStorage.getItem('cards'))

export default new Vuex.Store({
  state: {
    cards: savedCards || [
      {
        id: 0,
        title: 'title 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, asperiores aspernatur beatae blanditiis corporis cumque dicta dignissimos dolores eos expedita',
      },
      {
        id: 1,
        title: 'title 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, asperiores aspernatur beatae blanditiis corporis cumque dicta dignissimos dolores eos expedita',
      }
    ]
  },
  mutations: {
    setCards(state, cards) {
      state.cards = cards
    },
    addCard(state, card) {
      state.cards.push(card)
    }
  },
  actions: {
    setCards({ commit, dispatch }, cards) {
      commit('setCards', cards)
      dispatch('saveCards')
    },
    addCard({ commit, dispatch }, card) {
      commit('addCard', card)
      dispatch('saveCards')
    },
    saveCards({ state }) {
      localStorage.setItem('cards', JSON.stringify(state.cards))
    }
  },
  getters: {
    cards: state => state.cards
  },
})
