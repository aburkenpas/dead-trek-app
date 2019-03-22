<template>
  <div class="buttons-container hunting">
    <button>Use Ammo To Hunt</button>
    <button>Skip Hunting</button>
  </div>
</template>

<script>
export default {
  name: 'HuntingActions',
  props: {
    currentCard: {
      type: Object
    }
  }
}
</script>

<style scoped></style>
