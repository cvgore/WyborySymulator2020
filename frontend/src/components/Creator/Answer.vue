<template>
  <div class="field my-4 is-flex is-align-items-center">
    <div class="control has-icons-left">
      <Field
        :rules="answerRules"
        name="answer"
        class="input is-success is-small"
        type="text"
        placeholder="Wprowadź odpowiedź"
        v-model="value"
        @keyup="changeAnswerValue"
      />
      <span class="icon is-small is-left">
        <i class="far fa-arrow-alt-circle-right"></i>
      </span>
    </div>
    <button @click="deleteAnswer" type="button" class="button is-small is-danger">
        <span class="icon">
          <i class="fas fa-times"></i>
        </span>
    </button>
    <ErrorMessage name="answer" class="help is-danger is-size-7 px-3"/>
  </div>
</template>

<script>
import {Field,ErrorMessage} from 'vee-validate'
import yup from "@/yup-settings";

export default {
  name: 'Answer',
  components: {Field,ErrorMessage},
  props: {
    value: String,
  },
  data(){
    return {
      answerRules: yup.string()
        .required('Pole jest wymagane')
        .min(3)
    }
  },
  setup(props,{emit}){
    return {
      changeAnswerValue(){
        emit('update', props.value)
      },
      deleteAnswer(){
        emit('delete')
      }
    }
  },
};
</script>

<style scoped></style>
