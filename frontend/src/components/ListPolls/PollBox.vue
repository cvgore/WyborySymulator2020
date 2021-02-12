<template>
    <section>
      <div class="card m-5">
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
        <footer class="card-footer text">
          <section>
            <div
              v-if="poll.publishedAt === null"
              class="card-footer-item has-background-light has-text-grey-light"
            >
              Wypełnij
            </div>
            <div
              v-else
              class="card-footer-item has-background-warning vc"
              @click="fillPoll(poll.id)"
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
    async fillPoll(id){
      try {
        const res = await axios.get(`/poll/${id}/link`);
        const { pollId,pollHash } = res.data;
        await this.$router.push({name: 'pickedPoll', params: {id: pollId, str: pollHash}})
      } catch (e) {
        this.errors.fill = {
          status: true,
          message: e.message
        }
      }
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
        console.log(response)
        if (response.status === 201) {
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

<style lang="scss" scoped>
.vc {
  cursor: pointer;

  &:hover {
    color: darkgoldenrod;
  }
}
.text {
  font-size: 12px;
  @media screen and (min-width: 860px){
    font-size: 17px;
  }
}
.vcc {
  user-select: none;
}
.card {
  box-shadow: 0 1px 5px rgb(206, 206, 204);
}
</style>
