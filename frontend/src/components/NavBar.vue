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
        <router-link class="login-btn" to="/login">Log in</router-link>
      </div>
      <div>
        <router-link class="register-btn" to="/register">Register</router-link>
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
  font-weight: bold;
  font-size: 1em;
  padding: 15px;
  color: #100303;
  text-decoration: none;
}

.links div > a.router-link-exact-active {
  color: hsl(0, 67%, 57%);
}

.login-btn,
.register-btn {
  border-radius: 5px;
  border: 1px solid hsl(30, 10%, 8%);

}

.login-btn:hover,
.register-btn:hover {
  color: hsl(0, 67%, 57%);
}

@media (min-width: 600px) {

}
</style>
