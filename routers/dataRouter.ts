import express from "express"
const router = express.Router()

import { Data } from "../models/entity"
import { processData, imageProcess } from "../middlewares/index"

// middleware that is specific to this router

//* define the home page route

router.get("/requestImageProcess", async (_req, res) => {
  const response = await imageProcess()
  return res.status(200).send({ response })
})

router.get("/processData", async (_req, res) => {
  const responseStatusCode = await processData()
  return res.status(responseStatusCode).end()
})

router.get("/results", async (_req, res) => {
  const response = await Data.find({ where: { processed: true } })
  return res.status(200).send(response)
})

export default router
