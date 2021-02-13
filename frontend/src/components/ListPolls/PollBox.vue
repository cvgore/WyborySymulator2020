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
            <button
              class="button card-footer-item is-warning vc"
              :disabled="poll.publishedAt === null"
              @click="fillPoll(poll.id)"
              :class="{'is-loading':loaders.fillPoll}"
            >
              Wypełnij
            </button>
          </section>
          <section>
            <button
              class="button card-footer-item is-warning is-light vc"
              @click="getResults(poll.id,poll)"
              :disabled="poll.publishedAt === null"
            >
              Zobacz wyniki
            </button>
          </section>
          <section>
            <button
              class="button card-footer-item is-info is-light vc"
              @click="passEditData(poll)"
              :disabled="poll.publishedAt !== null"
              :class="{'is-loading':loaders.edit}"
            >
              Edytuj
            </button>
          </section>
          <section>
            <button
              class="button card-footer-item is-danger vc"
              @click="deletePoll(poll.id)"
              :class="{'is-loading':loaders.delete}"
            >
              Usuń
            </button>
          </section>
          <section>
            <button
              :disabled="poll.publishedAt !== null"
              class="button card-footer-item is-info vc"
              @click="publishPoll(poll.id)"
              :class="{'is-loading':loaders.publish}"
            >
              Publikuj
            </button>
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
    errors: Object,
  },
  data(){
    return {
      loaders: {
        fillPoll: false,
        delete: false,
        edit: false,
        publish: false
      }
    }
  },
  methods: {
    parseDate,
    countQuestions(data) {
      return data.length
    },
    async fillPoll(id){
      try {
        this.loaders.fillPoll = true;
        const res = await axios.get(`/poll/${id}/link`);
        const { pollId,pollHash } = res.data;
        await this.$router.push({name: 'pickedPoll', params: {id: pollId, str: pollHash}});
      } catch (e) {
        this.errors.fill = {
          status: true,
          message: e.message
        }
      } finally {
        this.loaders.fillPoll = false;
      }
    },
    async deletePoll(id) {
      try {
        this.loaders.delete = true;
        const response = await axios.delete(`/poll/${id}`);
        if (response.status === 204) {
          await this.fetchAllHandler();
        }
      } catch (e) {
        this.errors.delete = {
          status: true,
          message: e.message
        }
      } finally {
        this.loaders.delete = false;
      }
    },
    async publishPoll(id) {
      try {
        this.loaders.publish = true;
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
      } finally {
        this.loaders.publish = false;
      }
    },
    getResults(id,data){
      this.$store.commit('Polls/passPickedData', data);
      this.$router.push({name: 'results', params: {id}});
    },
    passEditData(data) {
      this.$store.commit('Polls/passEditData', data);
      this.$router.push('/creator');
    },
  },
}
</script>

<style lang="scss" scoped>
.vc {
  cursor: pointer;
  height: 100%;
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
  height: 100%;
  user-select: none;
}
.card {
  box-shadow: 0 1px 5px rgb(206, 206, 204);
}
</style>
