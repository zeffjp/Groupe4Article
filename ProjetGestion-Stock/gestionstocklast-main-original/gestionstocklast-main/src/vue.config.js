import { defineConfig } from '@vue/cli-service';

export default defineConfig({
  devServer: {
    proxy: 'http://localhost:8080'
  }
});
