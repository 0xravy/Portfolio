import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import settings from "./settings.json"
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: settings.website.port,
  },
  plugins: [react()],
})
