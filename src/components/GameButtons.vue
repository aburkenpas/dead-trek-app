<template>
  <div class="game-buttons">
    <button
      v-if="currentRoadCard.type == 'Start' || resolvedRoadCard == true"
      @click="playRoadCard"
    >Play Road Card</button>
    <LootingActions
      v-if="isLooting"
      :currentCard="currentRoadCard"
      @skip-resolved-card="cardIsResolved"
      @current-looting-card="passCurrentLootCard"
    />
    <StoreActions
      :currentCard="currentRoadCard"
      v-if="
        currentRoadCard.type == 'Store' &&
          resolvedRoadCard == false &&
          isLooting == false
      "
      @skip-resolved-card="cardIsResolved"
      @looting="isGoingToLooting"
    />
    <FightActions
      :currentCard="currentRoadCard"
      :playerHand="playerHand"
      v-else-if="
        (currentRoadCard.type == 'Horde' && resolvedRoadCard == false) ||
          (currentRoadCard.type == 'Boss' && resolvedRoadCard == false)
      "
      @resolved-card="cardIsResolved"
    />
    <BridgeDownActions
      :currentCard="currentRoadCard"
      v-else-if="currentRoadCard.type == 'Bridge Down'"
    />
    <TrapActions :currentCard="currentRoadCard" v-else-if="currentRoadCard.type == 'Trap'"/>
    <SupplyCacheActions
      :currentCard="currentRoadCard"
      v-else-if="currentRoadCard.type == 'Supply Cache'"
    />
    <SurvivorActions
      :currentCard="currentRoadCard"
      v-else-if="currentRoadCard.type == 'Survivors'"
    />
    <HuntingActions :currentCard="currentRoadCard" v-else-if="currentRoadCard.type == 'Hunting'"/>
  </div>
</template>

<script>
import LootingActions from './playactions/LootingActions.vue'
import StoreActions from './playactions/StoreActions.vue'
import FightActions from './playactions/FightActions.vue'
import BridgeDownActions from './playactions/BridgeDownActions.vue'
import TrapActions from './playactions/TrapActions.vue'
import SupplyCacheActions from './playactions/SupplyCacheActions.vue'
import SurvivorActions from './playactions/SurvivorActions.vue'
import HuntingActions from './playactions/HuntingActions.vue'

export default {
  name: 'GameButtons',
  components: {
    LootingActions,
    StoreActions,
    FightActions,
    BridgeDownActions,
    TrapActions,
    SupplyCacheActions,
    SurvivorActions,
    HuntingActions
  },
  props: {
    hordeMelee: {
      type: Number,
      default: 6
    },
    hordeAmmo: {
      type: Number,
      default: 4
    },
    hordeMolotov: {
      type: Number,
      default: 2
    },
    playerHand: {
      type: Array
    }
  },
  data: function() {
    return {
      currentRoadCard: {
        type: 'Start'
      },
      currentLootCard: {
        type: null
      },
      resolvedRoadCard: false,
      isLooting: false,
      roadCards: [
        { type: 'Store', events: 2 },
        { type: 'Store', events: 2 },
        { type: 'Store', events: 2 },
        { type: 'Store', events: 2 },
        // # Medium Store
        { type: 'Store', events: 3 },
        { type: 'Store', events: 3 },
        { type: 'Store', events: 3 },
        { type: 'Store', events: 3 },
        { type: 'Store', events: 3 },
        { type: 'Store', events: 3 },
        { type: 'Store', events: 3 },
        { type: 'Store', events: 3 },
        { type: 'Store', events: 3 },
        // # Large Store
        { type: 'Store', events: 4 },
        { type: 'Store', events: 4 },
        { type: 'Store', events: 4 },
        { type: 'Store', events: 4 },
        { type: 'Store', events: 4 },
        { type: 'Store', events: 4 }
        // // # Small Horde
        // {
        //   type: 'Horde',
        //   size: 'Small',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 1
        // },
        // {
        //   type: 'Horde',
        //   size: 'Small',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 1
        // },
        // // # Small Unskipable Horde

        // {
        //   type: 'Horde',
        //   size: 'Small Unskipable',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 1
        // },
        // {
        //   type: 'Horde',
        //   size: 'Small Unskipable',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 1
        // },
        // // # Medium Horde
        // {
        //   type: 'Horde',
        //   size: 'Medium',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 2
        // },
        // {
        //   type: 'Horde',
        //   size: 'Medium',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 2
        // },
        // {
        //   type: 'Horde',
        //   size: 'Medium',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 2
        // },
        // {
        //   type: 'Horde',
        //   size: 'Medium',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 2
        // },
        // {
        //   type: 'Horde',
        //   size: 'Medium',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 2
        // },
        // // # Large Horde

        // {
        //   type: 'Horde',
        //   size: 'Large',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 3
        // },
        // {
        //   type: 'Horde',
        //   size: 'Large',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 3
        // },
        // {
        //   type: 'Horde',
        //   size: 'Large',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 3
        // },
        // {
        //   type: 'Horde',
        //   size: 'Large',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 3
        // },
        // {
        //   type: 'Horde',
        //   size: 'Large',
        //   melee: this.hordeMelee,
        //   ammo: this.hordeAmmo,
        //   molotov: this.hordeMolotov,
        //   hitPoints: 3
        // }
        // // # Bridge Down
        // { type: 'Bridge Down' },
        // { type: 'Bridge Down' },
        // { type: 'Bridge Down' },
        // { type: 'Bridge Down' },
        // { type: 'Bridge Down' },
        // // # Trap
        // { type: 'Trap', supply: 'Food' },
        // { type: 'Trap', supply: 'Food' },
        // { type: 'Trap', supply: 'Health' },
        // { type: 'Trap', supply: 'Health' },
        // { type: 'Trap', supply: 'Health' },
        // // # Supply Cache
        // { type: 'Supply Cache' },
        // { type: 'Supply Cache' },
        // { type: 'Supply Cache' },
        // { type: 'Supply Cache' },
        // { type: 'Supply Cache' },
        // { type: 'Supply Cache' },
        // // # Survivors
        // { type: 'Survivors' },
        // { type: 'Survivors' },
        // { type: 'Survivors' },
        // { type: 'Survivors' },
        // { type: 'Survivors' },
        // // # Hunting
        // { type: 'Hunting' },
        // { type: 'Hunting' },
        // { type: 'Hunting' },
        // { type: 'Hunting' },
        // { type: 'Hunting' },
        // { type: 'Hunting' },
        // // # Boss

        // {
        //   type: 'Boss',
        //   name: 'Machette',
        //   melee: 6,
        //   ammo: 5,
        //   molotov: 3,
        //   hitPoints: 1,
        //   specialExclude: 'Chainsaw'
        // },
        // {
        //   type: 'Boss',
        //   name: 'Armoured',
        //   melee: 6,
        //   ammo: 8,
        //   molotov: 3,
        //   hitPoints: 1,
        //   specialExclude: 'Mini Gun'
        // },
        // {
        //   type: 'Boss',
        //   name: 'Mutated',
        //   melee: 5,
        //   ammo: 5,
        //   molotov: 3,
        //   hitPoints: 1,
        //   specialExclude: 'Grenade'
        // },
        // {
        //   type: 'Boss',
        //   name: 'Road Warrior',
        //   melee: 7,
        //   ammo: 5,
        //   molotov: 3,
        //   hitPoints: 1,
        //   specialExclude: 'Chainsaw'
        // },
        // {
        //   type: 'Boss',
        //   name: 'Fire Zombie',
        //   melee: 7,
        //   ammo: 5,
        //   molotov: 8,
        //   hitPoints: 1,
        //   specialExclude: 'Flamethrower'
        // },
        // {
        //   type: 'Boss',
        //   name: 'Bear',
        //   melee: 8,
        //   ammo: 5,
        //   molotov: 3,
        //   hitPoints: 1,
        //   specialExclude: 'Bazoka'
        // }
      ]
    }
  },
  methods: {
    playRoadCard: function() {
      let roadCardCount = this.roadCards.length - 1
      let randomNumber = this.getRandomInt(0, roadCardCount)
      let randomRoadCard = this.roadCards[randomNumber]
      this.roadCards.splice(randomNumber, 1)
      this.currentRoadCard = randomRoadCard
      this.resolvedRoadCard = false
      this.$emit('current-card', this.currentRoadCard)
    },
    cardIsResolved: function(resolved) {
      this.resolvedRoadCard = resolved
      return this.resolvedRoadCard
    },
    isGoingToLooting: function(looting) {
      this.isLooting = looting
      this.$emit('is-looting', this.isLooting)
    },
    passCurrentLootCard: function(lootCard) {
      console.log('Pass Current Loot Card')
      this.currentLootCard = lootCard
      this.$emit('current-looting-card', this.currentLootCard)
    }
  }
}
</script>

<style scoped>
.game-buttons {
  margin: 50px 0;
}
.game-buttons .buttons-container {
  display: flex;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
}
</style>
