import "reflect-metadata"
import "dotenv-safe/config"

import { app } from "./middlewares/index"

import { connectToDB, scheduler } from "./middlewares/index"
import router from "./routers/dataRouter"

// Route Imports

// Middlewares

//* Route Middlewares

app.use("/", router)

// Routes

//* server start

export const main = async () => {
  try {
    //* Connect to a DB
    await connectToDB()

    //* Listen to server
    const port = process.env.PORT || 3001

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)

      //? run the scheduler
      scheduler()
    })
  } catch (err) {
    console.log({ err })
  }
}

main()
