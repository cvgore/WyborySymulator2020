<template>
  <SuspenseWithError>
    <template #default>
      <Filator />
    </template>
    <template #fallback>
      <Spinner/>
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
