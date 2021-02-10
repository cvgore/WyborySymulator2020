<template>
  <Form class="m-5" :validation-schema="schema" @submit="onSubmit">
    <div class="title is-flex is-justify-content-center">
      Pytanie {{ state.currentQuestionIndexNumber }}/{{ state.amountOfQuestions }}
    </div>
    <ErrorMessage name="option" class="help is-danger is-size-7 px-3"/>
    <div class="container is-max-desktop">
      <div class="is-flex is-warning notification  is-align-items-center">
        <div
          v-on="state.currentQuestionIndexNumber > 1  ? {click: decrease} : {}"
          class="ua"
        >
          <div class="is-flex box is-justify-content-center">
            <p class="subtitle">Poprzednie pytanie</p>
          </div>
        </div>
        <section class="is-flex-grow-1">
          <div class="container is-flex is-justify-content-center">
            <p class="subtitle is-size-3 is-dark">{{ currentQuestion.name }}</p>
          </div>
          <section class="is-flex is-flex-direction-column is-align-items-center m-5">
              <FormQuestionField
                v-for="option in currentQuestion.pollOptions"
                :key="option.id"
                :option="option"
                :model="state.options"
                :passAnswer="passAnswer"
              />
          </section>
        </section>
        <button
          class="ua  button is-warning"
          type="submit"
        >
          <div class="is-flex box is-justify-content-center">
            <p class="subtitle">Następne pytanie</p>
          </div>
        </button>
      </div>
      <div class="is-flex is-justify-content-flex-end">
        <button
          v-if="state.currentQuestionIndexNumber === state.amountOfQuestions"
          class="button is-success"
          type="button"
          @click="vote"
        >
          Wyślij
        </button>
      </div>
    </div>
    {{state}}
  </Form>
</template>

<script>
import {computed, reactive} from 'vue';
import QuestionItem from '@/components/QuestionList/QuestionItem';
import {Form, ErrorMessage} from 'vee-validate'
import FormQuestionField from "@/components/QuestionList/FormQuestionField";
import {usePost} from "@/utils/usePost";
import axios from "@/axios";
export default {
  name: 'QuestionList',
  components: {FormQuestionField, QuestionItem, Form, ErrorMessage},
  props: {
    pickedPollData: Object,
    id: Number,
    str: String
  },
  data() {
    return {
      schema: {
        option: (value) => {
          if (value) {
            return true;
          }
          return 'Musisz wybrać odpowiedź';
        }
      },
    }
  },
  setup: function (props) {
    const state = reactive({
      amountOfQuestions: null,
      currentQuestionIndexNumber: 1,
      givenAnswers: [],
    });
    if (props.pickedPollData) {
      state.amountOfQuestions = props.pickedPollData.pollQuestions.length
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
      return props.pickedPollData.pollQuestions.find((q, index) => index === state.currentQuestionIndexNumber - 1)
    });
    function passAnswer(answer) {
      const myQuestionIndex = state.givenAnswers.findIndex(q => {
        const f = Object.keys(q);
        return +f[0] === currentQuestion.value.id
      });
      if (myQuestionIndex === -1) {
        state.givenAnswers.push({
          [currentQuestion.value.id]: [answer]
        })
      } else {
        state.givenAnswers[myQuestionIndex] = {
          [currentQuestion.value.id]: [answer]
        };
      }
    }
    function onSubmit() {
      if (state.currentQuestionIndexNumber < state.amountOfQuestions && state.givenAnswers.length > 0) {
        increase()
      }
    }
    async function vote() {
      for (const voteQuestion in state.givenAnswers) {
        console.log(voteQuestion)
        const res = await axios.post(`/poll/${props.id}/${props.str}/vote`, voteQuestion)
        console.log(res)
      }
    }
    return {
      state,
      increase,
      decrease,
      currentQuestion,
      onSubmit,
      passAnswer,
      vote
    };
  },
};
</script>

<style lang="scss" scoped>
.ua {
  cursor: pointer;
  border: 0;
}
.field {
  width: 100%;
  border: 1px solid #e3ba24;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #f5d22c;
  }
}
label {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vmin;
}
</style>