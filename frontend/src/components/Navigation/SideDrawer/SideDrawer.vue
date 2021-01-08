<template>
  <Backdrop
    :show="isOpen"
    :close="closed"
  />
  <section
    class="sideDrawer"
    :class="isOpen ? 'open' : 'close'"
  >
      <nav>
        <NavigationItems/>
      </nav>
  </section>
</template>

<script>
import NavigationItems from '@/components/Navigation/NavigationItems/NavigationItems.vue';
import Backdrop from '@/components/UI/Backdrop.vue';

export default {
  name: 'SideDrawer',
  components: {
    Backdrop,
    NavigationItems,
  },
  props: {
    closed: Function,
    isOpen: Boolean,
  },
};
</script>

<style scoped>
.sideDrawer {
  position: fixed;
  width: 280px;
  max-width: 70%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  background-color: white;
  padding: 32px 16px;
  box-sizing: border-box;
  transition: transform 0.3s ease-out;
}

@media (min-width: 500px) {
  .sideDrawer {
    display: none;
  }
}

.open {
  transform: translateX(0);
}

.close {
  transform: translateX(-100%);
}
</style>
