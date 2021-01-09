<template>
  <MarginatorTopator>
    <section class="quest-wrapper">
      <h3>{{pickedPoll.name}}</h3>
      <p>Open until : {{date}}</p>
    </section>
  </MarginatorTopator>
</template>

<script>
import MarginatorTopator from '@/components/UI/MarginatorTopator';
import { useStore } from 'vuex';
import {useRoute} from "vue-router";
import axios from "@/axios";
import {ref} from "vue";
import {DateTime} from "luxon";
export default {
  name: 'FillPoll',
  components: { MarginatorTopator },
  async setup() {
    const questions = ref(null);
    const store = useStore();
    const route = useRoute();
    const id = parseInt(route.params.id);
    const pickedPoll = store.state.poll.polls.find(el => el.id === id);
    const {data} = await axios.get(`/pollQuestion?pollId=${id}`);
    questions.value = data;
    const parseData = DateTime.fromISO(pickedPoll.validUntil);
    const date = parseData.toFormat('dd.LL.yyyy');
    return {
      id,
      pickedPoll,
      questions,
      date
    }
  },
};
</script>
<style scoped>
.quest-wrapper {
  width: 100%;
  padding: 0 50px;
  display: flex;
  justify-content: space-around;
}
</style>
