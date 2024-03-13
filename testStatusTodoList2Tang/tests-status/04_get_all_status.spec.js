const {test, expect} = require("@playwright/test");
test('should be get page 1 the status details', async ({request}) => {
  const response = await request.get(`/status/getAll`);
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});