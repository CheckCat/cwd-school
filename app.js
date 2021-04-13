const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()
app.use(express.json({extended: true}))

const PORT = config.get('port') || 5000

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    process.exit(1)
  }
}

start()