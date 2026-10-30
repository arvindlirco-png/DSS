import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// The local desktop app uses the same durable database API as the production server.
// @ts-ignore Node backend module (outside the browser TypeScript project).
import {registrationsHandler} from './server/registrations.mjs';
export default defineConfig({base:'./',plugins:[react(),{name:'samaj-members',configureServer(server){server.middlewares.use((req,res,next)=>{registrationsHandler(req,res).then((handled:boolean)=>{if(!handled)next();}).catch(next);});}}],server:{fs:{strict:true,allow:[process.cwd()]}}});
