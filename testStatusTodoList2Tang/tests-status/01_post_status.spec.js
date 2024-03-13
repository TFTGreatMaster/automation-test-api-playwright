// @ts-check
const {test, expect} = require('@playwright/test');
const statusData = require('../test-status-data/post-status.json');
//testcase 2
test('should be able to create a status', async ({request}) => {
  const response = await request.post(`/status/add?&limit=5`, {
    data: statusData
  });
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json()
  expect(responseBody).toHaveProperty("message", "Thêm dữ liệu thành công");
  expect(responseBody).toHaveProperty("status", true);
});