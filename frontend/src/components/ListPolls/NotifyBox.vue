<template>
  <div>
    <section v-if="errors.delete">
      <div v-if="errors.delete.status" class="notification is-danger">
        <button class="delete" @click="closeNotify"/>
        Błąd podczas usuwania ankiety
        <p class="is-size-6">
          {{ state.errors.delete.message }}
        </p>
      </div>
    </section>
    <section v-if="errors.publish">
      <div v-if="errors.publish.status" class="notification is-danger">
        <button class="delete" @click="closeNotify"/>
        Błąd podczas publikowania ankiety
        <p class="is-size-6">
          {{ state.errors.publish.message }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "NotifyBox",
  props: {
    errors: Object
  },
  methods: {
    closeNotify() {
      this.errors = null;
    }
  }
}
</script>
