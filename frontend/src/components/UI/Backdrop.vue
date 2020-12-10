<template>
  <div v-if="show" class="backdrop" @click="close"/>
</template>

<script>
export default {
  name: 'Backdrop',
  props: {
    show: Boolean,
    close: Function,
  },
};
</script>

<style scoped>
.backdrop {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
