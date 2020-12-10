<template>
  <section>
    <LineSpacer :title-text="'Surveys'"/>
    <section class="marg">
      <div>
        <p class="surv-txt">Open Surveys</p>
        <span>liczba</span>
        <div>

        </div>
      </div>
      <div>
        <p class="surv-txt">Closed Surveys</p>
        <span>liczba</span>
      </div>
    </section>
  </section>
</template>

<script>
import LineSpacer from '@/components/UI/LineSpacer.vue';
import { ref } from 'vue';
import axios from '@/axios';

export default {
  name: 'Surveys',
  components: {
    LineSpacer,
  },
  async setup() {
    const surveys = ref([]);
    const data = await axios.get('surveys');
    surveys.value = data.data;
  },
};
</script>

<style scoped>
.marg {
  margin-top: 25px;
}

.surv-txt {
  font-size: 1.5em;
  font-weight: 600;
}
</style>
