<template>
  <Toolbar :drawer-toggle-clicked="sideDrawerToggleHandler"/>
  <SideDrawer
    :closed="sideDrawerClosedHandler"
    :isOpen="showSideDrawer"
  />
  <main>
    <slot/>
  </main>
</template>

<script>
import SideDrawer from '@/components/Navigation/SideDrawer/SideDrawer.vue';
import Toolbar from '@/components/Navigation/Toolbar/Toolbar.vue';

export default {
  name: 'Layout',
  components: {
    SideDrawer,
    Toolbar,
  },
  data() {
    return {
      showSideDrawer: false,
    };
  },
  methods: {
    sideDrawerClosedHandler() {
      this.showSideDrawer = false;
    },
    sideDrawerToggleHandler() {
      this.showSideDrawer = !this.showSideDrawer;
    },
  },
};
</script>
