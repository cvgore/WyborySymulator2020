<template>
  <section>
    <p class="pager">
      ANKIETY TAKIE ŻE SIE ZESRACIE
    </p>
    <section class="cards-container">
      <QuizCard/>
    </section>
  </section>
</template>

<script>
import QuizCard from '@/components/QuizCard.vue';

export default {
  name: 'Content',
  components: {
    QuizCard,
  },
};
</script>

<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.pager {
  display: flex;
  justify-content: center;
  color: hsl(247, 94%, 64%);
  font-weight: bold;
  margin: 0 0 85px;
}
</style>
