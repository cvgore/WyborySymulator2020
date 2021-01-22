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
  name: "Register",
  setup(){
    const state = reactive({
      token: null
    })
    const store = useStore();
    const email = store.state.Auth.email;
    const verifyHandler = async () => {
      const decode = jwtDecode(state.token);
      const toSend = {
        email,
        token: decode,
        ts: decode
      }
      try {
        const res = await axios.post('/user/login/authorize', toSend);
        store.commit('Auth/insertToken',{
          token: decode,
          ts: decode
        })
      } catch {
        console.log('ua')
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
