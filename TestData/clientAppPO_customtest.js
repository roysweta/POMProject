const base = require('@playwright/test');

// Wrap the object inside the async function using the 'use' callback
const customtest = base.test.extend({
    // @ts-ignore
    testForLogin: async ({}, use) => {
        await use({
            username: "katie@email.com",
            password: "Password1",
            productToCompare: "ZARA COAT 3"
        });
    }
});

module.exports = { customtest };