<template>
  <div class="my-4">
    <div class="control has-icons-left  is-flex is-align-items-center">
      <Field
        :rules="answerRules"
        :name="name"
        class="input is-small"
        type="text"
        placeholder="Wprowadź odpowiedź"
        v-model="value"
        @keyup="changeAnswerValue"
      />
      <span class="icon is-small is-left">
        <i class="far fa-arrow-alt-circle-right"></i>
      </span>
      <button @click="deleteAnswer" type="button" class="button is-small is-danger">
        <span class="icon">
          <i class="fas fa-times"></i>
        </span>
      </button>
    </div>
    <ErrorMessage :name="name" class="help is-danger is-size-7 ml-6-tablet"/>
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
    name:String
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

