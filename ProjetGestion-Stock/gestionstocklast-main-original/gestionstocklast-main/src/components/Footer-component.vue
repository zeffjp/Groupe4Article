<template>
  <footer class="app-footer">
    <div class="footer-content container">
      <p>&copy; 2024 Prévoyance Assurances. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.app-footer {
  background-color: #c6ccd1;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  font-family: 'Orbitron', sans-serif;
}

.footer-content {
  margin: 0 auto;
  max-width: 1200px;
  color: #3b3434;
}
</style>
