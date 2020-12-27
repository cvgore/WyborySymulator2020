<template>
  <section>
    <section class="marg">
      <div>
        <p class="surv-txt">Open Surveys</p>
      </div>
      <article class="box">
        <SuspenseWithError>
          <template #default>
            <SurveyList />
          </template>
          <template #fallback>
            <p>loading...</p>
          </template>
          <template #error>
            <h1>i failed to load</h1>
          </template>
        </SuspenseWithError>
        <SurveyList />
      </article>
      <div>
        <p class="surv-txt">Closed Surveys</p>
      </div>
      <article class="box">
        <p>co</p>
      </article>
    </section>
  </section>
</template>

<script>
import SurveyList from '../components/Surveys/SurveysList/SurveyList';
import SuspenseWithError from '../components/SuspenseWithError/SuspenseWithError';
export default {
  name: 'Surveys',
  components: {
    SuspenseWithError,
    SurveyList
  },
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
