<template>
  <div class="boxx section is-flex is-flex-direction-column is-justify-content-center is-align-items-center container">
    <figure class="image is-128x128 my-3">
      <img src="@/assets/happy-man.png" alt="icon hm">
    </figure>
    <div class="columns is-centered">
      <div class="column">
        <p class="title is-size-4 has-text-info">Ahoj, {{onlyName}}</p>
      </div>
    </div>
    <p class="subtitle is-size-5 has-text-info">Oto twoje ankiety:</p>
    <p class="is-bold is-danger">{{data}}</p>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {useGet} from "../../../hooks/useGet";

export default {
  name: "ListPolls",
  computed: {
    ...mapState('Auth',['email']),
    onlyName(){
      return this.email.substring(0,this.email.indexOf('@'));
    }
  },
  setup(){
    const { data } = useGet('/poll');
    console.log(data)
    return {
      data
    }
  }
}
</script>

<style scoped>

</style>
