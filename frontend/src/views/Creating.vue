<template>
  <div class="is-flex is-flex-direction-column is-align-items-center fullH m-6">
    <div class="section is-size-2">
      {{state.editMode ? 'Edytor' : 'Kreator'}} ankiet
    </div>
    <Form class="form" @submit="submitForm">
      <div class="notification is-danger" v-if="state.isError===true">
        <button @click="closeNotify" class="delete"/>
        Wystąpił błąd {{state.errMsg}}
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
        <ErrorMessage name="surveyName" class="help is-danger is-size-7"/>
      </div>
      <Question
        v-for="(q, index) in state.createdQuestions"
        :key="`quest-${q.id}`"
        :index="index"
        :name="`quest-${q.id}`"
        :question.sync="q.name"
        :parentAnswers.sync="q.options"
        @update="q.name = $event"
        @delete="deleteQuestion(index)"
      />
      <div class="field is-grouped">
        <div class="control">
          <button
            v-if="!state.editMode"
            type="submit"
            :class="{'is-loading':state.isLoading}"
            class="button is-link">
            Zapisz
          </button>
          <button
            v-else
            type="submit"
            :class="{'is-loading':state.isLoading}"
            class="button is-link">
            Zapisz zmiany(#lepiejniklikaj)
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
import {usePost} from "@/utils/usePost";
import {onUnmounted, reactive} from "vue";
import { Form,Field,ErrorMessage } from 'vee-validate';
import yup from '@/yup-settings';
import { v4 as uuidv4 } from 'uuid';
import {useStore} from "vuex";
import {usePut} from "@/utils/usePut";
import {DateTime} from 'luxon'
import {cloneDeep} from 'lodash'
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
  methods:{
    randomNum(){
      return uuidv4();
    }
  },
  setup() {
    const store = useStore();
    const state = reactive({
      editMode: false,
      pollName: '',
      createdQuestions: [{
        id: uuidv4(),
        name: '',
        options: [{
          id: uuidv4(),
          name: ''
        }],
      }],
      isError: null,
      isFullCreated: null,
      isLoading: false,
      errMsg: null
    });
    if(store.state.Polls.editData){
      state.editMode = true;
      state.createdQuestions = cloneDeep(store.state.Polls.editData.questions);
      state.pollName = store.state.Polls.editData.name;
    }
    async function create(){
      const pollResponse = await usePost('/poll', {
        name: state.pollName
      });
      state.isLoading = pollResponse.isLoading;
      if (pollResponse.statusCode === 201) {
        for (const question of state.createdQuestions) {
          const questionResponse = await usePost(`/poll/${pollResponse.data.id}/question`, {
            name: question.name,
            type: "text",
            required: true
          });
          state.isLoading = pollResponse.isLoading;
          if (questionResponse.statusCode === 201) {
            for (const answers of question.options) {
              const optionResponse = await usePost(`/poll/${pollResponse.data.id}/question/${questionResponse.data.id}/option`, {
                name: answers.name,
              });
              console.log("tworzenie odpowiedzi",optionResponse)
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
    }
    async function edit(){
      const pollResponse = await usePut(`/poll/${store.state.Polls.editData.id}`, {
        name: state.pollName,
        validUntil: DateTime.local(),
        validFrom: DateTime.local()
      });
      if(pollResponse.isError) state.errMsg = pollResponse.errorData.message
      state.isLoading = pollResponse.isLoading;
      console.log(pollResponse)
      if (pollResponse.statusCode === 200) {
        for (const question of state.createdQuestions) {
          const questionResponse = await usePut(`/poll/${store.state.Polls.editData.id}/question/${question.id}`, {
            name: question.name,
            required: true
          });
          if(questionResponse.isError) state.errMsg = questionResponse.errorData.message
          state.isLoading = pollResponse.isLoading;
          if (questionResponse.statusCode === 200) {
            for (const answer of question.options) {
              const optionResponse = await usePut(`/poll/${store.state.Polls.editData.id}/question/${question.id}/option/${answer.id}`, {
                name: answer.name,
              });
              if(optionResponse.isError) state.errMsg = optionResponse.errorData.message
              state.isLoading = pollResponse.isLoading;
              state.isFullCreated = optionResponse.statusCode === 200;
              state.isError = optionResponse.isError;
            }
          } else {
            state.isError = true
          }
        }
      } else {
        state.isError = true;
      }
    }
    async function submitForm() {
      if(state.editMode){
        await edit();
      } else {
        await create();
      }
      state.createdQuestions = [{
        id: uuidv4(),
        name: '',
        options: [{
          id: uuidv4(),
          name: ''
        }],
      }]
      state.pollName = ''
    }
    function addQuestion() {
      state.createdQuestions.push({
        id: uuidv4(),
        name: '',
        options: [],
      })
    }
    function deleteQuestion(i) {
      state.createdQuestions.splice(i, 1);
    }
    function closeNotify() {
      state.isError = null;
      state.isFullCreated = null;
    }
    onUnmounted(() => {
      store.editMode = false;
      store.commit('Polls/resetEditData',null);
      state.createdQuestions = [{
        id: uuidv4(),
        name: '',
        answers: [{
          id: uuidv4(),
          name: ''
        }],
      }]
      state.pollName = ''
    })
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