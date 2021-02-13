<template>
  <div class="field is-flex is-align-items-center is-flex-direction-column">
    <p>{{ question.name }}</p>
    <div v-if="state.pollOptions" class="control">
      <label class="radio" v-for="opt in state.pollOptions">
        <input type="radio" name="answer">
        {{opt.name}}
      </label>
    </div>
    <span>{{state.pollOptions}}</span>
    <progress v-if="state.loading" class="progress is-small is-primary" max="100">50%</progress>
    <ErrorNotify v-if="state.error"/>
  </div>
</template>

<script>
import axios from '@/axios';
import { reactive } from 'vue';
import ErrorNotify from "@/components/ErrorsNotify/ErrorNotify";
export default {
  name: 'QuestionItem',
  components: {ErrorNotify},
  props: {
    question: Object,
  },
  async setup(props) {
    const state = reactive({
      pollOptions: null,
      error: false,
      loading: true,
    });
    try {
      state.loading = true;
      const { data: OptionsPoll } = await axios.get(
        `/pollOptions?pollQuestion=${props.question.id}`
      );
      state.pollOptions = OptionsPoll;
    } catch {
      state.error = true;
    } finally {
      state.loading = false;
    }
    return {
      state,
    };
  },
};
</script>

<style scoped></style>
