<template>
  <MarginatorTopator>
    <section>
      <article>
        <SuspenseWithError>
          <template #default>
            <SurveyList />
          </template>
          <template #fallback>
            <p>loading...</p>
          </template>
          <template #error>
            <h1>Serwer nie działa i chuj</h1>
          </template>
        </SuspenseWithError>
      </article>
    </section>
  </MarginatorTopator>
</template>

<script>
import SurveyList from '../components/Surveys/SurveysList/SurveyList';
import SuspenseWithError from '../components/SuspenseWithError/SuspenseWithError';
import MarginatorTopator from "@/components/UI/MarginatorTopator";
export default {
  name: 'Surveys',
  components: {
    MarginatorTopator,
    SuspenseWithError,
    SurveyList,
  },
};

</script>

