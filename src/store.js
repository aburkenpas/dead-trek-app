import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cardsLeft: 50,
    cardsLeftInBlock: 10,
    message: 'Start the game by dealing supply cards',
    winner: false,
    loser: false,
    playing: false,
    playerSupplyCards: [],
    currentRoadCard: {
      type: 'Start'
    },
    resolvedRoadCard: true,
    looting: false,
    currentLootCard: {
      type: 'Start'
    }
  },
  mutations: {
    INCREMENT_CARDS_LEFT(state) {
      state.cardsLeft -= 1
    },
    INCREMENT_CARDS_LEFT_IN_BLOCK(state) {
      state.cardsLeftInBlock -= 1
    },
    WINNER(state) {
      state.winner = true
    },
    LOSER(state) {
      state.loser = true
    },
    PLAYING(state) {
      state.message = 'Play your first road card'
      state.playing = true
    },
    DEAL_SUPPLY_CARDS(state, supplyCards) {
      state.playerSupplyCards = supplyCards
    },
    SET_CURRENT_ROAD_CARD(state, roadCard) {
      state.currentRoadCard = roadCard
    },
    SET_ROAD_CARD_RESOLVED(state, status) {
      state.resolvedRoadCard = status
    },
    REMOVE_USED_SUPPLY(state, index) {
      state.playerSupplyCards.splice(index, 1)
    },
    UPDATE_MESSAGE(state, message) {
      state.message = message
    },
    LOOTING_STATUS(state, status) {
      state.looting = status
    },
    SET_CURRENT_LOOTING_CARD(state, lootCard) {
      state.currentLootCard = lootCard
    }
  },
  actions: {
    loser({ commit }) {
      commit('LOSER')
    },
    startGame({ commit }) {
      commit('PLAYING')
    },
    updateCardsLeft({ commit }) {
      commit('INCREMENT_CARDS_LEFT')
    },
    supplyCardsDelt({ commit }, supplyCards) {
      commit('DEAL_SUPPLY_CARDS', supplyCards)
    },
    setCurrentRoadCard({ commit }, roadCard) {
      commit('SET_CURRENT_ROAD_CARD', roadCard)
    },
    setRoadCardResolved({ commit }, status) {
      commit('SET_ROAD_CARD_RESOLVED', status)
    },
    removeUsedSupply({ commit }, index) {
      commit('REMOVE_USED_SUPPLY', index)
    },
    updateMessage({ commit }, message) {
      commit('UPDATE_MESSAGE', message)
    },
    lootingStatus({ commit }, status) {
      commit('LOOTING_STATUS', status)
    },
    setCurrentLootingCard({ commit }, lootCard) {
      commit('SET_CURRENT_LOOTING_CARD', lootCard)
    }
  }
})
