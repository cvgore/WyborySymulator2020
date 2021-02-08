<template>
  <div class="is-flex is-flex-direction-column is-align-items-center fullH m-6">
    <div class="section is-size-2">Kreator ankiet</div>
    <form class="form" @submit.prevent="submitForm">
      <div class="field">
        <label class="label">Nazwa ankiety</label>
        <div class="control">
          <input class="input" type="text" placeholder="Nazwa ankiety" v-model="state.pollName"/>
        </div>
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
      <p class="help is-danger" v-if="state.isError===false">Wystąpił błąd podczas tworzenia ankiety</p>
    </form>
    <p class="title is-success" v-if="state.isFullCreated===true">Zapisano ankiete</p>
  </div>
</template>

<script>
import Question from '@/components/Creator/Question';

import axios from "@/axios";
import {usePost} from "../../hooks/usePost";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {reactive} from "vue";

export default {
  name: 'Creating',
  components: {Question},
  setup() {
    const state = reactive({
      pollName: '',
      createdQuestions: [],
      isError: null,
      isFullCreated: null,
      isLoading: false
    });

    async function submitForm() {
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
          if (questionResponse.statusCode=== 201) {
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
    }
    function addQuestion(){
      state.createdQuestions.push({
        questionText: '',
        answers: [],
      })
    }
    function deleteQuestion(i){
      state.createdQuestions.splice(i, 1);
    }
    return {
      state,
      addQuestion,
      deleteQuestion,
      submitForm
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
