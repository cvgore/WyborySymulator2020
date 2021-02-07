<template>
  <section class="is-flex is-justify-content-center is-align-items-center is-full-height p-6">
    <form @submit.prevent="verifyHandler">
      <div class="field">
        <label class="label">Kod</label>
        <!--     veevalidate  <p class="help is-danger">This email is invalid</p> -->
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
            :class="{'is-loading':state.isSending}"
            type="submit"
          >
            Zatwierdź
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { reactive } from "vue";
import jwtDecode from "jwt-decode";
import axios from "@/axios";

export default {
  name: "Confirm",
  setup(){
    const state = reactive({
      token: null,
      isSending: false,
      error: {
        condition: false,
        msg: ''
      },
    })
    const store = useStore();
    const email = store.state.Auth.email;
    const verifyHandler = async () => {
      state.isSending = true;
      const objJsonB64 = atob(state.token);
      const decode = JSON.parse(objJsonB64);
      const toSend = {
        email,
        token: decode.token,
        ts: decode.ts,
      }
      try {
        const res = await axios.post('/user/login/authorize', toSend);
        console.log(res)
        store.commit('Auth/insertToken',{
          token: res.data.access_token,
        })
      } catch(e) {
        state.error.condition = true;
        state.error.msg = e.message;
      } finally {
        state.isSending = false;
      }
    }
    return {
      state,
      verifyHandler
    }
  }
}
</script>

<style scoped>

</style>
