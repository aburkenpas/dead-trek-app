<template>
  <div class="cards-left">
    Cards left: {{ cardsLeft }}
    <br />
    Cards left in block: {{ cardsLeftInBlock }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CardsLeft',
  computed: mapState({
    cardsLeft: state => state.cardsLeft,
    cardsLeftInBlock: state => state.cardsLeftInBlock
  })
}
</script>

<style scoped>
.cards-left {
  position: relative;
  color: white;
}
</style>
