<template>
  <div class="game-buttons">
    <button
      v-if="
        (currentRoadCard.type == 'Start' || resolvedRoadCard == true) &&
          !loser &&
          !foodRequired &&
          !winner
      "
      @click="playRoadCard"
    >
      Play Road Card
    </button>
    <StoreActions
      v-if="currentRoadCard.type == 'Store' && resolvedRoadCard == false"
    />
    <FightActions
      v-else-if="
        (currentRoadCard.type == 'Horde' && resolvedRoadCard == false) ||
          (currentRoadCard.type == 'Boss' && resolvedRoadCard == false)
      "
    />
    <BridgeDownActions v-else-if="currentRoadCard.type == 'Bridge Down'" />
    <TrapActions v-else-if="currentRoadCard.type == 'Trap'" />
    <SupplyCacheActions v-else-if="currentRoadCard.type == 'Supply Cache'" />
    <SurvivorActions v-else-if="currentRoadCard.type == 'Survivors'" />
    <HuntingActions v-else-if="currentRoadCard.type == 'Hunting'" />
    <button v-if="loser || winner" @click="playAgain">Play agian</button>
    <button v-if="foodRequired" @click="useFood">Use Food</button>
  </div>
</template>

<script>
import StoreActions from './playactions/StoreActions.vue'
import FightActions from './playactions/FightActions.vue'
import BridgeDownActions from './playactions/BridgeDownActions.vue'
import TrapActions from './playactions/TrapActions.vue'
import SupplyCacheActions from './playactions/SupplyCacheActions.vue'
import SurvivorActions from './playactions/SurvivorActions.vue'
import HuntingActions from './playactions/HuntingActions.vue'
import { mapState } from 'vuex'

export default {
  name: 'GameButtons',
  components: {
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
    }
  },
  data: function() {
    return {
      currentLootCard: {
        type: null
      },
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
        { type: 'Store', events: 4 },
        // Small Horde
        {
          type: 'Horde',
          size: 'Small',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 1
        },
        {
          type: 'Horde',
          size: 'Small',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 1
        },
        // Small Unskipable Horde
        {
          type: 'Horde',
          size: 'Small',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 1
        },
        {
          type: 'Horde',
          size: 'Small',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 1
        },
        // // Small Unskipable Horde
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
        // Medium Horde
        {
          type: 'Horde',
          size: 'Medium',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 2
        },
        {
          type: 'Horde',
          size: 'Medium',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 2
        },
        {
          type: 'Horde',
          size: 'Medium',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 2
        },
        {
          type: 'Horde',
          size: 'Medium',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 2
        },
        {
          type: 'Horde',
          size: 'Medium',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 2
        },
        // Large Horde
        {
          type: 'Horde',
          size: 'Large',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 3
        },
        {
          type: 'Horde',
          size: 'Large',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 3
        },
        {
          type: 'Horde',
          size: 'Large',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 3
        },
        {
          type: 'Horde',
          size: 'Large',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 3
        },
        {
          type: 'Horde',
          size: 'Large',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 3
        },
        // Bridge Down
        { type: 'Bridge Down' },
        { type: 'Bridge Down' },
        { type: 'Bridge Down' },
        { type: 'Bridge Down' },
        { type: 'Bridge Down' },
        // Trap
        { type: 'Trap', supply: 'Food' },
        { type: 'Trap', supply: 'Food' },
        { type: 'Trap', supply: 'Health' },
        { type: 'Trap', supply: 'Health' },
        { type: 'Trap', supply: 'Health' },
        // Supply Cache
        { type: 'Supply Cache' },
        { type: 'Supply Cache' },
        { type: 'Supply Cache' },
        { type: 'Supply Cache' },
        { type: 'Supply Cache' },
        { type: 'Supply Cache' },
        // Survivors
        { type: 'Survivors' },
        { type: 'Survivors' },
        { type: 'Survivors' },
        { type: 'Survivors' },
        { type: 'Survivors' },
        // Hunting
        { type: 'Hunting' },
        { type: 'Hunting' },
        { type: 'Hunting' },
        { type: 'Hunting' },
        { type: 'Hunting' },
        { type: 'Hunting' },
        // Boss
        {
          type: 'Boss',
          name: 'Machette',
          melee: 6,
          ammo: 5,
          molotov: 3,
          hitPoints: 1,
          specialExclude: 'Chainsaw'
        },
        {
          type: 'Boss',
          name: 'Armoured',
          melee: 6,
          ammo: 8,
          molotov: 3,
          hitPoints: 1,
          specialExclude: 'Mini Gun'
        },
        {
          type: 'Boss',
          name: 'Mutated',
          melee: 5,
          ammo: 5,
          molotov: 3,
          hitPoints: 1,
          specialExclude: 'Grenade'
        },
        {
          type: 'Boss',
          name: 'Road Warrior',
          melee: 7,
          ammo: 5,
          molotov: 3,
          hitPoints: 1,
          specialExclude: 'Chainsaw'
        },
        {
          type: 'Boss',
          name: 'Fire Zombie',
          melee: 7,
          ammo: 5,
          molotov: 8,
          hitPoints: 1,
          specialExclude: 'Flamethrower'
        },
        {
          type: 'Boss',
          name: 'Bear',
          melee: 8,
          ammo: 5,
          molotov: 3,
          hitPoints: 1,
          specialExclude: 'Bazoka'
        }
      ]
    }
  },
  computed: mapState({
    currentRoadCard: state => state.currentRoadCard,
    resolvedRoadCard: state => state.resolvedRoadCard,
    looting: state => state.looting,
    loser: state => state.loser,
    winner: state => state.winner,
    foodRequired: state => state.foodRequired,
    playerSupplyCards: state => state.playerSupplyCards
  }),
  methods: {
    playRoadCard() {
      let roadCard
      let roadCardCount = this.roadCards.length - 1
      let randomNumber = this.getRandomInt(0, roadCardCount)
      let randomRoadCard = this.roadCards[randomNumber]
      this.roadCards.splice(randomNumber, 1)
      roadCard = randomRoadCard

      // Set state
      this.setMessage(roadCard)
      this.$store.dispatch('setRoadCardResolved', false)
      this.$store.dispatch('setCurrentRoadCard', roadCard)
    },
    setMessage(card) {
      let message
      let cardType = card.type
      if (cardType == 'Horde' || cardType == 'Boss') {
        message = `Oh no it's a ${cardType} with ${
          card.hitPoints
        } hitpoints! Chose your attack style`
      } else if (cardType == 'Store') {
        message = `Look a store with ${
          card.events
        } events!  Maybe we can find some supplies`
      } else if (cardType == 'Bridge Down') {
        message = `Shoot!  Looks like we are going to have to go around`
      } else if (cardType == 'Trap') {
        message = `It's a trap!  Use a supply to get out!`
      } else if (cardType == 'Supply Cache') {
        message = `Sweet free stuff!  Collet two supplies`
      } else if (cardType == 'Survivors') {
        message = `Survivors! Hopefully they are friendly.`
      } else if (cardType == 'Hunting') {
        message = `Look a deer! Maybe we can get some food.`
      }

      this.$store.dispatch('updateMessage', message)
    },
    playAgain() {
      // Find a more eligant solution if possible
      location.reload()
    },
    useFood() {
      let message = `Soylent yum!  Play next Road card`

      // Find ammo in playerhand
      let cardIndex = this.playerSupplyCards
        .map(function(e) {
          return e.type
        })
        .indexOf('Food', 'Hunting')

      if (cardIndex != -1) {
        // Set state
        this.$store.dispatch('removeUsedSupply', cardIndex)
        this.$store.dispatch('foodRequiredStatus', false)
        this.$store.dispatch('updateMessage', message)
      } else {
        this.$store.dispatch('foodRequiredStatus', false)
        this.$store.dispatch('loser')
      }
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
