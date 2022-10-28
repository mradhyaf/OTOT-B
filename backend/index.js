import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import apiRoutes from './api-routes.js'

dotenv.config()

// DATABASE
mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('connected', () => {
  console.log('Database Connected')
})

// EXPRESS APP
const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.use('/api', apiRoutes)

app.get('/', (req, res) => {
  res.send('Hello World with Express')
})

app.listen(port, () => {
  console.log(`Running web-app-otot on port ${port}`)
})



