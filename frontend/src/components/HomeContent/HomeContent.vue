<template>
  <div v-if="!isError.errCondition" class="tabs is-centered is-boxed">
    <ul>
      <li
        v-for="tab in tabs"
        :key="tab"
        @click="currentTab = tab"
        :class="{ 'is-active': currentTab === tab }"
      >
        <router-link to="/">
          <span class="icon is-small">
            <i v-if="tab==='Otwarte'" class="fas fa-comment-alt" aria-hidden="true"></i>
            <i v-if="tab==='Zamkniete'" class="fas fa-lock" aria-hidden="true"></i>
          </span>
          <span>{{ tab }}</span>
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
import Otwarte from '@/components/PollViews/Open';
import Zamkniete from '@/components/PollViews/Closed';
import Layout from '@/components/Layout';
import {mapActions, mapState} from 'vuex';

export default {
  name: 'HomeContent',
  components: {
    Layout,
    Navigation,
    Otwarte,
    Zamkniete,
  },
  data() {
    return {
      currentTab: 'Otwarte',
      tabs: ['Otwarte', 'Zamkniete'],
    };
  },
  methods: {
    ...mapActions('Polls',['fetchPolls'])
  },
  computed: {
    ...mapState('Polls',['isError']),
  },
  created() {
    this.fetchPolls();
  },
};
</script>
