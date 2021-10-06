import "dotenv-safe/config"

import axios from "axios"

const port = process.env.PORT || 3001
beforeAll(async () => {
  axios.defaults.baseURL = `http://localhost:${port}`
})

afterAll(async () => {})

describe("GET /resutls - get results from endpoint", () => {
  test("The get request to results should work", async () => {
    const result = await axios.get("/results")

    expect(result.status).toEqual(200)
    expect(result.data).toBeDefined()
  })
})
