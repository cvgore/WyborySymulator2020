<template>
  <section class="boxdata">
    <p class="title">{{ post.name }}</p>
    <div class="spec">
      <div>
        <p>Otwarta do: {{ parseData }}</p>
        <p></p>
      </div>
      <div>10 pytań</div>
      <p>2 odpowiedzi</p>
    </div>
  </section>
</template>

<script>
import { DateTime } from 'luxon';
export default {
  name: 'SurveyItem',
  props: {
    post: Object,
  },
  setup(props) {
    const parseData = DateTime.fromISO(props.post.validUntil).toFormat('dd LLL yyyy');
    return {
      parseData,
    };
  },
};
</script>

<style scoped>
.boxdata {
  padding: 20px 30px;
  margin: 5px 0px;
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
  color: gray;
}
.title {
  font-weight: bolder;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
