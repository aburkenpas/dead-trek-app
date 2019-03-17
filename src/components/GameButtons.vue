<template>
  <div class="game-buttons">
    <button
      v-if="currentRoadCard.type == 'Start' || resolvedRoadCard == true"
      @click="playRoadCard"
    >
      Play Road Card
    </button>
    <div
      class="buttons-container store-buttons"
      v-if="currentRoadCard.type == 'Store'"
    >
      <button>Loot Store</button>
      <button>Skip Store</button>
    </div>
    <div
      class="buttons-container fight-buttons"
      v-else-if="
        currentRoadCard.type == 'Horde' || currentRoadCard.type == 'Boss'
      "
    >
      <button>Melee Attack</button>
      <button>Ammo Attack</button>
      <button>Molotov Attack</button>
    </div>
    <div
      class="buttons-container bridge-down"
      v-else-if="currentRoadCard.type == 'Bridge Down'"
    >
      <button>Detour Add - Two Cards</button>
    </div>
    <div
      class="buttons-container trap"
      v-else-if="currentRoadCard.type == 'Trap'"
    >
      <button>Use {{ currentRoadCard.supply }}</button>
    </div>
    <div
      class="buttons-container supply-cache"
      v-else-if="currentRoadCard.type == 'Supply Cache'"
    >
      <button>Draw 2 Supply Cards</button>
    </div>
    <div
      class="buttons-container survivors"
      v-else-if="currentRoadCard.type == 'Survivors'"
    >
      <button>Trade 2 Supply Cards</button>
    </div>
    <div
      class="buttons-container survivors"
      v-else-if="currentRoadCard.type == 'Hunting'"
    >
      <button>Use Ammo To Hunt</button>
      <button>Skip Hunting</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameButtons',
  data: function() {
    return {
      currentRoadCard: {
        type: 'Start'
      },
      resolvedRoadCard: false,
      hordeMelee: 6,
      hordeAmmo: 4,
      hordeMolotov: 2,
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
        // # Small Horde
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
        // # Small Unskipable Horde

        {
          type: 'Horde',
          size: 'Small Unskipable',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 1
        },
        {
          type: 'Horde',
          size: 'Small Unskipable',
          melee: this.hordeMelee,
          ammo: this.hordeAmmo,
          molotov: this.hordeMolotov,
          hitPoints: 1
        },
        // # Medium Horde
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
        // # Large Horde

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
        // # Bridge Down
        { type: 'Bridge Down' },
        { type: 'Bridge Down' },
        { type: 'Bridge Down' },
        { type: 'Bridge Down' },
        { type: 'Bridge Down' },
        // # Trap
        { type: 'Trap', supply: 'Food' },
        { type: 'Trap', supply: 'Food' },
        { type: 'Trap', supply: 'Health' },
        { type: 'Trap', supply: 'Health' },
        { type: 'Trap', supply: 'Health' },
        // # Supply Cache
        { type: 'Supply Cache' },
        { type: 'Supply Cache' },
        { type: 'Supply Cache' },
        { type: 'Supply Cache' },
        { type: 'Supply Cache' },
        { type: 'Supply Cache' },
        // # Survivors
        { type: 'Survivors' },
        { type: 'Survivors' },
        { type: 'Survivors' },
        { type: 'Survivors' },
        { type: 'Survivors' },
        // # Hunting
        { type: 'Hunting' },
        { type: 'Hunting' },
        { type: 'Hunting' },
        { type: 'Hunting' },
        { type: 'Hunting' },
        { type: 'Hunting' },
        // # Boss

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
  methods: {
    playRoadCard: function() {
      let roadCardCount = this.roadCards.length - 1
      let randomNumber = this.getRandomInt(0, roadCardCount)
      let randomRoadCard = this.roadCards[randomNumber]
      this.roadCards.splice(randomNumber, 1)
      this.currentRoadCard = randomRoadCard
      this.$emit('current-card', this.currentRoadCard)
    },
    getRandomInt: function(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
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
