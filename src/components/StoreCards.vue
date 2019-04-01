<template>
  <div class="playable-store-cards">
    <img
      v-if="inLootAction == false"
      src="../assets/images/cards/loot/store-card-back.png"
      alt
    />
    <img
      v-if="currentLootCard.type == 'Single Zombie'"
      src="../assets/images/cards/loot/store-single-zombie.png"
      alt
    />
    <img
      v-if="currentLootCard.type == 'Double Zombie'"
      src="../assets/images/cards/loot/store-double-zombie.png"
      alt
    />
    <img
      v-if="currentLootCard.type == 'Supply'"
      src="../assets/images/cards/loot/store-supply.png"
      alt
    />
    <img
      v-if="currentLootCard.type == 'Food'"
      src="../assets/images/cards/loot/food.png"
      alt
    />
    <img
      v-if="
        currentLootCard.type == 'Special' && currentLootCard.item == 'Chainsaw'
      "
      src="../assets/images/cards/loot/chainsaw.png"
      alt
    />
    <img
      v-if="
        currentLootCard.type == 'Special' &&
          currentLootCard.item == 'Flame Thrower'
      "
      src="../assets/images/cards/loot/flame-thrower.png"
      alt
    />
    <img
      v-if="
        currentLootCard.type == 'Special' && currentLootCard.item == 'Minigun'
      "
      src="../assets/images/cards/loot/minigun.png"
      alt
    />
    <img
      v-if="
        currentLootCard.type == 'Special' && currentLootCard.item == 'Grenade'
      "
      src="../assets/images/cards/loot/grenade.png"
      alt
    />
    <img
      v-if="
        currentLootCard.type == 'Special' && currentLootCard.item == 'Bazooka'
      "
      src="../assets/images/cards/loot/bazooka.png"
      alt
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StoreCards',
  computed: mapState({
    currentLootCard: state => state.currentLootCard,
    looting: state => state.looting,
    inLootAction: state => state.inLootAction
  })
}
</script>

<style scoped>
.playable-store-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 320px;
  font-size: 35px;
}
</style>
