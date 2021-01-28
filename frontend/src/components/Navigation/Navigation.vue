<template>
  <nav class="navbar has-shadow has-background-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand is-mobile">
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start has-text-weight-bold">
        <router-link to="/" class="navbar-item has-text-white" active-class="has-background-link">
          Lista ankiet
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/forms/log-in" class="button is-primary" replace> Zaloguj się </router-link>
            <router-link to="/creator" class="button is-warning" replace> Stwórz nową ankiete </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>
