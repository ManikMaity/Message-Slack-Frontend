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

## Task
- Collect the token after signing in , redirect to workspace page, feth all the workspace , if not workspace found pop up to make a workspace. ✔️✔️

- Add members in the workspace main content pannel, add add member to workspace -> Pop up join workspace link -> copy and refress ->  link to join workspace 😃✔️


More feature -> 
- Image upload for message ✔️
- Reaction to message ✔️
- Edit user profile ✔️
- Verify user - > send verify email ✔️ | verify email page ✔️
- Workspace Image ✔️
- Leave Workspace by user ✔️
- Make member admin ✔️
- All user and admin remove member ✔️
- On enter submit, workspaces loader ✔️
- DM ✔️
- Delete message ✔️ 
- Add AI Agent Chat ✔️