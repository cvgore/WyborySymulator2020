<template>
  <div class="DrawerToggle" @click="clicked">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'DrawerToggle',
  props: {
    clicked: Function,
  },
};
</script>

<style scoped>
.DrawerToggle {
  width: 40px;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;
}

.DrawerToggle div {
  width: 90%;
  height: 3px;
  margin: 4px;
  background-color: hsl(0, 0%, 0%);
}

@media (min-width: 500px) {
  .DrawerToggle {
    display: none;
  }
}
</style>
