<template>
  <NavBar/>
  <Content/>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Content from '@/components/Content.vue';

export default {
  name: 'Layout',
  components: {
    Content,
    NavBar,
  },
};
</script>

<style scoped lang="css">

</style>
