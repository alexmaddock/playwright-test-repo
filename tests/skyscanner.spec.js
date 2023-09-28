// @ts-check
const { test, expect } = require('@playwright/test');
const { beforeEach } = require('node:test');

test.describe('Skyscanner', () => {
    test.beforeEach(async({ page }) => {
        await page.goto("https://skyscanner.com.au")
    });

    test('has title', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Skyscanner/);
      });
      
      test('departure destination auto populates with a location', async ({ page }) => {
        // Ensure value is not empty
        const inputValueBox =  page.locator('//input[@id="originInput-input"]');
        await expect(inputValueBox).toHaveValue(/\w+/);
        expect(inputValueBox).toBeDefined();

      });

      test('departure clear button clears text that is auto generated', async ({ page }) => {
        // Ensure correct value state
        const inputText =  page.locator('//input[@id="originInput-input"]');
        await expect(inputText).not.toBeEmpty();

        // Clear prepopulated text
        await page.locator('//label[@id="originInput-label"]').click();
        await page.getByTestId('clear button').click();

        // Confirm input empty
        await expect(inputText).toHaveText("");
        await expect(inputText).toHaveValue("");
      });

      test('Select one way ticket entry', async ({ page }) => {
        await page.locator('//label[@id="originInput-label"]').click();
        await page.getByTestId('clear button').click();
        await page.locator('//label[@id="originInput-label"]').click();
        await page.locator('//label[@id="originInput-input"]').fill('Sydney (SYD');

        const sydneyTextDropdown = page.getByText('Sydney (SYD)');
        await sydneyTextDropdown.click();
        // await page.locator('//label[@id="originInput-menu"]').click();
        
        await page.locator('//label[@id="destinationInput-input"]').fill('Brisbane');
      });
      
})


