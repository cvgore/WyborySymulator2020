<template>
  <div class='item'>
    <p>{{question.name}}</p>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: {
    question: Object,
  },
};
</script>

<style scoped>
.item {
  margin: 50px 5px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
