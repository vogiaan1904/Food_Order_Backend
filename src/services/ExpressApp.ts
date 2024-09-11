import express, { Application } from 'express'
import bodyParser from 'body-parser'

import { AdminRoute, CustomerRoute, ShoppingRoute, VandorRoute } from '../routes'
import { ErrorMiddleware } from '../middlewares'

export default async (app: Application) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/admin', AdminRoute)
    app.use('/vandor', VandorRoute)
    app.use('/customer', CustomerRoute)
    app.use(ShoppingRoute)

    app.use(ErrorMiddleware)

    return app
}
