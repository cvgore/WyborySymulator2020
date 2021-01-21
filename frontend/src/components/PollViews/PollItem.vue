<template>
  <tr>
    <th>
      <router-link to="/" class="has-full-width">{{ poll.name }} </router-link>
    </th>
    <td>{{ createdAt }}</td>
    <td>{{ questions }}</td>
    <td>0</td>
    <td class="has-text-success">{{ validUntil }}</td>
  </tr>
</template>

<script>
import parseDate from '@/utils/parseDate';
import axios from '@/axios';

export default {
  name: 'PollItem',
  props: {
    poll: Object,
  },
  data() {
    return {
      createdAt: parseDate(this.poll.createdAt),
      validUntil: parseDate(this.poll.validUntil),
      questions: 0,
    };
  },
  created() {
    axios
      .get(`/pollQuestion?pollId=${this.poll.id}`)
      .then(({ data }) => {
        this.questions = data.length;
      })
      .catch(() => {
        this.questions = 'Serwer coś odpierdala';
      });
  },
};
</script>

<style scoped></style>
