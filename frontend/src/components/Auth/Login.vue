<template>
  <section class="is-flex is-justify-content-center is-align-items-center is-full-height p-6">
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label">Email</label>
        <!--     veevalidate  <p class="help is-danger">This email is invalid</p> -->
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
            :class="{'is-loading':state.isSending}"
            type="submit"
          >
            Zaloguj sie
          </button>
        </div>
        <div>
          <pre v-if="state.response">{{ state.response }}</pre>
          <p v-else-if="state.error.condition">Błąd serwera</p>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import Layout from '@/components/Layout';
import {reactive} from "vue";
import axios from "@/axios";
import { useRouter } from "vue-router";
import { useReCaptcha } from 'vue-recaptcha-v3'
import {useStore} from "vuex";
export default {
  name: 'Login',
  components: { Layout },
  setup(){
    const {executeRecaptcha,recaptchaLoaded} = useReCaptcha();
    const store = useStore();
    const state = reactive({
      email: '',
      isSending: false,
      error: {
        condition: false,
        msg: ''
      },
      response: null
    });
    const router = useRouter();
    async function submitForm(){
      try {
        state.isSending = true;
        const toSend = {
          email: state.email
        }
        const {data} = await axios.post('/user/login/request',toSend);
        state.response = data;
      } catch (e) {
        state.error.condition = true;
        state.error.msg = e.message;
      } finally {
        state.isSending = false;
        store.commit('Auth/changeEmail',state.email);
        router.replace('2fa');
      }
    }
    return {
      state,
      submitForm,
    }
  }
};
</script>
