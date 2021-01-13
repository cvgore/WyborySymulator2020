<template>
  <main>
    <Navigation />
    <slot/>
  </main>
</template>

<script>

import Navigation from "@/components/Navigation/Navigation";
export default {
  name: 'Layout',
  components: {Navigation},
  data() {
    return {
      showSideDrawer: false,
    };
  },
};
</script>
<style>
</style>
