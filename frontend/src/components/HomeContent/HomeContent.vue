<template>
  <div class="tabs is-centered is-boxed">
    <ul>
      <li
        v-for="tab in tabs"
        :key="tab"
        @click="currentTab = tab"
        :class="{ 'is-active': currentTab === tab }"
      >
        <router-link to="/">
          {{ tab }}
        </router-link>
      </li>
    </ul>
  </div>
  <keep-alive>
    <component :is="currentTab"/>
  </keep-alive>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation';
import Open from '@/components/PollViews/Open';
import Closed from '@/components/PollViews/Closed';
import Layout from '@/components/Layout';
import {mapActions } from 'vuex';

export default {
  name: 'HomeContent',
  components: {
    Layout,
    Navigation,
    Open,
    Closed,
  },
  data() {
    return {
      currentTab: 'Open',
      tabs: ['Open', 'Closed '],
    };
  },
  methods: {
    ...mapActions('Polls',['fetchPolls'])
  },
  created() {
    this.fetchPolls();
  },
};
</script>
