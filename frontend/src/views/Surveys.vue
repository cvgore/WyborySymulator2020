<template>
  <section>
    <section>
      <article class="box">
        <SuspenseWithError>
          <template #default>
            <SurveyList />
          </template>
          <template #fallback>
            <ProgressSpinner />
          </template>
          <template #error>
            <h1>Serwer nie działa i chuj</h1>
          </template>
        </SuspenseWithError>
        <SurveyList />
      </article>
    </section>
  </section>
</template>

<script>
import SurveyList from '../components/Surveys/SurveysList/SurveyList';
import SuspenseWithError from '../components/SuspenseWithError/SuspenseWithError';
import ProgressSpinner from 'primevue/progressspinner'
export default {
  name: 'Surveys',
  components: {
    SuspenseWithError,
    SurveyList,
    ProgressSpinner
  },
};

</script>

