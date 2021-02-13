<template>
  <SuspenseWithError>
    <template #default>
      <Filator />
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
</template>
<script>
import SuspenseWithError from "@/components/SuspenseWithError/SuspenseWithError";
import ErrorNotify from "@/components/ErrorsNotify/ErrorNotify";
import Spinner from "@/components/UI/Spinner";
import Filator from "@/components/QuestionList/Filator";
export default {
  name: "PollPreview",
  components: {Filator, Spinner, SuspenseWithError, ErrorNotify},
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
