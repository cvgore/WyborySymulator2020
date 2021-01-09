<template>
    <section class="info-wrapper">
      <h3>{{pickedPoll.name}}</h3>
      <p>Open until : {{date}}</p>
    </section>
    <section class="container">
      <Question v-for="question in questions" :question="question" :key="question.id" />
    </section>
</template>

<script>
import MarginatorTopator from '@/components/UI/MarginatorTopator';
import { useStore } from 'vuex';
import {useRoute} from "vue-router";
import axios from "@/axios";
import {ref} from "vue";
import {DateTime} from "luxon";
import Question from "@/components/SurveyView/Question";
export default {
  name: 'FillPoll',
  components: {Question, MarginatorTopator },
  async setup() {
    const questions = ref(null);
    const store = useStore();
    const route = useRoute();
    const id = parseInt(route.params.id);
    const pickedPoll = store.state.poll.polls.find(el => el.id === id);
    const {data} = await axios.get(`/pollQuestion?pollId=${id}`);
    questions.value = data;
    const parseData = DateTime.fromISO(pickedPoll.validUntil);
    const date = parseData.toFormat('dd.LL.yyyy');
    return {
      id,
      pickedPoll,
      questions,
      date
    }
  },
};
</script>
<style scoped>
.info-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.container {
  display: flex;
  flex-direction: column;
}
</style>
