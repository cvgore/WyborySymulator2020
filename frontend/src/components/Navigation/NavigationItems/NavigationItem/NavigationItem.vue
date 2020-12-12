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
  color: black;
  font-weight: inherit;
  transition: font-weight .2s ease;
}
.link:hover{
  color:slategray;
}
.router-link-active {
  color: #090303;
  font-weight: bold;
}
</style>
