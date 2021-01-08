<template>
  <MarginatorTopator>
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
  </MarginatorTopator>
</template>

<script>
import SurveyList from '../components/Surveys/SurveysList/SurveyList';
import SuspenseWithError from '../components/SuspenseWithError/SuspenseWithError';
import ProgressSpinner from 'primevue/progressspinner'
import MarginatorTopator from "@/components/UI/MarginatorTopator";
export default {
  name: 'Surveys',
  components: {
    MarginatorTopator,
    SuspenseWithError,
    SurveyList,
    ProgressSpinner
  },
};

</script>

