import express from 'express'

import { RoutesPublic } from "./routes/public"
import { RoutesPrivate } from "./routes/private"
import auth from './middlewares/auth'

const port = 3000
const app = express()

app.use(express.json())

app.use('/', RoutesPublic)
app.use('/', auth, RoutesPrivate)

app.listen(port, () => {
  console.log('server http://localhost:3000')
})

