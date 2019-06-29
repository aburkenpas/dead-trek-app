import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from '@/store.js'
import { cloneDeep } from 'lodash'

// Data
import supplyCards from '@/data/supply-cards.json'
import lootCards from '@/data/loot-cards.json'

describe('store actions', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
  })

  test('sets "loser" to true when "loser" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    expect(store.state.loser).toBe(false)
    store.dispatch('loser')
    expect(store.state.loser).toBe(true)
  })

  test('sets "message" and "playing" when "startGame" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    expect(store.state.message).toBe('Start the game by dealing supply cards')
    expect(store.state.playing).toBe(false)
    store.dispatch('startGame')
    expect(store.state.message).toBe('Play your first road card')
    expect(store.state.playing).toBe(true)
  })

  test('sets "playerSupplyCards" when "supplyCardsDelt" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    let supplyCardDelt = [{ type: 'Ammo' }]
    expect(store.state.playerSupplyCards).toMatchObject([{ type: 'Start' }])
    store.dispatch('supplyCardsDelt', supplyCardDelt)
    expect(store.state.playerSupplyCards).toMatchObject([{ type: 'Ammo' }])
  })

  test('updated "supplyCards" when "removedDeltCards" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    expect(store.state.supplyCards).toMatchObject(supplyCards)
    store.dispatch('removedDeltCards', 0)
    expect(store.state.supplyCards).toMatchObject([
      { type: 'Ammo' },
      { type: 'Ammo' },
      { type: 'Ammo' },
      { type: 'Ammo' },
      { type: 'Ammo' },
      { type: 'Ammo' },
      { type: 'Ammo' },
      { type: 'Ammo' },
      { type: 'Ammo' },
      { type: 'Ammo' },
      { type: 'Ammo' },
      { type: 'Ammo' },
      { type: 'Ammo' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Health' },
      { type: 'Molotov' },
      { type: 'Molotov' },
      { type: 'Molotov' },
      { type: 'Molotov' },
      { type: 'Molotov' },
      { type: 'Molotov' },
      { type: 'Molotov' },
      { type: 'Food' },
      { type: 'Food' },
      { type: 'Food' },
      { type: 'Food' },
      { type: 'Food' }
    ])
  })

  test('updated "currentRoadCard" when "setCurrentRoadCard" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    let roadCardPicked = { type: 'Store', events: 2 }
    expect(store.state.currentRoadCard).toMatchObject({ type: 'Back' })
    store.dispatch('setCurrentRoadCard', roadCardPicked)
    expect(store.state.currentRoadCard).toMatchObject(roadCardPicked)
  })

  test('set "setRoadCardResolved" when "setCurrentRoadCard" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    expect(store.state.resolvedRoadCard).toBe(true)
    store.dispatch('setRoadCardResolved', false)
    expect(store.state.resolvedRoadCard).toBe(false)
    expect(store.state.cardsLeft).toBe(50)
    expect(store.state.cardsLeftInBlock).toBe(10)
    store.dispatch('setRoadCardResolved', true)
    expect(store.state.resolvedRoadCard).toBe(true)
    expect(store.state.cardsLeft).toBe(49)
    expect(store.state.cardsLeftInBlock).toBe(9)
  })

  test('updates "cardsLeftInBlock" and "foodRequired" when "setCurrentRoadCard" is dispatched and "cardsLeftInBlock" is 0', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    store.state.cardsLeftInBlock = 1
    expect(store.state.cardsLeftInBlock).toBe(1)
    store.dispatch('setRoadCardResolved', true)
    expect(store.state.cardsLeftInBlock).toBe(10)
    expect(store.state.foodRequired).toBe(true)
  })

  test('updates "winner" and "message" when "setCurrentRoadCard" is dispatched and "cardsLeft" is 0', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    store.state.cardsLeft = 1
    expect(store.state.cardsLeft).toBe(1)
    store.dispatch('setRoadCardResolved', true)
    expect(store.state.winner).toBe(true)
    expect(store.state.message).toBe('You win! Congrats')
  })

  test('updates "playerSupplyCards" when "removeUsedSupply" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    store.state.playerSupplyCards = [
      { type: 'Ammo' },
      { type: 'Health' },
      { type: 'Molotov' }
    ]
    store.dispatch('removeUsedSupply', 1)
    expect(store.state.playerSupplyCards).toMatchObject([
      { type: 'Ammo' },
      { type: 'Molotov' }
    ])
  })

  test('updates "message" when "updateMessage" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    let newMessage = 'This is a new messgae'
    expect(store.state.message).toBe('Start the game by dealing supply cards')
    store.dispatch('updateMessage', newMessage)
    expect(store.state.message).toBe(newMessage)
  })

  test('updates "looting" when "lootingStatus" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    expect(store.state.looting).toBe(false)
    store.dispatch('lootingStatus', true)
    expect(store.state.looting).toBe(true)
    store.dispatch('lootingStatus', false)
    expect(store.state.looting).toBe(false)
  })

  test('updates "inLootAction" when "setLootActionStatus" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    expect(store.state.inLootAction).toBe(false)
    store.dispatch('setLootActionStatus', true)
    expect(store.state.inLootAction).toBe(true)
    store.dispatch('setLootActionStatus', false)
    expect(store.state.inLootAction).toBe(false)
  })

  test('updates "currentLootCard" when "setCurrentLootingCard" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    let lootCard = {
      type: 'Single Zombie',
      melee: 4,
      ammo: 2,
      hitPoints: 1
    }
    store.dispatch('setCurrentLootingCard', lootCard)
    expect(store.state.currentLootCard).toMatchObject(lootCard)
  })

  test('updates "cardsLeft" and "cardsLeftInBlock" when "addTwoCards" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    expect(store.state.cardsLeft).toBe(50)
    expect(store.state.cardsLeftInBlock).toBe(10)
    store.dispatch('addTwoCards')
    expect(store.state.cardsLeft).toBe(52)
    expect(store.state.cardsLeftInBlock).toBe(12)
  })

  test('updates "foodRequired" when "foodRequiredStatus" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    expect(store.state.foodRequired).toBe(false)
    store.dispatch('foodRequiredStatus', true)
    expect(store.state.foodRequired).toBe(true)
    store.dispatch('foodRequiredStatus', false)
    expect(store.state.foodRequired).toBe(false)
  })

  test('updates "playerSupplyCards" when "removeUsedSupply" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    store.state.playerSupplyCards = [
      { type: 'Ammo' },
      { type: 'Health' },
      { type: 'Molotov' }
    ]
    store.dispatch('removeUsedSupply', 1)
    expect(store.state.playerSupplyCards).toMatchObject([
      { type: 'Ammo' },
      { type: 'Molotov' }
    ])
  })

  test('updated "lootCards" when "removeUsedLootCard" is dispatched', () => {
    const store = new Vuex.Store(cloneDeep(storeConfig))
    expect(store.state.lootCards).toMatchObject(lootCards)
    store.dispatch('removeUsedLootCard', 0)
    expect(store.state.lootCards).toMatchObject([
      {
        type: 'Single Zombie',
        melee: 4,
        ammo: 2,
        hitPoints: 1
      },
      {
        type: 'Single Zombie',
        melee: 4,
        ammo: 2,
        hitPoints: 1
      },
      {
        type: 'Single Zombie',
        melee: 4,
        ammo: 2,
        hitPoints: 1
      },
      {
        type: 'Single Zombie',
        melee: 4,
        ammo: 2,
        hitPoints: 1
      },
      {
        type: 'Single Zombie',
        melee: 4,
        ammo: 2,
        hitPoints: 1
      },
      {
        type: 'Single Zombie',
        melee: 4,
        ammo: 2,
        hitPoints: 1
      },
      {
        type: 'Single Zombie',
        melee: 4,
        ammo: 2,
        hitPoints: 1
      },
      {
        type: 'Single Zombie',
        melee: 4,
        ammo: 2,
        hitPoints: 1
      },
      {
        type: 'Single Zombie',
        melee: 4,
        ammo: 2,
        hitPoints: 1
      },
      {
        type: 'Single Zombie',
        melee: 4,
        ammo: 2,
        hitPoints: 1
      },
      {
        type: 'Single Zombie',
        melee: 4,
        ammo: 2,
        hitPoints: 1
      },
      {
        type: 'Double Zombie',
        melee: 5,
        ammo: 3,
        hitPoints: 1
      },
      {
        type: 'Double Zombie',
        melee: 5,
        ammo: 3,
        hitPoints: 1
      },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Supply' },
      { type: 'Food' },
      { type: 'Food' },
      { type: 'Food' },
      { type: 'Food' },
      {
        type: 'Special',
        item: 'Chainsaw'
      },
      {
        type: 'Special',
        item: 'Flame Thrower'
      },
      {
        type: 'Special',
        item: 'Minigun'
      },
      {
        type: 'Special',
        item: 'Grenade'
      },
      {
        type: 'Special',
        item: 'Bazooka'
      }
    ])
  })
})
