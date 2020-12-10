<template>
  <header class="Toolbar">
    <DrawerToggle :clicked="drawerToggleClicked"/>
    <nav class="DesktopOnly">
      <NavigationItems/>
    </nav>
  </header>
</template>

<script>
import NavigationItems from '@/components/Navigation/NavigationItems/NavigationItems.vue';
import DrawerToggle from '@/components/Navigation/SideDrawer/DrawerToggle/DrawerToggle.vue';

export default {
  name: 'Toolbar',
  components: {
    NavigationItems,
    DrawerToggle,
  },
  props: {
    drawerToggleClicked: Function,
  },
};
</script>

<style scoped>
.Toolbar {
  padding: 10px;
  background-color: hsl(29, 40%, 20%);
  color:white;
}

@media (max-width: 499px) {
  .DesktopOnly {
    width: 0;
    height: 0;
    visibility: hidden;
  }
}
</style>
