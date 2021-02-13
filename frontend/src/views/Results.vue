<template>
  <main v-if="state.data">
    <section class="section has-background-warning">
      <h1 class="title">{{ state.data.name }}</h1>
    </section>
    <SuspenseWithError>
      <template #default>
        <ResultList :data="state.data"/>
      </template>
      <template #fallback>
        <div class="center">
          <Spinner/>
        </div>
      </template>
      <template #error>
        <ErrorNotify/>
      </template>
    </SuspenseWithError>
  </main>
</template>

<script>
import {useStore} from "vuex";
import Spinner from "@/components/UI/Spinner";
import ErrorNotify from "@/components/ErrorsNotify/ErrorNotify";
import {onUnmounted, reactive} from "vue";
import SuspenseWithError from "@/components/SuspenseWithError/SuspenseWithError";
import ResultList from "@/components/Results/ResultList";

export default {
  name: "Results",
  components: {ResultList, SuspenseWithError,Spinner,ErrorNotify},
  setup() {
    const store = useStore();
    const state = reactive({
      data: null
    })
    if (store.state.Polls.data) {
      state.data = store.state.Polls.data;
    }
    onUnmounted(() => {
      store.commit('Polls/resetPickedData');
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
.center {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
