import express from 'express'
import bodyParser from 'body-parser'
import mongoose, { ConnectOptions } from 'mongoose'

import { AdminRoute, VandorRoute } from './routes'
import { MONGO_URL } from './config'
import { ErrorMiddleware } from './middlewares'

import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/admin', AdminRoute)
app.use('/vandor', VandorRoute)

app.use(ErrorMiddleware)
mongoose
    .connect(MONGO_URL)
    .then((result) => {
        console.log('database connected')
    })
    .catch((err) => console.log(`error: ` + err))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App is listening to http://localhost:${PORT}`)
})
