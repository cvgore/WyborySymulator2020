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
          <button type="submit" class="button is-link">Zapisz</button>
        </div>
        <div class="control">
          <button class="button is-info" type="button" @click="addQuestion">Dodaj pytanie</button>
        </div>
      </div>
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
      fullSend: false
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
    save(){
      const obj = JSON.stringify({
        pollName: this.pollName,
        questions: this.questions
      },null,2);
      this.ua = obj;
      try {
        axios.post('/poll',{
          name: this.pollName
        })
        axios.post('/')
      } catch (e){

      } finally {

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
