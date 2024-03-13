// @ts-check
const {test, expect} = require('@playwright/test');

test('should be able to delete the status details', async ({request}) => {

  // Create a Token which will be used in DELETE request

  let id

  const responseGet = await request.get(`/status/get?textSearch=&currentPage=1&limit=5&sortData=id&sortType=ASC`);
  const res = await responseGet.json()
  const listRecord = res.content.list[0]
  id = listRecord.idStatus
  expect(responseGet.ok()).toBeTruthy();
  expect(responseGet.status()).toBe(200);
  // DELETE

  const deleteRequest = await request.delete(`/status/delete/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      limit: 5, currentPage: 1
    }
  });

  console.log('deleteRequest', deleteRequest)
  const resdeleteRequest = await responseGet.json()
  expect(deleteRequest.status()).toBe(200);
  expect(resdeleteRequest).toHaveProperty("message", "Thành công");
  expect(resdeleteRequest).toHaveProperty("status", true);
});