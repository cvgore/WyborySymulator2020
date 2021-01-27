<template>
  <form id="survey-form" class="m-5">
    <QuestionItem
      v-for="q in state.questions"
      :key="q.id"
      :question="q"
    />
  </form>
</template>

<script>
import axios from "@/axios";
import {useRoute} from "vue-router";
import {reactive} from "vue";
import QuestionItem from "@/components/QuestionList/QuestionItem";

export default {
  name: "QuestionList",
  components: {QuestionItem},
  async setup(){
    const route = useRoute();
    const state = reactive({
      questions: null,
      number: 0
    });
    const { data: questionsData } = await axios.get(`/pollQuestion?pollId=${route.params.id}`);
    state.questions = questionsData;
    return {
      state,
    }
  }
}
</script>

<style scoped>

</style>
