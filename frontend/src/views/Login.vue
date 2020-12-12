<template>
  <section>
    <form class="form-container" @submit.prevent="submitForm">
      <div>
        <label for="name">Email</label><br>
        <input id="name" type="text" v-model="name" required/>
      </div>
      <div>
        <label for="email">Password</label><br>
        <input id="email" type="email" v-model="email" required/>
      </div>
      <button :class="[name ? activeClass : '']" type="submit">Submit</button>
    </form>
  </section>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      // api
    },
  },
};
</script>

<style lang="scss" scoped>
$primary: #5968d7;
form {
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 10px 40px;
  label {
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 0.03em;
    font-weight: bold;
  }
  input, textarea {
    border: 1px solid #ccc;
    color: #333;
    width: calc(100% - 30px);
  }
  input, textarea, button {
    border-radius: 4px;
    padding: 8px 15px;
    font-family: 'Work Sans', sans-serif;
    font-weight: 300;
  }
  div {
    margin: 20px 0;
  }
}
button {
  color: white;
  border: none;
  width: 100%;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: #ccc;
  cursor: pointer;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition: 0.25s all ease;
  &:hover {
    transform: translateY(2px);
  }
}
.active {
  background: $primary;
}
</style>
