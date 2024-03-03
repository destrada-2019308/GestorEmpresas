'use strict'

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import { config } from "dotenv"
import userRoutes from '../src/user/user.routes.js'
import companyRoutes from '../src/company/company.routes.js'

//Configuraciones
const app = express()
config()
const port = process.env.PORT || 3056

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/user', userRoutes)
app.use('/company', companyRoutes)

export const initServer = () =>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`);
}