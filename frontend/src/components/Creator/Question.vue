<template>
  <div class="field">
    <label class="label">Pytanie #{{ `${index + 1}` }}</label>
    <div class="control">
      <input
        class="input"
        type="text"
        placeholder="Pytanie"
        v-model="question"
        @keyup="changeQuestionValue"
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
        <button @click="deleteQuestion" type="button" class="button is-small is-danger">
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
import Answer from "@/components/Creator/Answer";
export default {
  name: 'Question',
  components: {Answer},
  props: {
    question: String,
    num: Number,
    index: Number,
    parentAnswers: Array
  },
  setup(props,{emit}){
    function addAnswer(){
      props.parentAnswers.push({
        text: ''
      })
    }
    function deleteAnswer(i) {
      props.parentAnswers.splice(i, 1);
    }
    return {
      addAnswer,
      deleteAnswer,
      changeQuestionValue(){
        emit('update', props.question)
      },
      deleteQuestion(){
        emit('delete')
      }
    }
  },
};
</script>

<style scoped></style>
