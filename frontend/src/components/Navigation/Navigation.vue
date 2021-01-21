<template>
  <nav class="navbar has-background-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start ">
        <router-link to="/" class="navbar-item" active-class="has-background-white">
          Lista ankiet
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/forms/log-in" class="button is-primary">
              Log in
            </router-link>
            <router-link to="/creator" class="button is-warning">
              Stwórz nową ankiete
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
}
</script>
