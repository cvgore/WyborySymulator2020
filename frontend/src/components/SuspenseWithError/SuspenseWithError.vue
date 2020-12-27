<template>
  <slot v-if="" name="error"></slot>
  <Suspense>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #fallback>
      <slot name="fallback"></slot>
    </template>
  </Suspense>
</template>

<script>
import { ref, onErrorCaptured } from 'vue';

export default {
  name: 'SuspenseWithError',
  setup(){
    const error = ref(null);
    onErrorCaptured((e) => {
      error.value = e
      return true;
    })
    return {error}
  }
};
</script>

<style scoped></style>
