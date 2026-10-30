import {defineConfig} from '@playwright/test';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  use: {baseURL: 'http://127.0.0.1:4180', headless: true},
  webServer: {
    command: 'npm start',
    url: 'http://127.0.0.1:4180',
    reuseExistingServer: false,
    env: {SAMAJ_DB_PATH:join(tmpdir(),`samaj-browser-tests-${Date.now()}.sqlite`)},
  },
  reporter: 'list',
});
