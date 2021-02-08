<template>
  <section>
    <div class="section is-flex is-flex-direction-column is-justify-content-center is-align-items-center container">
      <figure class="image is-128x128 my-3">
        <img src="@/assets/happy-man.png" alt="icon hm">
      </figure>
      <div class="columns is-centered">
        <div class="column">
          <p class="title is-size-4 has-text-info">Ahoj, <strong class="is-bold has-text-warning-dark">{{onlyName}}</strong></p>
          <p class="subtitle is-size-1">Masz {{countQuestions(state.polls)}} ankiety</p>
        </div>
      </div>
    </div>

    <div v-if="state.polls" class="container wrapperr">
      <div v-for="(p) in state.polls" class="item">
        <section class="section">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{p.name}}
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                Pytań: <strong>{{countQuestions(p.questions)}}</strong>
                <br>
                <time datetime="2016-1-1">Utworzono: <strong>{{parseDate(p.createdAt)}}</strong></time>
              </div>
            </div>
            <footer class="card-footer">
              <router-link :to="{ path: `/polls/${p.id}` }" exact class="card-footer-item has-background-warning">Wypełnij</router-link>
              <a href="#" class="card-footer-item has-background-warning-light">Edit</a>
              <a href="#" class="card-footer-item has-background-warning-light">Delete</a>
            </footer>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState, useStore} from "vuex";
import {reactive} from 'vue';
import axios from "@/axios";
import generatePollObject from "@/utils/generatePollObject";
import parseDate from "@/utils/parseDate";
export default {
  name: "ListPolls",
  computed: {
    ...mapState('Auth',['email']),
    onlyName(){
      return this.email.substring(0,this.email.indexOf('@'));
    }
  },
  methods:{
    parseDate,
    countQuestions(data){
      return data.length
    }
  },
  async setup(){
    const store = useStore();
    const state = reactive({
      polls: null
    })
    const polls = await axios.get('/poll');
    if(polls.data.length > 0){
      const response = await generatePollObject(polls.data);
      state.polls = response;
      store.commit('Polls/storePolls',response);
    }
    return {
      state
    }
  }
}
</script>

<style scoped>
.wrapperr {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-auto-rows: auto;
}
.item {
  width: 300px;
}
</style>
