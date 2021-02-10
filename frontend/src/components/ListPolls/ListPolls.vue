<template>
  <section>
    <div class="section is-flex is-flex-direction-column is-justify-content-center is-align-items-center container">
      <figure class="image is-128x128 my-3">
        <img src="@/assets/happy-man.png" alt="icon hm">
      </figure>
      <div class="columns is-centered">
        <div class="column">
          <p class="title is-size-4 has-text-info ">Ahoj, <strong
            class="is-bold has-text-warning-dark">{{ onlyName }}</strong></p>
          <p v-if="state.polls" class="subtitle is-size-1">
            Mosz {{ countPolls }}
          </p>
          <p v-else class="subtitle is-size-1">Mosz 0 anket</p>
        </div>
      </div>
    </div>
    <section v-if="state.someError">
      <div v-if="state.someError.cond" class="notification is-danger">
        <button class="delete" @click="closeNotify"/>
        Błąd podczas usuwania ankety
        <p class="is-size-6">
          {{state.someError.message}}
        </p>
      </div>
    </section>
    <div v-if="state.polls" class="container wrapperr">
      <div v-for="(p) in state.polls" class="item">
        <section class="section">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{ p.name }}
              </p>
            </header>
            <div class="card-content">
              <div class="content ">
                Pytań: <strong>{{ countQuestions(p.questions) }}</strong>
                <br>
                <time datetime="2016-1-1">Utworzono: <strong>{{ parseDate(p.createdAt) }}</strong></time>
              </div>
            </div>
            <footer class="card-footer">
              <router-link :to="{ path: `/polls/${p.id}` }" exact class="card-footer-item has-background-warning">
                Wypełnij
              </router-link>
              <div class="card-footer-item has-background-warning-light vc"
                   @click="passEditData(p)"
              >
                Edit
              </div>
              <div
                class="card-footer-item has-background-warning-light vc"
                @click="deletePoll(p.id)"
              >
                Usuń
              </div>
            </footer>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState, useStore} from "vuex";
import {reactive, computed, onUpdated, onMounted} from 'vue';
import axios from "@/axios";
import generatePollObject from "@/utils/generatePollObject";
import parseDate from "@/utils/parseDate";
import {useRouter} from "vue-router";
export default {
  name: "ListPolls",
  computed: {
    ...mapState('Auth', ['email']),
    onlyName() {
      return this.email.substring(0, this.email.indexOf('@'));
    }
  },
  methods: {
    parseDate,
    countQuestions(data) {
      return data.length
    },
  },
  updated() {
    console.log("update")
  },
  async setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      polls: null,
      someError: null
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
    async function deletePoll(id) {
      try {
        const response = await axios.delete(`/poll/${id}`);
        if (response.status === 204) {
          await fetchAll();
        }
      } catch (e) {
        state.someError = {
          cond: true,
          mess: e.message
        }
      }
    }
    function passEditData(data) {
      store.commit('Polls/editData', data);
      router.push('/creator');
    }
    await fetchAll();
    function closeNotify() {
      state.someError = null;
    }
    return {
      state,
      countPolls,
      passEditData,
      deletePoll,
      closeNotify
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapperr {
  height: 100%;
  display: grid;
  grid-auto-columns: 240px;
  grid-auto-rows: auto;
  @media screen and (min-width: 520px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
.item {
  width: 100%;
}
.vc {
  cursor: pointer;
  &:hover {
    color: darkgoldenrod;
  }
  
}

</style>