<template>
  <div id="app">
    <AppHeader />
    <div class="main-content">
      <Home />
      <div class="content">
        <router-view />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from './components/Footer-component.vue';
import AppHeader from './components/Header-component.vue';
import Home from './components/Home-component.vue'; 

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    Home
  }
};
</script>

<style scoped>

#app {
  font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #414346;
  background-color: #757c83;   display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
  margin-top: 63px;
}

.content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 230px; 
  background-color: #f5f5f5; 
  border-radius: 10px;
}

footer {
  padding-bottom: 50px; 
  }
</style>
