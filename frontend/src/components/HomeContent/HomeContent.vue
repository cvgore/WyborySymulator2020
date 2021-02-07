<template>
  <div v-if="!isAuth" class="boxx section is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
    <figure class="image is-128x128 my-5">
      <img src="@/assets/man.png" alt="icon">
    </figure>
    <p class="title is-size-2  has-text-info">Nie jesteś zalogowany!</p>
    <router-link to="/forms/log-in" class="button is-link is-large">Zaloguj się</router-link>
  </div>
  <div v-else>
    <ListPolls />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation';
import Layout from '@/components/Layout';
import {mapActions, mapState} from 'vuex';
import ListPolls from "@/components/ListPolls/ListPolls";

export default {
  name: 'HomeContent',
  components: {
    ListPolls,
    Layout,
    Navigation,
  },
  computed: {
    ...mapState('Auth',['isAuth']),
  },
};
</script>
<style>
.boxx {
  height: 60vh;
}
</style>
