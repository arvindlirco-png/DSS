import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {directoryHandler} from './server/directory.mjs';
export default defineConfig({
 plugins: [react(), {name:'private-member-directory',
  configureServer(server){server.middlewares.use((req,res,next)=>{directoryHandler(req,res,next).catch(next)})},
  configurePreviewServer(server){server.middlewares.use((req,res,next)=>{directoryHandler(req,res,next).catch(next)})},
 }],
 server:{fs:{strict:true,allow:[process.cwd()]}},
});
