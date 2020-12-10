<template>
  <section class="container">
    <p>Projekt życia logo</p>
    <nav class="links">
      <NavigationItem :link="'/'">Home</NavigationItem>
      <NavigationItem :link="'/surveys'">Surveys</NavigationItem>
      <NavigationItem :link="'/login'">Login</NavigationItem>
      <NavigationItem :link="'/register'">Register</NavigationItem>
    </nav>
  </section>
</template>

<script>
import NavigationItem from '@/components/Navigation/NavigationItems/NavigationItem/NavigationItem.vue';

export default {
  name: 'NavigationItems',
  components: { NavigationItem },
};
</script>

<style scoped>
.container {
  display: flex;
}
@media (min-width: 500px) {
  .container {
    font-size: 21px;
    padding: 50px 20px;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
  .links {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
  }
}
</style>
