const express = require("express")
const app = express()

const responses = []
// Route Imports

// Middlewares

// Route Middlewares

// Routes
app.get("/setResults", async (_req, res) => {
  const response = await imageResponse()
  responses.push(response)
  return res.status(200).send({ response })
})

app.get("/results", async (_req, res) => {
  return res.status(200).send(responses)
})

// Connect to a DB

// Listen to server
app.listen(4000, () => console.log("Server is running"))

const imageResponse = async function () {
  await sleep(500)
  return { someData: `data number ${Math.floor(Math.random() * 10000)}` }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
