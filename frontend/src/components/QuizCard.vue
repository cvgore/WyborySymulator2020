<template>
  <div class="card">
    <div>
      <img src="../assets/images/testcategory.svg" alt="coo">
    </div>
    <p class="title-card">Lorem ipsum</p>
    <p class="desc-card">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    <p class="author-card">Autor</p>
  </div>
</template>

<script>
export default {
  name: 'QuizCard',
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 350px;
  height: 500px;
  background-color: hsl(225, 91%, 83%);
  border-radius: 30px;
  padding: 30px;
  color: white;
}

.card:hover {
  box-shadow: 10px 10px 15px 0px #b1adad;
  cursor: pointer;
}

.title-card {
  font-weight: bold;
  font-size: 1.9em;
  margin-bottom: 15px;
}

.desc-card {
  font-weight: lighter;
}

.author-card {
  margin-top: 15px;
}

.card img {
  width: 250px;
  padding: 15px;
}
</style>
