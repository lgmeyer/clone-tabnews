test("GET /api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt)
  expect(responseBody.postgres_version).toBeDefined();
  expect(typeof responseBody.max_conextions).toBe('number');
  expect(typeof responseBody.used_connections).toBe('number');
})
