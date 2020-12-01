<template>
  <section>
    <p class="pager">
      ANKIETY TAKIE ŻE SIE ZESRACIE
    </p>
    <section class="cards-container">
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
    </section>
    <section class="button-area">
      <button class="active-btn">
      <span>
        Start Quiz
      </span>
      </button>
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
.button-area {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.active-btn {
  font-weight: 700;
  width: 200px;
  height: 50px;
  color: hsl(0, 0%, 23%);
  display: flex;
  justify-content: center;
  border: 0;
  align-items: center;
  background-color: hsl(0, 41%, 88%);
  border-radius: 30px;
  font-size: 1.3em;
}

.pager {
  display: flex;
  justify-content: center;
  color: hsl(247, 94%, 64%);
  font-weight: bold;
  margin: 0 0 85px;
}
</style>
