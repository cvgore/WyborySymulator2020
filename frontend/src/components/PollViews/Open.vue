<template>
  <Tabelunia
    :survey-type="openedPolls"
    :is-loading="isLoading"
    :is-error="isError"
  />
</template>

<script>
import {mapGetters, mapState} from "vuex";
import Tabelunia from "@/components/PollViews/Tabelunia";
export default {
  name: "PollList",
  components: {
    Tabelunia
  },
  computed: {
    ...mapState('Polls',['isLoading', 'isError']),
    ...mapGetters('Polls',['openedPolls'])
  },
}
</script>
