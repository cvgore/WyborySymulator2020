<template>
<div class="columns is-10 is-offset-1">
  <div class="column is-four-fifths "></div>
  <div class="column  "></div>
  <div class="column "></div>
</div>

    <div class="field">
  <label class="label">Nazwa Ankiety</label>
  <div class="control">
    <input class="input" type="text" placeholder="e.g Alex Smith">
  </div>
</div>

<div class="field">
  <label class="label">Pytanie</label>
  <div class="control">
    <input class="input" type="email" placeholder="e.g. alexsmith@gmail.com">
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
                            <input class="input" id="Pool" type="text" placeholder="odpowiedz 2" autofocus data-validate="require">
                          </div>
                          </label>
                    </div>
                  </div>
                    <div class="columns">
                      <div class="column is-10 is-offset-1">
                        <input class="which-answer" id="exampleRadioInline1" type="radio" placeholder="nazwa ankiety" name="exampleRadioInline" checked="checked">
                          <label for="exampleRadioInline1">
                            <div class="control">
                            <input class="input" id="Pool" type="text" placeholder="odpowiedz 3" autofocus data-validate="require">
                            </div>
                          </label>
                      </div>
                    </div>
                      <div class="columns">
                        <div class="column is-10 is-offset-1">
                          <input class="which-answer" id="exampleRadioInline1" type="radio" placeholder="nazwa ankiety" name="exampleRadioInline" checked="checked">
                            <label for="exampleRadioInline1">
                              <div class="control">
                                <input class="input" id="Pool" type="text" placeholder="odpowiedz 4" autofocus data-validate="require">
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
