<template>

</template>

<script>
import { ref } from 'vue';
import axios from '@/axios';

export default {
  name: 'SurveyList',
  async setup() {
    const surveys = ref(null);
    const result = await axios.get('/surveys');
    surveys.value = [...result.data.surveys];
    return {
      surveys,
    };
  },
};
</script>

<style scoped>

</style>
