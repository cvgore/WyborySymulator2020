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
  transition: color.2s ease-out;
}
.link:hover{
  color: #f3dfdf;
}
.router-link-active {
  color: #f1b4b4;
  text-shadow: 1px 2px 2px #211616;
}
</style>
