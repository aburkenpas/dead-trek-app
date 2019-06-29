// Import data
import supplyCards from './data/supply-cards.json'
import lootCards from './data/loot-cards.json'

export default {
  state: {
    cardsLeft: 50,
    cardsLeftInBlock: 10,
    message: 'Start the game by dealing supply cards',
    winner: false,
    loser: false,
    playing: false,
    supplyCards: supplyCards,
    playerSupplyCards: [{ type: 'Start' }],
    currentRoadCard: {
      type: 'Back'
    },
    resolvedRoadCard: true,
    lootCards: lootCards,
    looting: false,
    inLootAction: false,
    currentLootEvent: 1,
    currentLootCard: {
      type: 'Back'
    },
    foodRequired: false
  },
  mutations: {
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
    REMOVE_DELT_CARDS(state, index) {
      state.supplyCards.splice(index, 1)
    },
    SET_CURRENT_ROAD_CARD(state, roadCard) {
      state.currentRoadCard = roadCard
    },
    SET_ROAD_CARD_RESOLVED(state, status) {
      state.resolvedRoadCard = status
      state.currentRoadCard = { type: 'Back' }

      if (status == true) {
        state.cardsLeft--
        state.cardsLeftInBlock--
      }

      if (state.cardsLeftInBlock == 0 && state.cardsLeft != 0) {
        state.cardsLeftInBlock += 10
        state.foodRequired = true
      }

      if (state.cardsLeft == 0) {
        state.winner = true
        state.message = 'You win! Congrats'
      }
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
    LOOTING_ACTION_STATUS(state, status) {
      state.inLootAction = status
    },
    SET_CURRENT_LOOTING_CARD(state, lootCard) {
      state.currentLootCard = lootCard
    },
    ADD_TWO_CARDS(state) {
      state.cardsLeft += 2
      state.cardsLeftInBlock += 2
    },
    FOOD_REQUIRED_STATUS(state, status) {
      state.foodRequired = status
    },
    REMOVE_USED_LOOT_CARD(state, index) {
      state.lootCards.splice(index, 1)
    }
  },
  actions: {
    loser({ commit }) {
      commit('LOSER')
    },
    startGame({ commit }) {
      commit('PLAYING')
    },
    supplyCardsDelt({ commit }, supplyCards) {
      commit('DEAL_SUPPLY_CARDS', supplyCards)
    },
    removedDeltCards({ commit }, index) {
      commit('REMOVE_DELT_CARDS', index)
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
    setLootActionStatus({ commit }, status) {
      commit('LOOTING_ACTION_STATUS', status)
    },
    setCurrentLootingCard({ commit }, lootCard) {
      commit('SET_CURRENT_LOOTING_CARD', lootCard)
    },
    addTwoCards({ commit }) {
      commit('ADD_TWO_CARDS')
    },
    foodRequiredStatus({ commit }, status) {
      commit('FOOD_REQUIRED_STATUS', status)
    },
    removeUsedLootCard({ commit }, index) {
      commit('REMOVE_USED_LOOT_CARD', index)
    }
  }
}
