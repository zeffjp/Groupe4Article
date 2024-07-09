<template>
  <header class="app-header">
    <div class="header-content container">
      <img src="@/assets/PA.jpg" alt="Logo" class="logo" />
      <h1 class="dynamic-text">Gestionnaire de Stock</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap'); 

.app-header {
  background-color: #c6ccd1;
  color: #3b3434;
  padding: 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  box-sizing: border-box;
  font-family: 'Sacramento', cursive; 
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  height: 50px;
  margin-right: 20px;
}

.dynamic-text {
  margin: 0;
  font-size: 40px;
  font-family: 'Sacramento', cursive;
  flex-grow: 1;
  text-align: center;
}
</style>
