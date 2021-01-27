<template>
  <div class="Container">
    <Navigation/>
    <main class="Content">
      <slot/>
    </main>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
            <a>Created by: Kacper Palka, Adrian Pykacz, Dawid Zelinka</a>
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
<style>
  .Container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .Content {
    flex: 1 0 auto;
  }
  .Footer {
    flex-shrink: 0;
  }
</style>
