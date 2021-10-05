import "reflect-metadata"
import "dotenv-safe/config"

import express from "express"
const app = express()
import { createConnection } from "typeorm"

import { scheduler } from "./middlewares/index"
import router from "./routers/dataRouter"

// Route Imports

// Middlewares

// Route Middlewares

app.use("/", router)

// Routes

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
