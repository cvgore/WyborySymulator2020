<template>
  <section class="container">
    <div class="card-category">
      <p>Open</p>
    </div>
    <div class="cards-container">
      <SurveyItem v-for="post in openedPolls" :post="post" :key="post.id" />
    </div>
    <div class="card-category">
    <p>Closed</p>
    </div>
    <div class="cards-container">
      <SurveyItem v-for="post in closedPolls" :post="post" :key="post.id" />
    </div>
  </section>
</template>

<script>
import { DateTime } from 'luxon';
import { ref } from 'vue';
import axios from '@/axios';
import SurveyItem from '../SurveyItem/SurveyItem';
import {useStore} from 'vuex';
import {STORE_POLLS} from "../../../store/mutations.type";
export default {
  name: 'SurveyList',
  components: { SurveyItem },
  async setup() {
    const store = useStore();
    const surveys = ref(null);
    const openedPolls = ref([]);
    const closedPolls = ref([]);
    const { data } = await axios.get('/polls');
    surveys.value = data;
    await store.commit(STORE_POLLS,data);
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
.cards-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 250px;
  grid-gap: 20px 0;
}
.container {
  padding: 0 20px;
}
.card-category {
  display: flex;
  margin: 50px 0;
}
.card-category p {
  font-weight: 700;
  margin: 0 20px 0 0;
  font-size: 1.8em;
}
@media (min-width: 500px) {
  .container {
    padding: 0 80px;
  }
  .card-category p {
    font-size: 1.3em;
  }
}
@media(min-width: 950px) {
  .cards-container {
    grid-template-columns: repeat(3,1fr);
    grid-auto-rows: 350px;
    grid-gap: 20px;
  }
}
</style>
