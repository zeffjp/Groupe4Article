<template>
  <footer class="app-footer">
    <div class="footer-content">
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
  background-color: #757c83;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  font-family: 'Orbitron', sans-serif;
  box-shadow: 0px 0px 20px rgba(0, 255, 255, 0.2);
}

.footer-content {
  margin: 0 auto;
  max-width: 1200px;
}

.footer-content p {
  margin: 0;
  font-size: 14px;
  color: #f0e3e3;
}
</style>
