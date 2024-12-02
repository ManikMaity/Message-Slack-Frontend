# Slack Message Frontend

### ShadCN Setup
- [Vite ShadCN Setup](https://ui.shadcn.com/docs/installation/vite)
- Intead of tsconfig.json, make jsconfig.json file.
```json
// jsconfig.json
{ 
     "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
- Ingnore this step - Add the following code to the tsconfig.app.json file to resolve paths, for your IDE:

- edit vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```
- all other steps are same.