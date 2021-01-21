<template>
  <section class="hero is-info">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{pickedPoll.name}}
        </h1>
        <h2 class="subtitle">
          Może autor
        </h2>
      </div>
    </div>
  </section>
  <form id="survey-form" class="m-5">
    <div class="field">
      <label id="email-label" class="label"> *What's yourr current status: </label>
      <div class="control">
        <div class="select">
          <select id="dropdown">
            <option>Select dropdown</option>
            <option>Married</option>
            <option>Single</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label"> *How much times do you buy on our store?</label>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="radio">
              <input type="radio" value="1" name="radio-buttons">
              1
            </label>
            <label class="radio">
              <input type="radio" value="2" name="radio-buttons">
              2
            </label>
            <label class="radio">
              <input type="radio" value="3" name="radio-buttons">
              3+
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label"> *What's the product that you like most about our store? (Check all that apply):</label>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox">
              <input value="1" type="checkbox">
              Home Things
            </label>
            <label class="checkbox">
              <input value="1" type="checkbox" name="products">
              T-shirts
            </label>
            <label class="checkbox">
              <input value="2" type="checkbox" name="products">
              Shoes
            </label>
            <label class="checkbox">
              <input value="3" type="checkbox" name="products">
              Jewelry
            </label>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
          <!-- Left empty for spacing -->
        </div>
        <div class="field">
          <div class="control">
            <button id="submit" class="button is-primary">
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name: "PollPreview",
  data(){
    return {
      pickedPoll: null
    }
  },
  computed: {
    ...mapGetters('Polls',['getPollById']),
  },
  created() {
    const {params} = this.$route;
    this.pickedPoll = this.getPollById(parseInt(params.id))
  }
}
</script>
