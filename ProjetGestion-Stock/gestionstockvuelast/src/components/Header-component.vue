<template>
  <header class="app-header">
    <div class="header-content">
      <img src="@/assets/PA.jpg" alt="Logo" class="logo" />
      <h1 class="dynamic-text">Gestion de Stockage</h1>
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
  background-color: #757c83; 
  color: #f0e3e3;
  padding: 7px 0; 
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif; 
  box-shadow: 0px 0px 20px rgba(0, 255, 255, 0.2); 
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.logo {
  height: 50px;
  margin-right: 20px;
}

.dynamic-text {
  margin: 0;
  font-size: 40px;
  font-family:monospace;
  flex-grow: 1; 
  text-align: center; 
}
</style>
