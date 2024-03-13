const {test, expect} = require("@playwright/test");
test('should be get page 1 the job details', async ({request}) => {
  const response = await request.get(`/job/get`, {
    params: {
      textSearch: "",
      currentPage: 1,
      limit: 5,
      sortData: "updatedAt",
      sortType: "desc"
    }
  });
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});