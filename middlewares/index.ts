import cron from "node-cron"
import { createConnection } from "typeorm"
import express from "express"

import { Data } from "../models/entity"

export const app = express()

export const connectToDB = async function () {
  return createConnection({
    type: "postgres",
    username: process.env.PG_DB_USERNAME,
    password: process.env.PG_DB_PASSWORD,
    database: process.env.PG_DB_NAME,
    logging: true,
    synchronize: true,
    entities: ["./models/entity.ts"],
  })
}

export const imageProcess = async function () {
  await sleep(500)
  const data = Data.create({
    data: `data number ${Math.floor(Math.random() * 10000000)}`,
  })
  await data.save()
  return data
}

export const processData = async function () {
  const res = await Data.find({ where: { processed: false } })
  await sleep(500)
  const randomSuccessRate = Math.random()
  if (randomSuccessRate < 0.1) {
    //? Unsuccessful
    return 500
  } else {
    //? Successful
    const newRes = res.map(async el => {
      el.processed = true
      return await el.save()
    })
    return 201
  }
}

export const sleep = (ms = 500) =>
  new Promise(resolve => setTimeout(resolve, ms))

//? run the process data every hour at 15 minutes
export const scheduler = function () {
  cron.schedule("0 15 * * * *", async () => {
    await processData()
  })
}
