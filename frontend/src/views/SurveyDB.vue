<template>
  <section>
    <section class="marg">
      <div>
        <p class="surv-txt">Survey Creator</p>
      </div>
    </section>
    <h3>Vertical</h3>
    <div class="p-fluid">
      <div class="p-field">
        <label for="firstname1">Firstname</label>
        <InputText id="firstname1" type="text" />
      </div>
      <div class="p-field">
        <label for="lastname1">Lastname</label>
        <InputText id="lastname1" type="text" />
      </div>
    </div>
  </section>
</template>

<script>
import InputText from 'primevue/inputtext';

export default {
  name: 'SurveyDB',
  components: {
    InputText,
  },
};
</script>

<style scoped>
.marg > div {
  padding-left: 50px;
  display: flex;
  align-items: center;
  justify-items: center;
  background-color: #EEF1F4;
  min-height: 100px;
}
.surv-txt {
  font-size: 1.2em;
  color: #7f7b7b;
}
</style>
