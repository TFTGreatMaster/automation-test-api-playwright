// @ts-check
const {test, expect} = require('@playwright/test');
const statusData = require('../test-status-data/data-test-update.json');

let id
test('should be able to update the job details', async ({request}) => {
  // Create a Token which will be used in PUT request

  // Get
  const responseGet = await request.get(`/status/get?textSearch=&currentPage=1&limit=5&sortData=id&sortType=ASC`);
  const res = await responseGet.json()
  const listRecord = res.content.list
  const record = listRecord.find((element) => element.nameStatus = "New")
  id = record.idStatus
  expect(responseGet.ok()).toBeTruthy();
  expect(responseGet.status()).toBe(200);

  console.log('id =======================>', id)

  // PUT
  const updateRequest = await request.put(`/status/update/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {
      description: "- Công việc mới được tạo \n-Chưa được phê duyệt\nLưu ý: Sau khi phê duyệt chuyển new thành todo a",
      nameStatus: "New"
    }
  });
  console.log("update", await updateRequest.json());
  expect(updateRequest.ok()).toBeTruthy();
  expect(updateRequest.status()).toBe(200);
  const updatedResponseBody = await updateRequest.json()
  expect(updatedResponseBody).toHaveProperty("message", "Cập nhật thành công");
  expect(updatedResponseBody).toHaveProperty("content", null);
  expect(updatedResponseBody).toHaveProperty("status", true);
});