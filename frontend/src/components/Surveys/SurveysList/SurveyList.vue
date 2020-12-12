<template>
  <SurveyItem
    v-for="post in surveys"
    :post="post"
    :key="post.id"
  />
</template>

<script>
import { ref } from 'vue';
import axios from '@/axios';
import SurveyItem from '@/components/Surveys/SurveyItem/SurveyItem.vue';

export default {
  name: 'SurveyList',
  components: { SurveyItem },
  async setup() {
    const surveys = ref(null);
    const result = await axios.get('/posts');
    surveys.value = result.data;
    return {
      surveys,
    };
  },
};
</script>

<style scoped>

</style>
