<template>
  <section>
    <section class="cards-container">
      <QuizCardsList/>
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
import QuizCardsList from '@/components/QuizCardsList.vue';

export default {
  name: 'Content',
  components: {
    QuizCardsList,
  },
};
</script>

<style scoped>
.button-area {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

.cards-container {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 150px;
  grid-gap: 50px 40px;
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
  outline: none;
  cursor: pointer;
}

.active-btn:hover {
  background-color: hsl(0, 78%, 88%);
}

@media (min-width: 600px) {
  .button-area {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

  .cards-container {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 150px;
    grid-gap: 50px 40px;
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
    outline: none;
    cursor: pointer;
  }

  .active-btn:hover {
    background-color: hsl(0, 78%, 88%);
  }
}
</style>
