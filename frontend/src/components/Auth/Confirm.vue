<template>
  <section class="section is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
    <figure class="image is-128x128 my-5">
      <img src="@/assets/sheep2.png" alt="icon">
    </figure>
    <Form @submit="submitForm">
      <div class="field">
        <label class="label">Kod</label>
        <div class="control has-icons-left has-icons-right">
          <Field
            :rules="codeRules"
            name="codex64"
            class="input"
            type="text"
            placeholder="Wpisz kod"
            v-model="state.token"/>
          <span class="icon is-small is-left">
            <i class="fas fa-shield-alt"></i>
          </span>
        </div>
        <ErrorMessage name="codex64" class="help is-danger is-size-6"/>
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
        <div v-if="state.loginAttempts > 0" class="has-text-info">
          <p class="is-bold">
            Niepoprawny kod,
            Pozostały ci <strong class="is-danger">{{3 - state.loginAttempts}} </strong> próby
          </p>
        </div>
      </div>
<!--      <div class="section has-text-danger">-->
<!--        <p v-if="state.apiData && state.apiData.isError">Błąd: {{state.apiData.errorData.message}}</p>-->
<!--      </div>-->
    </Form>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { reactive } from "vue";
import {useRoute, useRouter} from "vue-router";
import {usePost} from "@/utils/usePost";
import { Form,Field,ErrorMessage } from 'vee-validate';
import yup from "@/yup-settings";
import axios from "@/axios";
export default {
  name: "Confirm",
  components: { Form,Field,ErrorMessage },
  data(){
    return {
      codeRules: yup.string()
        .required('Pole jest wymagane').min(15)
    }
  },
  setup(){
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      token: '',
      apiData: null,
      loginAttempts: 0,
    });
    if(route.hash){
      state.token = route.hash.replace('#','');
    }
    async function submitForm(){
      const objJsonB64 = atob(state.token);
      const decode = JSON.parse(objJsonB64);
      const response = await usePost('/user/login/authorize', {
        email: window.localStorage.getItem('email'),
        token: decode.token,
        ts: decode.ts,
      });
      state.apiData = response;
      state.token = '';
      if(response.statusCode === 201){
        window.localStorage.setItem('token', response.data.access_token);
        window.localStorage.setItem('status', 'logged');
        axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`;
        await store.dispatch('Auth/checkAuth');
        await router.replace('/');
      } else {
        if(state.loginAttempts + 1 <= 3){
          state.loginAttempts += 1;
        } else {
          await router.replace('/')
        }
      }
    }
    return {
      state,
      submitForm,
    }
  }
}
</script>

