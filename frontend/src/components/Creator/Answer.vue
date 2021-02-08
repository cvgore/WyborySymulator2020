<template>
  <div class="field my-4 is-flex is-align-items-center">
    <div class="control has-icons-left">
      <input
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
  </div>
</template>

<script>
export default {
  name: 'Answer',
  props: {
    value: String,
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
