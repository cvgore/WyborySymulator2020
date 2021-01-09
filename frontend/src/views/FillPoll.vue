<template>
  <MarginatorTopator>
    <p>siema</p>
    <div>
      {{id}}
    </div>
  </MarginatorTopator>
</template>

<script>
import MarginatorTopator from '@/components/UI/MarginatorTopator';
import { useStore } from 'vuex';
import {useRoute} from "vue-router";
export default {
  name: 'FillPoll',
  components: { MarginatorTopator },
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = parseInt(route.params.id);
    const pickedPoll = store.state.poll.polls.find(el => el.id === id);
    console.log(pickedPoll);
    return {
      id,
    }
  },
};
</script>
