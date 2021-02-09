<template>
  <div class="boxx section is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
    <figure class="image is-128x128 my-5">
      <img src="@/assets/man.png" alt="icon">
    </figure>
    <p class="title is-size-2  has-text-info">Wystąpił błąd</p>
    <p class="subtitle is-size-5">
      <slot/>
    </p>
  </div>
</template>

<script>
export default {
  name: "ErrorNotify"
}
</script>

<style scoped>

</style>
