import {defineConfig} from '@playwright/test';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
export default defineConfig({testDir:'./tests',timeout:120000,use:{baseURL:'http://127.0.0.1:5190',headless:true},webServer:{command:'npm run dev -- --port 5190 --strictPort',url:'http://127.0.0.1:5190',reuseExistingServer:false,env:{SAMAJ_DB_PATH:join(tmpdir(),`samaj-dev-tests-${Date.now()}.sqlite`)}},reporter:'list'});
