<template>
  <section class="is-flex is-justify-content-center is-align-items-center is-full-height p-6">
    <form>
      <div class="field">
        <label class="label">Email</label>
        <!--     veevalidate  <p class="help is-danger">This email is invalid</p> -->
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Wpisz swój mail" value="" />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <label class="label">Hasło</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="Wpisz swoje hasło" />
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>
      <div class="field is-grouped is-flex is-align-items-center is-flex-direction-column">
        <div class="control m-4">
          <button class="button is-link">Zaloguj sie</button>
        </div>
        <p>Nie masz konta? <router-link to="register">Zarejestruj się</router-link></p>
      </div>
    </form>
  </section>
</template>

<script>
import Layout from '@/components/Layout';

export default {
  name: 'Login',
  components: { Layout },
};
</script>
