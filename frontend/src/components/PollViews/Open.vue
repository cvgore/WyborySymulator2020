<template>
  <div class="container is-flex is-flex-direction-column has-text-centered">
    <table class="table is-hoverable">
      <thead>
      <tr>
        <th>Tytuł ankiety</th>
        <th>Data utworzenia</th>
        <th>Łącznie pytań</th>
        <th>Wypełniono</th>
        <th>Czas zakończenia</th>
      </tr>
      </thead>
      <tbody v-if="openedPolls.length > 0">
        <PollItem v-for="poll in openedPolls" :key="poll.id" :poll="poll"/>
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
import {mapGetters, mapState} from "vuex";
import ErrorNotify from "@/components/ErrorsNotify/ErrorNotify";
import PollItem from "@/components/PollViews/PollItem";

export default {
  name: "PollList",
  components: {PollItem, ErrorNotify},
  computed: {
    ...mapState('Polls',['isLoading', 'isError']),
    ...mapGetters('Polls',['openedPolls'])
  },
}
</script>
