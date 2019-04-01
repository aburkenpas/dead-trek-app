<template>
  <div class="road-card">
    <div class="current-card">
      <img
        v-if="currentRoadCard.type == 'Store' && currentRoadCard.events == 2"
        src="../assets/images/cards/road/small-store.png"
        alt="Small store card"
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Store' && currentRoadCard.events == 3
        "
        src="../assets/images/cards/road/medium-store.png"
        alt="Medium store card"
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Store' && currentRoadCard.events == 4
        "
        src="../assets/images/cards/road/large-store.png"
        alt="Large store card"
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Horde' && currentRoadCard.size == 'Small'
        "
        src="../assets/images/cards/road/small-horde.png"
        alt="Small horde card"
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Horde' && currentRoadCard.size == 'Medium'
        "
        src="../assets/images/cards/road/medium-horde.png"
        alt="Medium horde card"
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Horde' && currentRoadCard.size == 'Large'
        "
        src="../assets/images/cards/road/large-horde.png"
        alt="Large horde card"
      >
      <img
        v-else-if="currentRoadCard.type == 'Bridge Down'"
        src="../assets/images/cards/road/bridge-down.png"
        alt="Bridge Down card"
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Trap' && currentRoadCard.supply == 'Food'
        "
        src="../assets/images/cards/road/trap-food.png"
        alt="Trap Food card"
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Trap' && currentRoadCard.supply == 'Health'
        "
        src="../assets/images/cards/road/trap-health.png"
        alt="Trap health card"
      >
      <img
        v-else-if="currentRoadCard.type == 'Supply Cache'"
        src="../assets/images/cards/road/supply-cache.png"
        alt="Supply Cache card"
      >
      <img
        v-else-if="currentRoadCard.type == 'Survivors'"
        src="../assets/images/cards/road/survivors.png"
        alt="Survivors card"
      >
      <img
        v-else-if="currentRoadCard.type == 'Hunting'"
        src="../assets/images/cards/road/hunting.png"
        alt="Hunting card"
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Boss' && currentRoadCard.name == 'Machette'
        "
        src="../assets/images/cards/road/boss-machette.png"
        alt="Boss Machette card"
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Boss' && currentRoadCard.name == 'Armoured'
        "
        src="../assets/images/cards/road/boss-armoured.png"
        alt="Boss Armoured card"
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Boss' && currentRoadCard.name == 'Mutated'
        "
        src="../assets/images/cards/road/boss-mutated.png"
        alt="Boss Mutated card"
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Boss' &&
            currentRoadCard.name == 'Road Warrior'
        "
        src="../assets/images/cards/road/boss-road-warrior.png"
        alt
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Boss' &&
            currentRoadCard.name == 'Fire Zombie'
        "
        src="../assets/images/cards/road/boss-fire-zombie.png"
        alt
      >
      <img
        v-else-if="
          currentRoadCard.type == 'Boss' && currentRoadCard.name == 'Bear'
        "
        src="../assets/images/cards/road/boss-bear.png"
        alt
      >
      <img
        v-else-if="currentRoadCard.type == 'Back'"
        src="../assets/images/cards/road/road-card-back.png"
        alt
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RoadCard',
  computed: mapState({
    currentRoadCard: state => state.currentRoadCard
  })
}
</script>

<style scoped>
.current-card {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 320px;
  font-size: 35px;
}
</style>
