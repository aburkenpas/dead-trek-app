<template>
  <div class="loot-decision-buttons">
    <button v-if="!inLootAction && looting" @click="playStoreEvent">Play Looting Event</button>
    <button v-if="!inLootAction && looting && currentEvent > 0" @click="skipping">Leave Store</button>
    <FightActions
      v-if="
        (currentLootCard.type == 'Single Zombie' ||
          currentLootCard.type == 'Double Zombie') &&
          inLootAction == true
      "
      :currentEvent="currentEvent"
      :events="events"
    />
    <button
      v-else-if="currentLootCard.type == 'Supply' && inLootAction == true"
      @click="drawSupply"
    >Draw Supply Card</button>
    <button
      v-else-if="currentLootCard.type == 'Food' && inLootAction == true"
      @click="addLootToHand"
    >Collect Food</button>
    <button
      v-else-if="currentLootCard.type == 'Special' && inLootAction == true"
      @click="addLootToHand"
    >Collect Special</button>
  </div>
</template>

<script>
import FightActions from './FightActions.vue'
import { mapState } from 'vuex'

// Import data ( Maybe do this at some point )
// import lootCards from './data/loot-cards.json'

export default {
  name: 'StoreActions',
  components: {
    FightActions
  },
  data: function() {
    return {
      currentEvent: 0,
      lootingCards: [
        // Single Zombies
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1,
          hitPoints: 1
        },
        // Double Zombies
        {
          type: 'Double Zombie',
          melee: this.storeMelee2,
          ammo: this.storeAmmo2,
          hitPoints: 1
        },
        {
          type: 'Double Zombie',
          melee: this.storeMelee2,
          ammo: this.storeAmmo2,
          hitPoints: 1
        },
        // Supplies
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
        // Food
        { type: 'Food' },
        { type: 'Food' },
        { type: 'Food' },
        { type: 'Food' },
        // Special
        {
          type: 'Special',
          item: 'Chainsaw',
          image: require('../../assets/images/cards/loot/chainsaw.png')
        },
        {
          type: 'Special',
          item: 'Flame Thrower',
          image: require('../../assets/images/cards/loot/flame-thrower.png')
        },
        {
          type: 'Special',
          item: 'Minigun',
          image: require('../../assets/images/cards/loot/minigun.png')
        },
        {
          type: 'Special',
          item: 'Grenade',
          image: require('../../assets/images/cards/loot/grenade.png')
        },
        {
          type: 'Special',
          item: 'Bazooka',
          image: require('../../assets/images/cards/loot/bazooka.png')
        }
      ]
    }
  },
  props: {
    storeMelee1: {
      type: Number,
      default: 4
    },
    storeMelee2: {
      type: Number,
      default: 5
    },
    storeAmmo1: {
      type: Number,
      default: 2
    },
    storeAmmo2: {
      type: Number,
      default: 3
    }
  },
  computed: {
    events() {
      return this.currentRoadCard.events
    },
    ...mapState({
      currentRoadCard: state => state.currentRoadCard,
      currentLootCard: state => state.currentLootCard,
      looting: state => state.looting,
      inLootAction: state => state.inLootAction,
      supplyCards: state => state.supplyCards,
      playerSupplyCards: state => state.playerSupplyCards
    })
  },
  methods: {
    playStoreEvent() {
      let message

      // Iterate current event
      this.currentEvent++

      // Draw loot card
      let lootingCard = this.drawCard(1, this.lootingCards)

      let currentEventCard = lootingCard[0].type

      // Remove card from deck
      let cardIndex = this.lootingCards
        .map(function(e) {
          return e.type
        })
        .indexOf(currentEventCard)

      this.lootingCards.splice(cardIndex, 1)

      if (currentEventCard == 'Single Zombie') {
        message = `It's a zombie!`
      } else if (currentEventCard == 'Double Zombie') {
        message = `It's two zombies!`
      } else if (currentEventCard == 'Supply') {
        message = `Sweet a supply`
      } else if (currentEventCard == 'Food') {
        message = `Nice you found food`
      } else if (currentEventCard == 'Special') {
        message = `Awesome a special weapon`
      }

      // Set state of looting and current card
      this.$store.dispatch('updateMessage', message)
      this.$store.dispatch('setLootActionStatus', true)
      this.$store.dispatch('setCurrentLootingCard', lootingCard[0])
    },
    skipping() {
      // Set message
      let message = `Store skipped.  Play next Road card`

      // Set state status
      this.$store.dispatch('updateMessage', message)
      this.$store.dispatch('setRoadCardResolved', true)
      this.$store.dispatch('lootingStatus', false)
    },
    lootingEventsLeft() {
      return this.events - this.currentEvent
    },
    drawSupply() {
      // Draw supply card
      let supplyGained = this.drawCard(1, this.supplyCards)
      let cardName = supplyGained[0].type

      // Combine with current supplies (Mabye a better way for this)
      supplyGained.push.apply(supplyGained, this.playerSupplyCards)

      // Sort Cards
      supplyGained.sort((a, b) =>
        a.type > b.type ? 1 : b.type > a.type ? -1 : 0
      )

      // Set message
      let message = `You gained a ${cardName} card! Play or Skip next loot card.  Looting events left ${this.lootingEventsLeft()}`

      // Set state by updating supply cards and ending looting action
      this.$store.dispatch('supplyCardsDelt', supplyGained)
      this.$store.dispatch('setLootActionStatus', false)
      this.$store.dispatch('setCurrentLootingCard', 'Start Next Loot')
      if (this.currentEvent == this.events) {
        message = `You gained a ${cardName} card! Play next Road card.`
        this.$store.dispatch('setRoadCardResolved', true)
        this.$store.dispatch('lootingStatus', false)
      }
      this.$store.dispatch('updateMessage', message)
    },
    addLootToHand() {
      let itemGained = this.addToHand(
        this.currentLootCard,
        this.playerSupplyCards
      )

      // Set message
      let message = `You gained a ${
        this.currentLootCard.type
      } card! Play or Skip next loot card.  Looting events left ${this.lootingEventsLeft()}`

      // Update state of looting
      this.$store.dispatch('supplyCardsDelt', itemGained)
      this.$store.dispatch('setLootActionStatus', false)
      this.$store.dispatch('setCurrentLootingCard', 'Start Next Loot')
      if (this.currentEvent == this.events) {
        message = `You gained a ${
          this.currentLootCard.type
        } card! Play next Road card.`
        this.$store.dispatch('setRoadCardResolved', true)
        this.$store.dispatch('lootingStatus', false)
      }
      this.$store.dispatch('updateMessage', message)
    }
  }
}
</script>

<style scoped>
.loot-decision-buttons {
  display: flex;
  width: 100%;
}
</style>
