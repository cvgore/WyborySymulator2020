<template>
  <Form class="m-5" :validation-schema="schema" @submit="onSubmit">
    <section class="my-5">
      <div v-if="state.isError" class="notification is-danger">
        <button
          @click="closeNotify"
          class="delete"/>
        Wystąpił błąd kurdebela
      </div>
      <div v-if="state.isSuccess" class="notification is-success">
        <button
          @click="closeNotify"
          class="delete"/>
        Pomyślnie zagłosowano!
      </div>
    </section>
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
          :class="{isLoading:state.isLoading}"
          type="button"
          @click="vote"
        >
          Wyślij
        </button>
      </div>
    </div>
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
      isError: false,
      isSuccess: false,
      isLoading: false
    });
    const givenAnswers = {}
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
      givenAnswers[currentQuestion.value.id] = [answer];
    }

    function onSubmit() {
      if (state.currentQuestionIndexNumber < state.amountOfQuestions) {
        increase()
      }
    }
    function closeNotify() {
      state.isError = false;
      state.isSuccess = false;
    }
    async function vote() {
      try {
        state.isLoading = true;
        const res = await axios.post(`/poll/${props.id}/${props.str}/vote`, givenAnswers);
        if(res.status === 201){
          state.isSuccess = true;
        } else {
          state.isError = true;
        }
      } catch {
        state.isError = true;
      } finally {
        state.isLoading = false
      }
    }

    return {
      state,
      increase,
      decrease,
      currentQuestion,
      closeNotify,
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
