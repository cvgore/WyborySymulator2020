<template>
  <form id="survey-form" class="m-5">
    <div class="title is-flex is-justify-content-center">
      Question {{ state.currentQuestionIndexNumber }}/{{ state.amountOfQuestions }}
    </div>
    <div class="container is-max-desktop">
      <div class="is-flex is-primary notification  is-align-items-center">
        <div @click="decrease" class="ua">
          <div class="is-flex box is-justify-content-center">
            <span class="icon is-dark">
              <i class="fas fa-chevron-left"></i>
            </span>
          </div>
          <p class="subtitle">Poprzednie pytanie</p>
        </div>
        <section v-if="state.isLoading===false" class="is-flex-grow-1">
          <div class="container is-flex is-justify-content-center">
            <p class="subtitle is-size-3 is-dark">{{ currentQuestion.name }}</p>
          </div>
          <div class="box is-flex is-justify-content-center m-2">
            <p v-if="currentAnswers.answers.length <= 0">
              Pytanko ni mo odpowiedzi
            </p>
            <label v-else v-for="answer in currentAnswers.answers" class="radio">
              <input type="radio" :name="answer.name">
              {{answer.name}}
            </label>
          </div>
        </section>
        <div v-if="state.currentQuestionIndexNumber < state.amountOfQuestions" @click="increase" class="ua">
          <div class="is-flex box is-justify-content-center">
            <span class="icon is-dark">
              <i class="fas fa-chevron-right"></i>
            </span>
          </div>
          <p class="subtitle">Następne pytanie</p>
        </div>
      </div>
      <div class="is-flex is-justify-content-flex-end">
        <button v-if="state.currentQuestionIndexNumber === state.amountOfQuestions" class="button is-success">Wyślij</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from '@/axios';
import {useRoute} from 'vue-router';
import {computed, reactive} from 'vue';
import QuestionItem from '@/components/QuestionList/QuestionItem';

export default {
  name: 'QuestionList',
  components: {QuestionItem},
  async setup() {
    const route = useRoute();
    const state = reactive({
      questions: null,
      amountOfQuestions: 0,
      currentQuestionIndexNumber: 1,
      currentQuestionNumber: null,
      answers: null,
      isLoading: false,
      isError: false,
    });

    function increase() {
      if (state.currentQuestionIndexNumber + 1 <= state.amountOfQuestions) {
        state.currentQuestionIndexNumber += 1;
      }
    }

    function decrease() {
      if (state.currentQuestionIndexNumber > 1) {
        state.currentQuestionIndexNumber -= 1;
      }
    }

    try {
      state.isLoading = true;
      const {data: questionsData} = await axios.get(`/pollQuestion?pollId=${route.params.id}`);
      state.questions = questionsData;
      state.amountOfQuestions = questionsData.length;
      const answers = [];
      for (let i = 0; i < state.questions.length; i++) {
        const {id} = state.questions[i];
        const {data} = await axios.get(`/pollOptions?pollQuestion=${id}`);
        answers.push({questionId: id,answers: data});
      }
      state.answers = answers;
      state.currentQuestionNumber = questionsData[0].id;
    } catch (e) {
      state.isError = true
    } finally {
      state.isLoading = false;
    }
    const currentQuestion = computed(() => {
      return state.questions.find((q, index) => index === state.currentQuestionIndexNumber - 1);
    })
    const currentAnswers = computed(()=>{
      return state.answers.find((q) => q.questionId === (state.currentQuestionIndexNumber ));
    })
    return {
      state,
      increase,
      decrease,
      currentQuestion,
      currentAnswers
    };
  },
};
</script>

<style scoped>
.ua {
  cursor: pointer;
}

.co {
  background: slategray;
}
</style>
