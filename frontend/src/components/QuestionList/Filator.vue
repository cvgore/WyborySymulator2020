<template>
  <div>
    <section class="hero is-warning">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ state.pickedPoll.name }}
          </h1>
        </div>
      </div>
    </section>
    <QuestionList :picked-poll-data="state.pickedPoll"/>
  </div>
</template>

<script>
import QuestionList from "@/components/QuestionList/QuestionList";
import {useRoute} from "vue-router";
import {reactive} from "vue";
import axios from "@/axios";

export default {
  name: "Filator",
  components: {QuestionList},
  async setup() {
    const route = useRoute();
    const state = reactive({
      pickedPoll: null,
      id: null,
      str: null
    });
    state.id = +route.params.id;
    state.str = route.params.str;
    const {data} = await axios.get(`/poll/${+route.params.id}/${route.params.str}/data`);
    state.pickedPoll = data;
    return {
      state,
    }
  }
}
</script>
