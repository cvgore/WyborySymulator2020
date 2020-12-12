<template>
  <section class="container">
    <p>Projekt życia logo</p>
    <nav class="links">
      <NavigationItem :link="'/surveys'">Surveys</NavigationItem>
      <NavigationItem :link="'/login'">Login</NavigationItem>
      <NavigationItem :link="'/register'">Register</NavigationItem>
      <NavigationItem :link="'/create-survey'" class="btn-srv ">Create New Survey</NavigationItem>
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
  margin: 0 50px;
  align-items: center;
}
@media (min-width: 500px) {
  .container {
    padding: 10px 20px;
    display: grid;
    grid-template-columns: 50% 500px;
    justify-content: center;
  }
  .btn-srv {
    padding: 25px 10px;
    height: 25px;
    border: 0;
    border-radius: 5px;
    background-color: #67a067;
    display: flex;
    align-items: center;
    transition: background-color .1s ease-in;
    cursor: pointer;
  }
  .btn-srv:hover{
    background-color: #66b866;
  }
  .links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
}
@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
    justify-items: center;
  }
  .links {
    padding: 0 30px;
    width: 100vw;
  }
  .container > p {
    display: none;
  }
}
</style>
