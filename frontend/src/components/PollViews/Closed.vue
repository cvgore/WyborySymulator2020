<template>
  <Tabelunia
    :survey-type="closedPolls"
    :is-loading="isLoading"
    :is-error="isError"
  />
</template>

<script>
import {mapGetters, mapState} from "vuex";
import Tabelunia from "@/components/PollViews/Tabelunia";

export default {
  name: "Closed",
  components: {Tabelunia},
  computed: {
    ...mapState('Polls',['isLoading', 'isError']),
    ...mapGetters('Polls',['closedPolls'])
  },
}
</script>
