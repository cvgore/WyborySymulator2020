<template>
  <div class="field">
    <label class="label">Pytanie #{{ `${index + 1}` }}</label>
    <div class="control">
      <Field
        :rules="questionRules"
        :name="name"
        class="input"
        type="text"
        placeholder="Pytanie"
        v-model="question"
        @keyup="changeQuestionValue"
      />
      <ErrorMessage :name="name" class="help is-danger is-size-7"/>
    </div>
    <Answer
      v-for="(option,i) in parentAnswers"
      :key="`answer-${option.id}`"
      :name="`answer-${option.id}`"
      :value.sync="option.name"
      @update="option.name = $event"
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
import {Field,ErrorMessage} from 'vee-validate'
import yup from "@/yup-settings";
import { v4 as uuidv4 } from 'uuid';
export default {
  name: 'Question',
  components: {Answer,Field,ErrorMessage},
  props: {
    question: String,
    num: Number,
    index: Number,
    parentAnswers: Array,
    name:String
  },
  data(){
    return {
      questionRules: yup.string()
        .required('Pole jest wymagane')
        .min(3)
    }
  },
  methods:{
    randomNum(){
      return uuidv4();
    }
  },
  setup(props,{emit}){
    function addAnswer(){
      props.parentAnswers.push({
        id: uuidv4(),
        name: ''
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
