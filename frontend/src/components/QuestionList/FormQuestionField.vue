<template>
  <div class="field">
    <div class="control is-flex is-align-items-center">
      <label class="radio czacza">
        <Field
          type="radio"
          name="option"
          class="is-size-6 mx-2"
          :value="option.id"
          v-model="pickedAnswer"
        />
        {{ option.name }}
      </label>
    </div>
  </div>
</template>

<script>
import {Field} from 'vee-validate';
export default {
  name: "FormQuestionField",
  components: {
    Field
  },
  props: {
    option: Object,
    model: String,
    passAnswer:Function
  },
  data(){
    return {
      pickedAnswer: ''
    }
  },
  watch: {
    pickedAnswer(newValue){
      this.passAnswer(newValue)
    }
  }
}
</script>
