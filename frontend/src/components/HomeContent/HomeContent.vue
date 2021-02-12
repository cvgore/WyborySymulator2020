<template>
  <div v-if="!isAuth" class="boxx section is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
    <figure class="image is-128x128 my-5">
      <img src="@/assets/man.png" alt="icon">
    </figure>
    <p class="title is-size-4-mobile is-size-2-desktop has-text-centered has-text-info">Nie jesteś zalogowany!</p>
    <router-link to="/user/mail" class="button is-link is-medium-mobile is-large-desktop is-rounded">Zaloguj się</router-link>
  </div>
  <div v-else>
    <SuspenseWithError>
      <template #default>
        <ListPolls/>
      </template>
      <template #fallback>
        <Spinner/>
      </template>
      <template #error>
        <ErrorNotify/>
      </template>
    </SuspenseWithError>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation';
import Layout from '@/components/Layout';
import { mapState } from 'vuex';
import ListPolls from "@/components/ListPolls/ListPolls";
import SuspenseWithError from "@/components/SuspenseWithError/SuspenseWithError";
import Spinner from "@/components/UI/Spinner";
import ErrorNotify from "@/components/ErrorsNotify/ErrorNotify";
export default {
  name: 'HomeContent',
  components: {
    ErrorNotify,
    Spinner,
    SuspenseWithError,
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