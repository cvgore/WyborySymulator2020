<template>
  <header class="Toolbar">
    <DrawerToggle :clicked="drawerToggleClicked" />
    <Logo />
    <nav class="DesktopOnly">
      <NavigationItems />
    </nav>
  </header>
</template>

<script>
import NavigationItems from '@/components/Navigation/NavigationItems/NavigationItems.vue';
import DrawerToggle from '@/components/Navigation/SideDrawer/DrawerToggle/DrawerToggle.vue';
import Logo from '@/components/UI/Logo';
export default {
  name: 'Toolbar',
  components: {
    NavigationItems,
    DrawerToggle,
    Logo
  },
  props: {
    drawerToggleClicked: Function,
  },
};
</script>

<style scoped>
@media (max-width: 499px) {
  .Toolbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    box-shadow: 3px -3px 10px black;
    background-color: white;
  }
  .DesktopOnly {
    width: 0;
    height: 0;
    visibility: hidden;
  }
}
</style>
