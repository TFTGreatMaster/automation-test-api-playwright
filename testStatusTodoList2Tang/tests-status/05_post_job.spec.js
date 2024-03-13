const {test, expect} = require('@playwright/test');
const jobData = require('../test-status-data/data-post-job.json');
const statusData = require("../test-status-data/post-status.json");
//testcase 2
test('should be able to create a job', async ({request}) => {

  const resGetAllStatus = await request.get(`/status/getAll`);
  expect(resGetAllStatus.ok()).toBeTruthy();
  expect(resGetAllStatus.status()).toBe(200);

  const status = await resGetAllStatus.json()

  const listStatus = status.content.list

  console.log('listStatus', listStatus)

  const record = listStatus.find((element) => element.nameStatus = "New")

  const response = await request.post(`/job/add`, {
    data: {
      ...jobData,
      idStatus: record.idStatus,
      nameStatus: record.nameStatus
    }
  });
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json()
  expect(responseBody).toHaveProperty("message", "Thành công");
  expect(responseBody).toHaveProperty("status", true);
});