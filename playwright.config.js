// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 100*1000,
  expect:{
    timeout:5000,
  },
  reporter:'html',
   
  use: {
   actionTimeout: 10000 ,
   navigationTimeout:30*1000,
    browserName:'chromium',
    trace:'on',
  },
  
});


    
