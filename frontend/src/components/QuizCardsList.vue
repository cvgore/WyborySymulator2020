<template>
  <QuizCard
    v-for="(item) in polls"
    :key="item.id"
    :item="item"
  />
</template>

<script>
import { ref } from 'vue';
import QuizCard from '@/components/QuizCard.vue';

export default {
  name: 'QuizCardsList',
  components: {
    QuizCard,
  },
  setup() {
    // const pickedPollId = ref(0);

    const polls = ref([
      {
        id: 1,
        name: 'Ankieta 1',
        description: 'Zabijcie mnie',
        author: 'Wacula1',
      },
      {
        id: 2,
        name: 'Ankieta 2',
        description: 'Ja pierdole co to jest',
        author: 'Wacula2',
      },
      {
        id: 3,
        name: 'Ankieta 3',
        description: 'Rysiek pomóż',
        author: 'Wacula3',
      },
      {
        id: 3,
        name: 'Ankieta 3',
        description: 'Gramy w wormsy?',
        author: 'Wacula4',
      },
      {
        id: 4,
        name: 'Ankieta 3',
        description: 'Gramy w wormsy?',
        author: 'Wacula4',
      },
      {
        id: 5,
        name: 'Ankieta 3',
        description: 'Gramy w wormsy?',
        author: 'Wacula4',
      },
      {
        id: 6,
        name: 'Ankieta 3',
        description: 'Gramy w wormsy?',
        author: 'Wacula4',
      },
    ]);
    return { polls };
  },
};
</script>

<style scoped>

</style>
