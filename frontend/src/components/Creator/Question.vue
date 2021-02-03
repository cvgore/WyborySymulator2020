<template>
  <div class="field">
    <label class="label">Pytanie #{{ `${index + 1}` }}</label>
    <div class="control">
      <input
      
        class="input"
        type="text"
        placeholder="Pytanie"
        v-model="question"
        @keyup="$emit('update', question)"
      />
    </div>
    <Answer
      v-for="(option,i) in parentAnswers"
      key="index"
      :value.sync="option.text"
      @update="option.text = $event"
      @delete="deleteAnswer(i)"
    />
    <div class="is-flex">
      <section class="my-3">
        <button
          @click="addAnswer"
          type="button" class="button is-small is-success">
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
          <span>Dodaj odpowiedź</span>
        </button>
      </section>
      <section class="m-3">
        <button @click="$emit('delete')" type="button" class="button is-small is-danger">
          <span class="icon">
            <i class="fas fa-trash"></i>
          </span>
          <span>Usuń pytanie</span>
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import {Answer,label,field} from "@/components/Creator/Answer";
export default {
  components: {
    label,
  },

  name: 'Question',
  components: {Answer},
  props: {
    question: String,
    num: Number,
    index: Number,
    parentAnswers: Array
  },
  methods: {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    },
     validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'This field is required';
      }
      // if the field is not a valid email
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'This field must be a valid email';
      }

      // All is good
      return true;
    },

    addAnswer(){
      this.parentAnswers.push({
        text: ''
      })
    },
    deleteAnswer(i) {
      this.parentAnswers.splice(i, 1);
    },
  },
    


};


</script>

<style scoped></style>
