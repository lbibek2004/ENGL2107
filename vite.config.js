import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Using a relative base keeps asset links working when the site is served
  // from a sub-path such as GitHub Pages (e.g., https://user.github.io/repo/).
  // Without this, the built HTML pointed to /assets/* at the domain root and
  // the page appeared blank.
  base: '/ENGL2107/',
  plugins: [react()],
})
