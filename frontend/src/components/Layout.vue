<template>
  <Navigation/>
  <slot/>
</template>
<script>
import Navigation from "@/components/Navigation/Navigation";

export default {
  name: 'Layout',
  components: {
    Navigation
  }
};
</script>
