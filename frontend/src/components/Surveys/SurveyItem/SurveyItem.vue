<template>
  <router-link :to="{ name: 'poll', params: { id: post.id } }" class="card">
    <section class="card-desc">
      <span v-if="activePoll">Open to {{format}}</span>
      <p>{{post.name}}</p>
    </section>
    <section class="card-details">
      <span>{{questions}}<br/> questions</span>
      <span>X<br/> answers</span>
    </section>
  </router-link>
</template>

<script>
import { DateTime } from 'luxon';
import { ref } from 'vue';
import axios from '../../../axios';
export default {
  name: 'SurveyItem',
  props: {
    post: Object,
  },
  async setup(props) {
    const questions = ref(null);
    const activePoll = ref(true);

    const result = await axios.get(`/pollQuestion?pollId=${props.post.id}`);
    questions.value = result.data.length;

    const parseData = DateTime.fromISO(props.post.validUntil);
    if (parseData >= DateTime.local()) {
      activePoll.value = true;
    } else {
      activePoll.value = false;
    }
    const format = parseData.toFormat('dd.LL.yyyy');
    return {
      format,
      activePoll,
      questions,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;600&display=swap');
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fcfffc;
  border-radius: 25px;
  text-decoration: none;
  color:black;
  font-family: 'Rubik', sans-serif;
}
.card-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f1f1;
  border-radius: 25px 25px 0 0;
  flex: 1;
  padding: 25px;
}
.card-desc span {
  align-self: flex-end;
  font-weight: 300;
}
.card-desc p {
  align-self: baseline;
  padding: 20px 40px;
  max-width: 300px;
  font-size: 2.5em;
  font-weight: 600;
}
.card-details {
  display: flex;
  text-align: center;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  border-radius: 0 0 25px 25px;
}
@media (min-width: 950px) {
  .card-desc p {
    align-self: center;
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
