const { test, expect } = require('@playwright/test');
const { count } = require('node:console');

test.describe('Amazon.in E2E automation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Scenario 1: Home page Sanity', async ({ page }) => {
    // zip code check

    await expect(page.locator('#glow-ingress-line1')).toContainText("Delivering to")
    await expect(page.locator('#glow-ingress-line2')).toContainText("Update location")

    // The popup should be hidden initially
    await expect(page.locator('#a-popover-1')).toBeHidden()

    // Click the location button to open the popup
    await page.locator('#nav-global-location-popover-link').click()

    // Verify that the popup is now visible
    await expect(page.locator('#a-popover-1')).toBeVisible()

    const pincode = '401202'
    await page.locator('#GLUXZipUpdateInput').fill(pincode)
    await page.locator('#GLUXZipUpdate').click()

    await expect(page.locator('#glow-ingress-line1')).toContainText("Deliver to")
    await expect(page.locator('#glow-ingress-line2')).toContainText(pincode)

    // await page.locator("#twotabsearchtextbox").fill('Laptop')
    // await page.locator("#nav-search-submit-button").click()

    // const brandName = 'Dell'
    // const brandOption = page.locator("#brandsRefinements").getByText(brandName).first();

    // // const seeMoreButton = page.getByRole('button',{name:'See more'})

    // await page.locator('#brandsRefinements').waitFor({ state: 'visible' })

    // if (await brandOption.isVisible()) {
    //   await brandOption.click()
    // } else {
    //   const seeMoreButton = page.locator('#brandsRefinements').getByRole('button', { name: 'See more' }).first();
    //   await seeMoreButton.click()

    //   await brandOption.click()
    // }

    // const ifBrandChecked = page
    //   .locator('#brandsRefinements')
    //   .locator('li')
    //   .filter({ hasText: brandName })
    //   .locator('input[type="checkbox"]');

    // await expect(ifBrandChecked).toBeChecked();

    // const products = page.locator('[data-component-type="s-search-result"] a h2')
    // const productCount = await products.count()
    // const randomProduct = Math.floor(Math.random() * productCount)

    // const targetProduct = products.nth(randomProduct)
    // const listTitle = await targetProduct.textContent()

    // console.log(`=====================================================`)
    // console.log(`Product: ${randomProduct}`)
    // console.log(`Listing Title: ${listTitle.trim()}`)
    // console.log(`=====================================================`)

    // await expect(listTitle.toLowerCase()).toContain('dell')

    // // await targetProduct.click()

    // const [newPage] = await Promise.all([
    //   context.waitForEvent('page'),
    //   targetProduct.click()
    // ])

    // await newPage.waitForLoadState('load');

    // const productPageTitle = await newPage.locator('#title #productTitle').textContent()

    // console.log(`Product Page Title: ${productPageTitle.trim()}`)
    // console.log(`=====================================================`)

    // await expect(productPageTitle.trim()).toContain(listTitle.trim())

    // await page.waitForTimeout(5000);
  })
})