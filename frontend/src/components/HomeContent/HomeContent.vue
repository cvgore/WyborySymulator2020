<template>
  <div v-if="!isAuth" class="boxx section is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
    <figure class="image is-128x128 my-5">
      <img src="@/assets/man.png" alt="icon">
    </figure>
    <p class="title is-size-2  has-text-info">Nie jesteś zalogowany!</p>
    <router-link to="/log-in" class="button is-link is-large">Zaloguj się</router-link>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation';
import Otwarte from '@/components/PollViews/Open';
import Zamkniete from '@/components/PollViews/Closed';
import Layout from '@/components/Layout';
import {mapActions, mapState} from 'vuex';

export default {
  name: 'HomeContent',
  components: {
    Layout,
    Navigation,
  },
  methods: {
    ...mapActions('Polls',['fetchPolls']),
  },
  computed: {
    ...mapState('Polls',['isError']),
    ...mapState('Auth',['isAuth']),
  },
  async created() {
    await this.fetchPolls();
  },
};
</script>
<style>
.boxx {
  height: 60vh;
}
</style>
