<template>
  <div class="is-flex is-flex-direction-column is-align-items-center fullH m-6">
    <form class="form" @submit.prevent="save">
      <div class="field">
        <label class="label">Nazwa ankiety</label>
        <div class="control">
          <input class="input" type="text" placeholder="Nazwa ankiety" v-model="pollName" />
        </div>
      </div>
      <Question
        v-for="(q, index) in questions"
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
            :class="{'is-loading':isSending}"
            class="button is-link">
            Zapisz
          </button>
        </div>
        <div class="control">
          <button class="button is-info" type="button" @click="addQuestion">Dodaj pytanie</button>
        </div>
      </div>
      <p class="help is-danger" v-if="error">{{errorMessage}}</p>
    </form>
    <p class="title is-success" v-if="correctStatus">Zapisano ankiete</p>
  </div>
</template>

<script>
import Question from '@/components/Creator/Question';

import axios from "@/axios";
export default {
  name: 'Creating',
  components: { Question },
  data() {
    return {
      pollName: '',
      questions: [],
      isSending: false,
      error: false,
      errorMessage: null,
      correctStatus: false
    };
  },
  methods: {
    addQuestion() {
      this.questions.push({
        questionText: '',
        answers: [],
      });
    },
    deleteQuestion(i) {
      console.log(i);
      this.questions.splice(i, 1);
    },
    async save(){
      this.isSending = true;
      try {
        const poll = await axios.post('/poll',{
          name: this.pollName
        });
        this.correctStatus = poll.status === 201;
        for (const q of this.questions) {
          const question = await axios.post(`/poll/${poll.data.id}/question`,{
            name : q.questionText,
            type: "text",
            required: true
          });
          this.correctStatus = question.status === 201;
          for (const answers of q.answers) {
            const option = await axios.post(`/poll/${poll.data.id}/question/${question.data.id}/option`,{
              name : answers.text,
            })
            this.correctStatus = option.status === 201;
          }
        }

      } catch (e){
        this.errorMessage = 'Błąd';
        this.error = true;
      } finally {
        this.isSending = false;
      }
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
