<template>
  <div class="pollState">
    <p class="surv-txt">Open Surveys ( {{ openedPolls.length }} )</p>
  </div>
  <section class="surveywrapper">
    <SurveyItem v-for="post in openedPolls" :post="post" :key="post.id" />
  </section>
  <div class="pollState">
    <p class="surv-txt">Closed Surveys ( {{ closedPolls.length }} )</p>
  </div>
  <section class="surveywrapper">
    <SurveyItem v-for="post in closedPolls" :post="post" :key="post.id" />
  </section>
</template>

<script>
import { DateTime } from 'luxon';
import { ref } from 'vue';
import axios from '@/axios';
import SurveyItem from '@/components/Surveys/SurveyItem/SurveyItem.vue';
import Badge from 'primevue/badge';
export default {
  name: 'SurveyList',
  components: { SurveyItem, Badge },
  async setup() {
    const surveys = ref(null);
    const openedPolls = ref([]);
    const closedPolls = ref([]);
    const result = await axios.get('/polls');
    surveys.value = result.data;

    surveys.value.forEach((poll) => {
      const check = DateTime.fromISO(poll.validUntil) >= DateTime.local();
      if (check) {
        openedPolls.value.push(poll);
      } else {
        closedPolls.value.push(poll);
      }
    });

    return {
      openedPolls,
      closedPolls,
      surveys,
    };
  },
};
</script>

<style scoped>
.surv-txt {
  font-size: 1.2em;
  color: #7f7b7b;
}
.surveywrapper {
  display: grid;
  grid-template-columns: minmax(auto, 800px);
  grid-gap: 10px;
  justify-content: center;
  padding: 10px;
}
.pollState {
  padding-left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef1f4;
  min-height: 100px;
}
</style>
