import { defineConfig } from '@playwright/test';
import base from './playwright.config.mjs';
export default defineConfig({
  ...base,
  metadata: { cspEnforced: true },
  outputDir: 'test-results/csp-enforced',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report/csp-enforced', open: 'never' }],
    ['json', { outputFile: 'test-results/csp-enforced/results.json' }],
  ],
  webServer: { ...base.webServer, env: { ...process.env, TEST_CSP_ENFORCE: 'true' } },
});
