import cron from "node-cron"

import { Data } from "../models/entity"

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

export const sleep = (ms = 500) =>
  new Promise(resolve => setTimeout(resolve, ms))

//? run the process data every hour at 15 minutes
export const scheduler = function () {
  cron.schedule("0 15 * * * *", async () => {
    await processData()
  })
}
