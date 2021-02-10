<template>
    <section class="section">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{ poll.name }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            Pytań: <strong>{{ countQuestions(poll.questions) }}</strong>
            <br>
            <time datetime="2016-1-1">Utworzono: <strong>{{ parseDate(poll.createdAt) }}</strong></time>
          </div>
        </div>
        <footer class="card-footer">
          <section>
            <div
              v-if="poll.publishedAt === null"
              class="card-footer-item has-background-light has-text-grey-light"
            >
              Wypełnij
            </div>
<!--            <router-link-->
<!--              v-else-->
<!--              :to="{ path: `/polls/${poll.id}` }"-->
<!--              exact class="card-footer-item has-background-warning"-->
<!--            >-->
<!--              Wypełnij-->
<!--            </router-link>-->
            <div
              v-else
              class="card-footer-item has-background-warning-light vc"
              @click="check(poll.id)"
            >
              Wypełnij
            </div>
          </section>
          <div class="card-footer-item has-background-warning-light vc"
               @click="passEditData(poll)"
          >
            Edytuj
          </div>
          <div
            class="card-footer-item has-background-warning-light vc"
            @click="deletePoll(poll.id)"
          >
            Usuń
          </div>
          <section>
            <div
              v-if="poll.publishedAt === null"
              class="card-footer-item has-background-info-light vc"
              @click="publishPoll(poll.id)"
            >
              Publikuj
            </div>
            <div
              v-else
              class="card-footer-item has-background-light has-text-grey-light vcc"
            >
              Publikuj
            </div>
          </section>
        </footer>
      </div>
    </section>
</template>

<script>
import parseDate from "@/utils/parseDate";
import axios from "@/axios";

export default {
  name: "PollBox",
  props: {
    poll: Object,
    fetchAllHandler: Function,
    errors: Object
  },
  methods: {
    parseDate,
    countQuestions(data) {
      return data.length
    },
    async check(id){
      const res = await axios.get(`/poll/${id}/link`);
      const s = new URL(res.data.url);
      console.log(res.data)
    },
    async deletePoll(id) {
      try {
        const response = await axios.delete(`/poll/${id}`);
        if (response.status === 204) {
          await this.fetchAllHandler();
        }
      } catch (e) {
        this.errors.delete = {
          status: true,
          message: e.message
        }
      }
    },
    async publishPoll(id) {
      try {
        const response = await axios.post(`/poll/${id}/publish`);
        if (response.status === 204) {
          await this.fetchAllHandler();
        }
      } catch (e) {
        this.errors.publish = {
          status: true,
          message: e.message
        }
      }
    },
    passEditData(data) {
      this.$store.commit('Polls/editData', data);
      this.$router.push('/creator');
    },
  },
}
</script>

<style scoped>
.vc {
  cursor: pointer;

  &:hover {
    color: darkgoldenrod;
  }
}
.vcc {
  user-select: none;
}
</style>
