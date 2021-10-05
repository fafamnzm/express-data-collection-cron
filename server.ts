import "reflect-metadata"
import "dotenv-safe/config"

import express from "express"
const app = express()
import cron from "node-cron"
import { createConnection } from "typeorm"

import { Data } from "./models/entity"

// Route Imports

//* Middlewares

const imageProcess = async function () {
  await sleep(500)
  const data = Data.create({
    data: `data number ${Math.floor(Math.random() * 10000000)}`,
  })
  await data.save()
  return data
}

const processData = async function () {
  const res = await Data.find({ where: { processed: false } })
  console.log({ res })
  await sleep(500)
  const randomSuccessRate = Math.random()
  if (randomSuccessRate < 0.1) {
    //? Unsuccessful
    return "unsuccessful"
  } else {
    //? Successful
    const newRes = res.map(async el => {
      el.processed = true
      return await el.save()
    })
    return newRes
  }
}

const sleep = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

//? run the process data every hour at 15 minutes
const scheduler = function () {
  cron.schedule("0 15 * * * *", async () => {
    await processData()
  })
}

// Route Middlewares

//* Routes

app.get("/requestImageProcess", async (_req, res) => {
  const response = await imageProcess()
  return res.status(200).send({ response })
})

app.get("/processData", async (_req, res) => {
  await processData()
  return res.status(201).send({})
})

app.get("/results", async (_req, res) => {
  const response = await Data.find({ where: { processed: true } })
  return res.status(200).send(response)
})

const main = async () => {
  try {
    // Connect to a DB
    await createConnection({
      type: "postgres",
      username: process.env.PG_DB_USERNAME,
      password: process.env.PG_DB_PASSWORD,
      database: process.env.PG_DB_NAME,
      logging: true,
      synchronize: true,
      entities: ["./models/entity.ts"],
    })

    //* Listen to server
    app.listen(4000, () => {
      console.log("Server is running on port 4000")

      //? run the scheduler
      scheduler()
    })
  } catch (err) {
    console.log({ err })
  }
}

main()
