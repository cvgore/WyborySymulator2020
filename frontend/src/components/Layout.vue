<template>
  <div class="Container">
    <Navigation/>
    <main class="Content">
      <slot/>
    </main>
    <footer class="footer">
      <div class="content has-shadow has-text-white has-text-centered">
        <p>
          Projekt stworzyli Kacper Palka, Adrian Pykacz, Dawid Zelinka, Piotr Waliczek
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
import Navigation from "@/components/Navigation/Navigation";

export default {
  name: 'Layout',
  components: {
    Navigation
  }
};
</script>
<style lang="scss" scoped>
.Container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.Content {
  flex: 1 0 auto;
}

.footer {
  font-size: 2.7vmin;
  @media screen and (min-width: 860px){
    font-size: 17px;
  }
  flex-shrink: 0;
}
</style>
