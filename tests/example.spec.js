const { _electron: electron } = require('playwright')
const { test, expect } = require('@playwright/test')

test('check title', async () => {
    const electronApp = await electron.launch({ args: ['main.js'] })
    const window = await electronApp.firstWindow()
    await expect(window).toHaveTitle("Hello World!")

    // close app
    await electronApp.close()
})
