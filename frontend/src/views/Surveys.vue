<template>
  <section>
    <section class="marg">
      <div>
        <p class="surv-txt">Open Surveys</p>
      </div>
      <article class="box">
        <SurveyList />
      </article>
      <div>
        <p class="surv-txt">Closed Surveys</p>
      </div>
      <article class="box">
        <SurveyList />
      </article>
    </section>
  </section>
</template>

<script>
import SurveyList from '@/components/Surveys/SurveysList/SurveyList.vue';

export default {
  name: 'Surveys',
  components: { SurveyList },
};

</script>

<style scoped>
.marg > div {
  padding-left: 50px;
  display: flex;
  align-items: center;
  justify-items: center;
  background-color: #eef1f4;
  min-height: 100px;
}
.surv-txt {
  font-size: 1.2em;
  color: #7f7b7b;
}
.box {
  background-color: hsl(201, 28%, 90%);
  min-height: max-content;
  padding: 20px 50px;
}
</style>
