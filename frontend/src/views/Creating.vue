<template>
<div class="columns">
  <div class="column is-four-fifths"></div>
  <div class="column"></div>
  <div class="column"></div>
</div>
<div class="steps" id="stepsDemo">
  <div class="steps-content">
    <div class="step-content has-text-centered is-active">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Nazwa Ankiety</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" name="nazwa ankiety" id="Pool" type="text" placeholder="nazwa ankiety" autofocus data-validate="require">
            </div>
          </div>
        </div>
      </div>
      
      <div class="field is-horizontal">
        
      </div>
    </div>
    <div class="step-content has-text-centered">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Pytanie</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" name="pytanie" id="Question" type="text" placeholder="pytanie" autofocus data-validate="require">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
      </div>
    </div>
    </div>
    <div class="steps-actions">
  </div>
</div>


<div class="field">

  <div class="columns">
    <div class="column is-10 is-offset-1">
      <input class="which-answer" id="exampleRadioInline1" type="radio" placeholder="nazwa ankiety" name="exampleRadioInline" checked="checked">
        <label for="exampleRadioInline1">
          <div class="control">
            <input class="input" id="Pool" type="text" placeholder="odpowiedz 1" autofocus data-validate="require">
          </div>
        </label>
      </div>
    </div>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <input class="which-answer" id="exampleRadioInline1" type="radio" placeholder="nazwa ankiety" name="exampleRadioInline" checked="checked">
        <label for="exampleRadioInline1">
          <div class="control">
            <input class="input" id="Pool" type="text" placeholder="odpowiedz 1" autofocus data-validate="require">
          </div>
        </label>
      </div>
    </div>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <input class="which-answer" id="exampleRadioInline1" type="radio" placeholder="nazwa ankiety" name="exampleRadioInline" checked="checked">
        <label for="exampleRadioInline1">
          <div class="control">
            <input class="input" id="Pool" type="text" placeholder="odpowiedz 1" autofocus data-validate="require">
          </div>
        </label>
      </div>
    </div>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <input class="which-answer" id="exampleRadioInline1" type="radio" placeholder="nazwa ankiety" name="exampleRadioInline" checked="checked">
        <label for="exampleRadioInline1">
          <div class="control">
            <input class="input" id="Pool" type="text" placeholder="odpowiedz 1" autofocus data-validate="require">
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Creating"
}
</script>

<style scoped>

</style>
