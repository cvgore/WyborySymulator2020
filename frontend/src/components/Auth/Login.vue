<template>
  <section class="section is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
    <figure class="image is-128x128 my-5">
      <img src="@/assets/sheep.png" alt="icon">
    </figure>
    <Form @submit="submitForm">
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <Field
            :rules="emailRules"
            name="email"
            class="input"
            type="email"
            placeholder="Wpisz swój mail"
            v-model="state.email"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
        <ErrorMessage name="email" class="help is-danger is-size-6"/>
      </div>
      <div class="field is-grouped is-flex is-align-items-center is-flex-direction-column">
        <div class="control m-4">
          <button
            class="button is-link"
            :class="{'is-loading': state.apiData && state.apiData.isLoading}"
            type="submit"
          >
            Wyślij kod
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
import Layout from '@/components/Layout';
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {usePost} from "../../../hooks/usePost";
import { Form,Field,ErrorMessage } from 'vee-validate';
import yup from '@/yup-settings'
export default {
  name: 'Login',
  components: { Layout,Form,Field,ErrorMessage },
  data(){
    return {
      emailRules: yup.string()
        .required('Pole jest wymagane')
        .email('Niepoprawny email')
    }
  },
  setup(){
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      email: '',
      apiData: null
    });
    async function submitForm(){
      const response = await usePost('/user/login/request', {
        email: state.email
      });
      state.apiData = response;
      if(response.statusCode === 201){
        store.commit('Auth/changeEmail',state.email);
        await router.replace('2fa');
      }
    }
    return {
      state,
      submitForm,
    }
  }
};
</script>
