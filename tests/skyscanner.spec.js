// @ts-check
const { test, expect } = require('@playwright/test');
// const { beforeEach } = require('node:test');

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
        await page.locator('//input[@id="originInput-input"]').fill('Sydney (SYD');

        const sydneyTextDropdown = page.getByText('Sydney (SYD)');
        await sydneyTextDropdown.click();
        
        await page.locator('//input[@id="destinationInput-input"]').fill('Brisbane');
        const brisbaneTextDropdown = page.getByText('Brisbane (BNE)');
        await brisbaneTextDropdown.click();

        await page.getByTestId('CustomCalendarContainer').getByRole('grid').nth(1).getByRole('button').first().click();
        // await page.getByTestId('CustomCalendarContainer').getByRole('grid').nth(1).getByRole('button').last().click();
        await page.getByTestId('CustomCalendarContainer').getByRole('grid').nth(1).getByRole('button').nth(-1).click();

        await page.getByTestId('calendar').getByText('Select').click();
        
        const defaultTravellerLocator = page.getByTestId('traveller-button');
        await expect(defaultTravellerLocator).toContainText('Travellers and cabin class');
        await expect(defaultTravellerLocator).toContainText('1 Adult, Economy');

        const travellerDropdown = page.getByTestId('desktop-travellerselector')
        await travellerDropdown.getByText('Search').click();
        
      });

      test.skip('Select direct flights only', async() => {
        // const inputCheckBoxArea = page.getByText(/direct flights/i);
        // inputCheckBoxArea.click();
        // await page.locator(':text("Direct flights") + input').click();
      })
      
})


