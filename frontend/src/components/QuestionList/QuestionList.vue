<template>
  <form id="survey-form" class="m-5">
    <div class="title is-flex is-justify-content-center">
      Question {{ state.currentQuestionIndexNumber }}/{{ state.amountOfQuestions }}
    </div>
    <div class="container is-max-desktop">
      <div class="is-flex is-warning notification  is-align-items-center">
        <div v-if="state.currentQuestionIndexNumber > 1" @click="decrease" class="ua">
          <div class="is-flex box is-justify-content-center">
            <span class="icon is-dark">
              <i class="fas fa-chevron-left"></i>
            </span>
          </div>
          <p class="subtitle">Poprzednie pytanie</p>
        </div>
        <section class="is-flex-grow-1">
          <div class="container is-flex is-justify-content-center">
            <p class="subtitle is-size-3 is-dark">{{ currentQuestion.name }}</p>
          </div>
          <section class="is-flex is-flex-direction-column is-align-items-center my-5">
            <div v-for="option in currentQuestion.options" class="field">
              <div class="control is-flex is-align-items-center">
                <label :for="option.name" class="radio my-5"/>
                <input type="radio" :name="option.name" class="is-size-6 mx-2">
                {{option.name}}
              </div>
            </div>
          </section>
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
    <pre>
      {{JSON.stringify(pickedPollData,null,2)}}
    </pre>
  </form>
</template>

<script>
import {computed, reactive} from 'vue';
import QuestionItem from '@/components/QuestionList/QuestionItem';
import {useStore} from "vuex";

export default {
  name: 'QuestionList',
  components: {QuestionItem},
  props: {
    pickedPollData: Object
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      amountOfQuestions: null,
      currentQuestionIndexNumber: 1,
      currentQuestionNumber: null,
    });
    if(props.pickedPollData){
      state.amountOfQuestions = props.pickedPollData.questions.length
    }
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
    const currentQuestion = computed(() => {
      return props.pickedPollData.questions.find((q,index) => index === state.currentQuestionIndexNumber - 1)
    });
    return {
      state,
      increase,
      decrease,
      currentQuestion,
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
