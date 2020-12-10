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
  color: #ffffff;
  font-weight: bold;
  text-shadow: 1px 2px 2px black;
  transition: text-shadow .2s ease-out;
}
.link:hover{
  color: black;
  text-shadow: 1px 2px 2px white;
}
.router-link-active {
  color: black;
  text-shadow: 1px 2px 2px white;
}
</style>
