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
            <div v-for="option in currentQuestion.pollOptions" class="field">
              <div class="control is-flex is-align-items-center">
                <label class="radio czacza">
                  <Field
                    type="radio"
                    name="option"
                    class="is-size-6 mx-2 bo"
                    :value="option.name"
                  />
                  {{option.name}}
                </label>
              </div>
            </div>
          </section>
        </section>
        <button
          class="ua  button is-warning"
          type="submit"
          @submit="onSubmit"
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
        >
          nie licz na to
        </button>
      </div>
    </div>
  </Form>
</template>

<script>
import {computed, reactive} from 'vue';
import QuestionItem from '@/components/QuestionList/QuestionItem';
import {useStore} from "vuex";
import {Form,Field,ErrorMessage} from 'vee-validate'
import yup from "@/yup-settings";

export default {
  name: 'QuestionList',
  components: {QuestionItem,Form,Field,ErrorMessage},
  props: {
    pickedPollData: Object
  },
  data(){
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
  setup(props) {
    const store = useStore();
    const state = reactive({
      amountOfQuestions: null,
      currentQuestionIndexNumber: 1,
    });
    if(props.pickedPollData){
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
      return props.pickedPollData.pollQuestions.find((q,index) => index === state.currentQuestionIndexNumber - 1)
    });
    function onSubmit(){
      if(state.currentQuestionIndexNumber < state.amountOfQuestions){
        increase()
      }
    }
    return {
      state,
      increase,
      decrease,
      currentQuestion,
      onSubmit
    };
  },
};
</script>

<style lang="scss" scoped>
.ua {
  cursor: pointer;
  border:0;
}
.bo {

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
