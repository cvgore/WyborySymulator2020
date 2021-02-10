<template>
  <section class="hero is-warning">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
<!--          {{state.pickedPoll.name}}-->
        </h1>
      </div>
    </div>
  </section>
<!--  <QuestionList :picked-poll-data="state.pickedPoll"/>-->
</template>
<script>
import QuestionList from "@/components/QuestionList/QuestionList";
import SuspenseWithError from "@/components/SuspenseWithError/SuspenseWithError";
import ErrorNotify from "@/components/ErrorsNotify/ErrorNotify";
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import {reactive,watch} from "vue";
export default {
  name: "PollPreview",
  components: {SuspenseWithError, QuestionList, ErrorNotify},
  setup(){
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      pickedPoll:null,
      id: null,
      str: null
    });
    state.id = +route.params.id;
    state.str = route.params.str;
    console.log(route)
    // const getPoll = store.getters['Polls/getPollById'];
    // state.pickedPoll = getPoll(state.id);
    return {
      state,
    }
  }
}
</script>