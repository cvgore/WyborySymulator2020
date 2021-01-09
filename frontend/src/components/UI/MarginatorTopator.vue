<template>
<div class="wrapper">
  <slot />
</div>
</template>

<script>
export default {
  name: "MarginatorTopator"
}
</script>

<style scoped>
@media (min-width: 500px) {
  .wrapper {
    margin-top: 120px;
  }
}
</style>
