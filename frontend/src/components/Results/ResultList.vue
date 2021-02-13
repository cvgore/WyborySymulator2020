<template>
  <div class="wrappero">
    <section v-if="state.results.length > 0" class="ffg">
      <section class="section" v-for="v in data.questions" :key="`v-${v.id}`">
        <h1 class="title has-text-info">{{v.name}}</h1>
        <div v-for="g in v.options" :key="`g-${g.id}`" class="my-4">
          <div class="is-flex is-justify-content-space-between">
            <h2 class="is-size-4">{{g.name}}</h2>
            <p> {{setValue(g)}}</p>
          </div>
          <progress
            class="progress is-link"
            :value="setValue(g)"
            max="100"
          />
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {reactive} from "vue";
import axios from "@/axios";

export default {
  name: "ResultList",
  props: {
    data: Object
  },
  async setup() {
    const route = useRoute();
    const state = reactive({
      results: [],
    });
    const { data } = await axios.get(`/poll/${+route.params.id}/votes`);
    for (const [key, value] of Object.entries(data)) {
      state.results.push({
        id: key,
        value: value
      })
    }
    function setValue(option){
      const s = state.results.find(opt => opt.id === option.name);
      if(s){
       return s.value;
      }
      return 0;
    }
    return {
      state,
      setValue
    }
  }
}
</script>

<style lang="scss" scoped>
.wrappero {
  display: flex;
  justify-content: center;
  width: 100%;
}
.ffg {
  width: 100%;
  @media screen and (min-width: 760px){
    width: 700px;
  }
}
.section {
  width: 100%;
}
</style>
