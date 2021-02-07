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
        :question.sync="q.question"
        :parentAnswers.sync="q.answers"
        @update="q.question = $event"
        @delete="deleteQuestion(index)"
      />
      <div class="field is-grouped">
        <div class="control">
          <button type="submit" :class="{'is-loading':isSending}" class="button is-link">Zapisz</button>
        </div>
        <div class="control">
          <button class="button is-info" type="button" @click="addQuestion">Dodaj pytanie</button>
        </div>
      </div>
      <p class="help is-danger" v-if="error">{{errorMessage}}</p>
    </form>
    <div class="box">
      <pre v-if="ua">
      {{ ua }}
    </pre>
    </div>
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
      ua: null,
      isSending: false,
      error: false,
      errorMessage: null
    };
  },
  methods: {
    addQuestion() {
      this.questions.push({
        question: '',
        answers: [],
      });
    },
    deleteQuestion(i) {
      console.log(i);
      this.questions.splice(i, 1);
    },
    async save(){
      this.isSending = true;
      const obj = JSON.stringify({
        pollName: this.pollName,
        questions: this.questions
      },null,2);
      this.ua = obj;
      try {
        const {data} = await axios.post('/poll',{
          name: this.pollName
        });
        for (const q of this.questions) {
          await axios.post(`/poll/${data.id}/question`,{
            name : q.question,
            type: "text"
          });

        }
        // for (const q of this.questions.answers) {
        //   await axios.post(`/poll/${data.id}/question/${}/option`,{
        //     name : q.text
        //   })
        // }
      } catch (e){
        this.errorMessage = 'Coś sie odjebało';
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
