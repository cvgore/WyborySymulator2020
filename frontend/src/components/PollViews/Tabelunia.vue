<template>
  <div class="container is-flex is-flex-direction-column has-text-centered">
    <table v-if="surveyType.length > 0" class="table is-hoverable ">
      <thead>
      <tr>
        <th>Tytuł ankiety</th>
        <th>Data utworzenia</th>
        <th>Łącznie pytań</th>
        <th>Czas zakończenia</th>
      </tr>
      </thead>
      <tbody>
      <PollItem v-for="poll in surveyType" :key="poll.id" :poll="poll"/>
      </tbody>
    </table>
    <section v-if="isLoading">
      <progress class="progress is-small is-primary" max="100">50%</progress>
    </section>
    <div v-if="isError.errCondition">
      <ErrorNotify />
    </div>
  </div>
</template>

<script>
import ErrorNotify from "@/components/ErrorsNotify/ErrorNotify";
import PollItem from "@/components/PollViews/PollItem";
export default {
  name: "Tabelunia",
  components: {
    ErrorNotify,
    PollItem
  },
  props : {
    surveyType: Array,
    isLoading: Boolean,
    isError: Object
  }
}
</script>
