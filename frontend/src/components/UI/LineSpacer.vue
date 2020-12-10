<template>
  <header>
    <div>
      <span class="spacer"></span>
        <h1>{{titleText}}</h1>
      <span class="spacer"></span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'LineSpacer',
  props: {
    titleText: String,
  },
};
</script>

<style scoped>
body {
  background: yellow;
}

header {
  display: table;
  width: 100%;
  max-width: 100%;
}

header div {
  display: table-row;
  line-height: 1.5em;
  font-size: 2em;
  white-space: nowrap;
}

header h1 {
  font-size: 1.2em; /* Change font-size in header */
  overflow: hidden;
  display: table-cell;
  vertical-align: middle;
  width: 1px;
  table-layout: fixed;
}

header span.spacer {
  display: table-cell;
}

header h1 {
  padding: 0 10px;
}

header span.spacer:after {
  display: inline-block;
  width: 100%;
  content: ".";
  font-size: 0;
  color: transparent;
  height: 2px;
  background: #000;
  vertical-align: middle;
  position: relative;
  top: -1px;
}

header > a {
  font-size: .4em;
  vertical-align: middle;
  background: #25a2a4;
  color: #fff;
  text-transform: uppercase;
  font-family: monospace;
  border-radius: .5em;
  padding: .3em .5em;
  text-decoration: none;
}
</style>
