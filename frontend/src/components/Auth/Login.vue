<template>
  <section class="is-flex is-justify-content-center is-align-items-center is-full-height p-6">
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="email"
            placeholder="Wpisz swój mail"
            v-model="state.email"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
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

export default {
  name: 'Login',
  components: { Layout },
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
