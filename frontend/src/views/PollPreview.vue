<template>
  <section class="hero is-info">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{pickedPoll.name}}
        </h1>
        <h2 class="subtitle">
          Może autor
        </h2>
      </div>
    </div>
  </section>
  <SuspenseWithError>
    <template #default>
      <QuestionList />
    </template>
    <template #fallback>
      <progress class="progress is-small is-primary" max="100">50%</progress>
    </template>
    <template #error>
      <ErrorNotify />
    </template>
  </SuspenseWithError>
  <QuestionList />
</template>
<script>
import {mapGetters} from "vuex";
import QuestionList from "@/components/QuestionList/QuestionList";
import SuspenseWithError from "@/components/SuspenseWithError/SuspenseWithError";
import ErrorNotify from "@/components/ErrorsNotify/ErrorNotify";
export default {
  name: "PollPreview",
  components: {SuspenseWithError, QuestionList, ErrorNotify},
  data(){
    return {
      pickedPoll: null
    }
  },
  computed: {
    ...mapGetters('Polls',['getPollById']),
  },
  created() {
    const {params} = this.$route;
    this.pickedPoll = this.getPollById(parseInt(params.id))
  }
}
</script>
