<template>
  <section class="boxdata">
    <p class="title">Jakaś ankieta</p>
    <div class="spec">
      <p>10 pytań</p>
      <p>2 odpowiedzi</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SurveyItem',
  props: {
    post: Object,
  },
};
</script>

<style scoped>
.boxdata {
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 3px;
  width: 100%;
}
.spec {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 10px;
  color:gray;
}
.title {
  font-weight: bolder;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
