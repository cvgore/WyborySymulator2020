<template>
  <div class="is-flex is-flex-direction-column is-align-items-center fullH m-6">
    <div class="section is-size-2">Kreator ankiet</div>
    <Form class="form" @submit="submitForm">
      <div class="notification is-danger" v-if="state.isError===true">
        <button @click="closeNotify" class="delete"/>
        Wystąpił błąd podczas tworzenia ankiety
      </div>
      <div class="notification is-success" v-if="state.isFullCreated===true">
        <button @click="closeNotify" class="delete"/>
        Pomyślnie stworzono ankiete
      </div>
      <div class="field">
        <label class="label">Nazwa ankiety</label>
        <div class="control">
          <Field
            :rules="surveyNameRules"
            name="surveyName"
            class="input"
            type="text"
            placeholder="Nazwa ankiety"
            v-model="state.pollName"
          />
        </div>
        <ErrorMessage name="surveyName" class="help is-danger is-size-6"/>
      </div>
      <Question
        v-for="(q, index) in state.createdQuestions"
        :key="`quest-${index}`"
        :index="index"
        :question.sync="q.questionText"
        :parentAnswers.sync="q.answers"
        @update="q.questionText = $event"
        @delete="deleteQuestion(index)"
      />
      <div class="field is-grouped">
        <div class="control">
          <button
            type="submit"
            :class="{'is-loading':state.isLoading}"
            class="button is-link">
            Zapisz
          </button>
        </div>
        <div class="control">
          <button class="button is-info" type="button" @click="addQuestion">Dodaj pytanie</button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import Question from '@/components/Creator/Question';
import {usePost} from "../../hooks/usePost";
import {reactive} from "vue";
import { Form,Field,ErrorMessage } from 'vee-validate';
import yup from '@/yup-settings'
export default {
  name: 'Creating',
  components: {Question,Form,Field,ErrorMessage},
  data(){
    return {
      surveyNameRules: yup.string()
        .required('Pole jest wymagane')
        .min(6)
    }
  },
  setup() {
    const state = reactive({
      pollName: '',
      createdQuestions: [],
      isError: null,
      isFullCreated: null,
      isLoading: false
    });

    async function submitForm() {
      console.log("chop")
      const pollResponse = await usePost('/poll', {
        name: state.pollName
      });
      state.isLoading = pollResponse.isLoading;
      if (pollResponse.statusCode === 201) {
        for (const question of state.createdQuestions) {
          const questionResponse = await usePost(`/poll/${pollResponse.data.id}/question`, {
            name: question.questionText,
            type: "text",
            required: true
          });
          state.isLoading = pollResponse.isLoading;
          if (questionResponse.statusCode === 201) {
            for (const answers of question.answers) {
              const optionResponse = await usePost(`/poll/${pollResponse.data.id}/question/${questionResponse.data.id}/option`, {
                name: answers.text,
              });
              state.isLoading = pollResponse.isLoading;
              state.isFullCreated = optionResponse.statusCode === 201;
              state.isError = optionResponse.isError;
            }
          } else {
            state.isError = true
          }
        }
      } else {
        state.isError = true;
      }
      state.pollName = ''
      state.createdQuestions = []
    }
    function addQuestion() {
      state.createdQuestions.push({
        questionText: '',
        answers: [],
      })
    }
    function deleteQuestion(i) {
      state.createdQuestions.splice(i, 1);
    }
    function closeNotify() {
      state.isError = null;
      state.isFullCreated = null;
    }
    return {
      state,
      addQuestion,
      deleteQuestion,
      submitForm,
      closeNotify,
    }
  },
};
</script>

<style scoped>
.form {
  width: 500px;
  min-height: 50vh;
}

.fullH {
  height: 100%;
}
</style>
