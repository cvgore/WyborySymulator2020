<template>
  <section class="container">
    <p>Projekt życia logo</p>
    <section class="links">
      <div>
        <router-link to="/">Link</router-link>
      </div>
      <div>
        <router-link to="/1">Link</router-link>
      </div>
      <div>
        <router-link to="/2">Link</router-link>
      </div>
      <div>
        <router-link to="/3">Link</router-link>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
.container {
  display: grid;
  height: 250px;
  grid-template-columns: 1fr 3fr;
  justify-items: center;
  align-items: center;
  padding: 80px 150px;
}

.links {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
}

.links div {
  margin: 0 20px;
}
.links div > a {
  color:black;
  text-decoration: none;
}
.links div > a.router-link-exact-active {
  color: hsl(231, 69%, 50%);
}
</style>
