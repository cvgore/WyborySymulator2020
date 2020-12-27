<template>
  <router-link :to="{name: 'survey' , params: {id : post.id}}" class="boxdata">
    <div class="spec">
      <p class="title">{{ post.name }}</p>
      <p v-if="activePoll" class="surveyinfos open">Otwarta do: {{ format }}</p>
      <p v-else class="surveyinfos closed">Zamknięta</p>
    </div>
    <div class="spec">
      <span>{{questions}} pytanie/a</span>
      <span>XxX odpowiedzi <small v-if='!activePoll'>| Zobacz wyniki</small></span>
    </div>
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
    const format = parseData.toFormat('dd LLL yyyy');
    return {
      format,
      activePoll,
      questions
    };
  },
};
</script>

<style scoped>
.boxdata {
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  background-color: white;
  border-radius: 3px;
  text-decoration: none;
  color:black;
}
.boxdata:hover {
  background-color: hsl(210, 21%, 95%);
}
.closed {
  color: #a73a3a;
}
.open {
  color: gray;
}
.spec {
  display: flex;
  justify-content: space-between;
}

.spec > span,
.surveyinfos {
  font-weight: bold;
  font-size: 10px;
}
.title {
  font-weight: bolder;
  font-size: 1.4em;
  margin-bottom: 10px;
  cursor: pointer;
  color:black;
}
</style>
