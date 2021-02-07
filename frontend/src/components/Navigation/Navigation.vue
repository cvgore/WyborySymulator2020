<template>
  <nav
    class="navbar has-shadow is-dark"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand is-mobile">
      <a
        role="button"
        class="navbar-burger"
        :class="{'is-active':showMobileNavbar}"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleMN"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active':showMobileNavbar}"
    >
      <div v-if="isAuth" class="navbar-start has-text-weight-bold">
        <router-link to="/" class="navbar-item has-text-dark" active-class="has-background-warning">
          Lista ankiet
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="isAuth"  class="navbar-item has-dropdown is-hoverable">
            <p class="navbar-link has-text-white is-size-4">
              Witaj, {{email}}
            </p>

            <div class="navbar-dropdown">
              <div @click="logOut" class="navbar-item d">
                Wyloguj się
              </div>
            </div>
          </div>
          <div class="buttons">
            <router-link v-if="!isAuth" to="/forms/log-in" class="button is-primary" replace> Zaloguj się </router-link>
            <router-link v-if="isAuth" to="/creator" class="button is-warning" replace> Stwórz nową ankiete </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: 'Navigation',
  data(){
    return {
      showMobileNavbar: false
    }
  },
  computed: {
    ...mapState('Auth',['isAuth','email']),
  },
  methods: {
    toggleMN(){
      this.showMobileNavbar = !this.showMobileNavbar;
    },
    ...mapMutations('Auth',['reset']),
    logOut(){
      this.reset();
    }
  }
};
</script>
<style>
.d {
  cursor: pointer;
}
</style>
