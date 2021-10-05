const express = require("express")
const app = express()
const cron = require("node-cron")

const responses = []

// Route Imports

// Middlewares

const imageProcess = async function () {
  await sleep(500)
  const data = { someData: `data number ${Math.floor(Math.random() * 10000)}` }
  responses.push(data)
  return data
}

const processData = async function () {
  const res = responses
  await sleep(500)
  const randomSuccessRate = Math.random()
  if (randomSuccessRate < 0.1) {
    //? Unsuccessful
  } else {
    //? return "success"
  }
}

const sleep = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

const scheduler = function () {
  cron.schedule("0 15 * * * *", () => {
    console.log("Hello from the cron")
    imageProcess()
  })
}

// Route Middlewares

// Routes
app.get("/processRequest", async (_req, res) => {
  const response = await imageProcess()
  return res.status(200).send({ response })
})

app.get("/results", async (_req, res) => {
  return res.status(200).send(responses)
})

// Connect to a DB

// Listen to server
app.listen(4000, () => {
  console.log("Server is running")
  scheduler()
})
