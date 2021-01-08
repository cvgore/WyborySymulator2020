<template>
  <section class="nav-wrapper">
    <router-link to="/" class="logo">
      <Logo />
    </router-link>
    <div class="head-wrapper">
      <section class="container">
        <router-link to="/log-on" class="log-on">Register / Log in</router-link>
        <router-link to="/creator" class="box-creator"> Create own survey </router-link>
      </section>
    </div>
  </section>
</template>

<script>
import NavigationItem from '@/components/Navigation/NavigationItems/NavigationItem/NavigationItem.vue';
import Logo from '../../UI/Logo';
export default {
  name: 'NavigationItems',
  components: { NavigationItem, Logo },
};
</script>

<style scoped>
.nav-wrapper {
  background-color: hsl(0, 0%, 100%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.4);
  font-family: 'Montserrat', sans-serif;
}

.head-wrapper {
  grid-column: 3/4;
  justify-self: flex-end;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}
.log-on {
  text-transform: uppercase;
  padding: 0 20px;
  color: black;
}
.logo {
  text-decoration: none;
  color:black;
  grid-column: 1/2;
}
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.container a {
  text-decoration: none;
}
.box-creator {
  color: white;
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 0 50px;
  height: 100%;
  background-color: hsl(240, 1%, 19%);
}

@media (min-width: 500px) {
  .nav-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    justify-items: center;
    align-items: center;
    height: 80px;
  }
  .head-wrapper {
    flex-direction: row;
  }
  .container {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
}

@media (min-width: 1500px) {
  .logo {
    grid-column: 2/3;
  }
}
</style>
