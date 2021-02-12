<template>
  <section>
    <div class="section is-flex is-flex-direction-column is-justify-content-center is-align-items-center container">
      <figure class="image is-128x128 my-3">
        <img src="@/assets/happy-man.png" alt="icon hm">
      </figure>
      <div class="columns is-centered">
        <div class="column">
          <p class="title is-size-4 has-text-info">Ahoj, <strong
            class="is-bold has-text-warning-dark">{{ onlyName }}</strong></p>
          <p v-if="state.polls" class="subtitle is-size-1">
            Masz {{ countPolls }}
          </p>
          <p v-else class="subtitle is-size-1">Masz 0 ankiet</p>
        </div>
      </div>
    </div>
    <NotifyBox :errors="state.errors"/>
    <div v-if="state.polls" class="container polls-wrapper">
      <PollBox
        v-for="poll in state.polls"
        :fetch-all-handler="fetchAll"
        :poll="poll"
        :errors="state.errors"
      />
    </div>
  </section>
</template>

<script>
import {mapState, useStore} from "vuex";
import {reactive, computed } from 'vue';
import axios from "@/axios";
import generatePollObject from "@/utils/generatePollObject";
import PollBox from "@/components/ListPolls/PollBox";
import NotifyBox from "@/components/ListPolls/NotifyBox";
export default {
  name: "ListPolls",
  components: {NotifyBox, PollBox},
  computed: {
    onlyName() {
      return window.localStorage.getItem('email').substring(0, window.localStorage.getItem('email').indexOf('@'));
    }
  },
  async setup() {
    const store = useStore();
    const state = reactive({
      polls: null,
      errors: {
        publish: null,
        delete: null
      }
    })
    const countPolls = computed(() => {
      if (state.polls) {
        const num = state.polls.length
        return num === 1 ? `${num} ankietę` : `${num} ankiety`
      } else {
        return '0 ankiet'
      }
    });
    async function fetchAll() {
      const polls = await axios.get('/poll');
      if (polls.data.length > 0) {
        const response = await generatePollObject(polls.data);
        state.polls = response;
        store.commit('Polls/storePolls', response);
      } else {
        state.polls = null;
      }
    }
    await fetchAll();
    return {
      state,
      countPolls,
      fetchAll
    }
  }
}
</script>

<style lang="scss" scoped>
.polls-wrapper {
  height: 100%;
  display: grid;
  grid-auto-columns: 240px;
  grid-auto-rows: min-content;
  @media screen and (min-width: 520px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.item {
  width: 100%;
}
</style>
