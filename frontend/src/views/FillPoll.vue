<template>
  <MarginatorTopator> siema {{ id }} </MarginatorTopator>
</template>

<script>
import MarginatorTopator from '@/components/UI/MarginatorTopator';
export default {
  name: 'FillPoll',
  components: { MarginatorTopator },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped></style>
