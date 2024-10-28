test("GET /api/v1/status", async () => {
  const response = await fetch("https://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  expect(response.body.status).toBe("ok");
})