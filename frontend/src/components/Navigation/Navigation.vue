<template>

  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
<nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
<ul>
    <li><a href="#">Documentation</a></li>
    <li><a href="#">Components</a></li>
    <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
  </ul>
</nav>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
<div class="container pt-4 pb-0">
  <div class="section pt-4 pb-0">
    <nav class="breadcrumb">
    </nav>
  </div>
</div>


<div class="container_columns pt-50 pb-4">
  <div class="columns is-4">
    <div class="column  ">
      <div class="box ">
        <p class="title is-5 ">Pool 1</p>
        <p class="subtitle">Create your pool.</p>
        <button class="button is-primary is-large is-rounded">Add Pool</button>
      </div>
    </div>
  <div class="column ">
      <div class="box ">
        <p class="title is-5">Pool 2</p>
        <p class="subtitle">Create your pool.</p>
        <button class="button is-primary is-large is-rounded">Add Pool</button>
      </div>
    </div>
 <div class="column ">
      <div class="box">
        <p class="title is-5">Pool 3</p>
        <p class="subtitle">Create your pool.</p>
        <button class="button is-primary is-large is-rounded">Add Pool</button>
      </div>
</div>
</div>
</div>

-------------------------------------------------------------------------------------


<div class="field">
  <label class="label">Imię</label>
  <div class="control">
    <input class="input" type="text" placeholder="Text input">
  </div>
</div>

<div class="field">
  <label class="label">Nazwisko</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="text" placeholder="Text input" value="bulma">
    <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </div>
  <p class="help is-success">This username is available</p>
</div>

<div class="field">
  <label class="label">Email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
  </div>
  <p class="help is-danger">This email is invalid</p>
</div>


<div class="field is-grouped">
  <div class="control">
    <button class="button is-link">Submit</button>
  </div>
  <div class="control">
    <button class="button is-link is-light">Cancel</button>
  </div>
</div>



------------------------------------------------------------------------

</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style scoped>

</style>
