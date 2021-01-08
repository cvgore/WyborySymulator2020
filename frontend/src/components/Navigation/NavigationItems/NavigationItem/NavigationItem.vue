<template>
  <div>
    <router-link
      :to="link"
      class="link"
    >
      <slot/>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavigationItem',
  props: {
    link: String,
  },
};
</script>

<style scoped>
.link {
  text-decoration: none;
  color: hsl(15, 88%, 62%);
  font-weight: 700;
  transition: font-weight .2s ease;
  font-size: 1.3em;
}
.link:hover{
  color: hsl(15, 88%, 52%);
}
.router-link-active {
  color: hsl(15, 58%, 62%);
  font-weight: bold;
}
</style>
