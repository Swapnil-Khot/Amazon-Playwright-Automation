const { test, expect } = require('@playwright/test')
const { describe } = require('node:test')

test.describe('Amazon Basic check', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })
    test('Checking all basic things', async ({ page }) => {

        await page.waitForLoadState('load')
        await page.waitForLoadState('networkidle')
        await page.waitForLoadState('domcontentloaded')

        // page is properly loading or not
        const response = await page.goto('/')
        expect(response.ok()).toBe(true)

        // // checking images are loading or not part 1
        // // 1. SCROLL FIRST
        // await page.evaluate(()=>{
        //     window.scrollTo(0,document.body.scrollHeight)
        // })
        // // 2. WAIT FOR IMAGES TO LOAD
        // await page.waitForTimeout(3000)
        // // 3. NOW LOCATE AND COUNT (After the page is settled!)
        // const images = page.locator('img')
        // const imageCount = await images.count();
        // console.log(`Checking ${imageCount} images...`)
        // // 4. LOOP
        // for (let i=0;i<imageCount;i++){
        //     const img = images.nth(i);

        //     const isImageloaded = await img.evaluate((element)=>{
        //         return element.complete && element.naturalWidth > 0
        //     })
        // }

        const { totalImages, brokenImages } = await page.evaluate(() => {
            const allImages = Array.from(document.querySelectorAll('img'))
            console.log(allImages.length)

            const broken = allImages.filter(img => img.complete && img.naturalWidth === 0)
            return {
                totalImages: allImages.length,
                brokenImages: broken.length
            };
        })

        console.log(`Total images checked: ${totalImages}`);
        console.log(`Broken images found: ${brokenImages}`);
        expect(brokenImages).toBe(0)
    })
})