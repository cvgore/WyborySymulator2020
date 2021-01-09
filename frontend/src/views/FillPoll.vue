<template>
  <MarginatorTopator>
    <section>
      <article>
        <SuspenseWithError>
          <template #default>
            <SurveyView />
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
import MarginatorTopator from '@/components/UI/MarginatorTopator';
import SurveyView from '@/components/SurveyView/SurveyView';
import SuspenseWithError from '@/components/SuspenseWithError/SuspenseWithError';
export default {
  name: 'FillPoll',
  components: { MarginatorTopator, SurveyView,SuspenseWithError },
};
</script>
