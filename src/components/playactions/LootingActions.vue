<template>
  <div class="buttons-container looting-buttons">
    <div v-if="!looting">
      <button @click="playStoreEvent">Play Looting Event</button>
      <button @click="skipping">Leave Store</button>
    </div>
    <FightActions
      v-if="
        currentLootingCard.type == 'Single Zombie' ||
          currentLootingCard.type == 'Double Zombie'
      "
    />
  </div>
</template>

<script>
import FightActions from './FightActions.vue'
import { mapState } from 'vuex'

export default {
  name: 'StoreActions',
  components: {
    FightActions
  },
  data: function() {
    return {
      lootingResolved: false,
      currentLootingCard: {
        type: 'Start'
      },
      lootingCards: [
        // Single Zombies
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        {
          type: 'Single Zombie',
          melee: this.storeMelee1,
          ammo: this.storeAmmo1
        },
        // Double Zombies
        {
          type: 'Double Zombie',
          melee: this.storeMelee2,
          ammo: this.storeAmmo2
        },
        {
          type: 'Double Zombie',
          melee: this.storeMelee2,
          ammo: this.storeAmmo2
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
          item: 'Chainsaw'
        },
        {
          type: 'Special',
          item: 'Flamethrower'
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
          item: 'Bazoka'
        }
      ]
    }
  },
  props: {
    currentCard: {
      type: Object
    },
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
  computed: mapState({
    currentLootCard: state => state.currentLootCard,
    looting: state => state.looting
  }),
  methods: {
    playStoreEvent: function() {
      let lootingCardCount = this.lootingCards.length - 1
      let randomNumber = this.getRandomInt(1, lootingCardCount)
      let randomLootingCard = this.lootingCards[randomNumber]
      this.lootingCards.splice(randomNumber, 1)
      this.currentLootingCard = randomLootingCard
      this.$store.dispatch('setCurrentLootingCard', this.currentLootingCard)
    },
    skipping: function() {
      this.$store.dispatch('setRoadCardResolved', true)
    }
  }
}
</script>

<style scoped></style>
