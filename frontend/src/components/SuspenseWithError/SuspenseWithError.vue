<template>
  <div v-if="error" >
    <slot name="error">
      {{error}}
    </slot>
  </div>
  <Suspense v-else>
    <template #default>
      <slot name="default"/>
    </template>
    <template #fallback>
      <div class="wrapper">
        <slot name="fallback"/>
      </div>
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

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
</style>
