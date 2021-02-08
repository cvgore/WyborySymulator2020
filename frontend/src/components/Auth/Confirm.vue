<template>
  <section class="is-flex is-justify-content-center is-align-items-center is-full-height p-6">
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label">Kod</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="text"
            placeholder="Wpisz kod"
            v-model="state.token"/>
          <span class="icon is-small is-left">
            <i class="fas fa-shield-alt"></i>
          </span>
        </div>
      </div>

      <div class="field is-grouped is-flex is-align-items-center is-flex-direction-column">
        <div class="control m-4">
          <button
            class="button is-link"
            :class="{'is-loading':state.apiData && state.apiData.isLoading}"
            type="submit"
          >
            Zatwierdź
          </button>
        </div>
      </div>
      <div class="section has-text-danger">
        <p v-if="state.apiData && state.apiData.isError">Błąd: {{state.apiData.errorData.message}}</p>
      </div>
    </form>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { reactive } from "vue";
import jwtDecode from "jwt-decode";
import axios from "@/axios";
import {useRouter} from "vue-router";
import {usePost} from "../../../hooks/usePost";

export default {
  name: "Confirm",
  setup(){
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      token: null,
      apiData: null
    });
    async function submitForm(){
      const objJsonB64 = atob(state.token);
      const decode = JSON.parse(objJsonB64);
      const response = await usePost('/user/login/authorize', {
        email: store.state.Auth.email,
        token: decode.token,
        ts: decode.ts,
      });
      state.apiData = response;
      if(response.statusCode === 201){
        store.commit('Auth/insertToken',{
          token: response.data.access_token
        });
        store.commit('Auth/changeAuth',true);

        await router.replace('/');
      }
    }
    return {
      state,
      submitForm
    }
  }
}
</script>

<style scoped>

</style>
