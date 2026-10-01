import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',timeout:120000,use:{baseURL:'http://127.0.0.1:5180',headless:true},webServer:{command:'npm run dev',url:'http://127.0.0.1:5180',reuseExistingServer:true},reporter:'list'});
