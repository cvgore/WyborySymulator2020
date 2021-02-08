<template>
  <section>
    <div class="section is-flex is-flex-direction-column is-justify-content-center is-align-items-center container">
      <figure class="image is-128x128 my-3">
        <img src="@/assets/happy-man.png" alt="icon hm">
      </figure>
      <div class="columns is-centered">
        <div class="column">
          <p class="title is-size-4 has-text-info">Ahoj, <strong class="is-bold has-text-warning-dark">{{onlyName}}</strong></p>
        </div>
      </div>
      <p class="is-bold is-danger">{{state}}</p>
    </div>
    <section class="section">
      <h1 class="title">title</h1>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{p.poll.name}} {{i}}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
            <br>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Save</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>
    </section>
  </section>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {reactive,computed} from 'vue';
import axios from "@/axios";
export default {
  name: "ListPolls",
  computed: {
    ...mapState('Auth',['email']),
    onlyName(){
      return this.email.substring(0,this.email.indexOf('@'));
    }
  },
  async setup(){
    const state = reactive({
      apiData: null,
      polls: []
    })
    const polls = await axios.get('/poll');
    const ss = await axios.get('/poll/28/question');
    console.log(ss)
    console.log(polls.data.length)
    if(polls.data.length > 0){
      console.log("siema")
      for (const poll of polls.data) {
        const questions = await axios.get(`/poll/${poll.id}/question`);
        if(questions.data.length > 0){
          for(const question of questions.data){
            const answers = await axios.get(`/poll${poll.id}/question/${question.id}/option`);
            if(answers.data.length > 0){
              state.polls.push({
                ...poll,
                questions: {
                  ...question,
                  answers
                },
              });
            }
          }
        }
      }
    }

    return {
      state
    }
  }
}
</script>

<style scoped>

</style>
<!--{ "apiData": [ { "id": 27, "name": "Ankieta 2", "type": "anonymous", "colorSchema": 0,
"validFrom": "2021-02-08T15:25:32.972Z", "validUntil": null, "publishedAt": null, "createdAt":
"2021-02-08T15:25:32.972Z", "updatedAt": "2021-02-08T15:25:32.972Z" } ] }-->
<!--
{

}
-->
