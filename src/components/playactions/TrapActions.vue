<template>
  <div class="buttons-container trap">
    <button>Use {{ currentRoadCard.supply }}</button>
  </div>
</template>

<script>
export default {
  name: 'TrapActions',
  props: {
    currentCard: {
      type: Object
    }
  }
}
</script>

<style scoped></style>
