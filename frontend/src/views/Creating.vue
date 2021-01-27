<template>
<div class="columns is-10 is-offset-1">
  <div class="column is-four-fifths "></div>
</div>

<div class="column is-10 is-offset-1">
    <div class="field">
  <label class="label">Nazwa Ankiety</label>
  <div class="control">
    <input class="input" type="text" placeholder="Nazwa Ankiety">
  </div>
</div>

<div class="field">
  <label class="label">Pytanie</label>
  <div class="control">
    <input class="input" type="email" placeholder="Pytanie">
  </div>
</div>


          <div class="field">
            <label class="label">Odpowiedz:</label>
            <div class="columns">
              <div class="column is-12 "> 
                  <label for="exampleRadioInline1">
                    <div class="control">
                      <input class="input" id="Pool" type="text" placeholder="odpowiedz" autofocus data-validate="require">
                    </div>
                  </label>
              </div>
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
