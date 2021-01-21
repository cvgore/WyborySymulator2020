<template>
  <section v-if="isLoading">
    <progress class="progress is-small is-primary" max="100">50%</progress>
  </section>
  <div v-if="closedPolls.length > 0">
    {{closedPolls}}
  </div>
  <div v-if="isError.errCondition">
    <ErrorNotify />
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "Closed",
  computed: {
    ...mapState('Polls',['isLoading', 'isError']),
    ...mapGetters('Polls',['closedPolls'])
  },
}
</script>
