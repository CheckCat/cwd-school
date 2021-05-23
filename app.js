const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('config')
const MaxOp = require('./models/MaxOp')
const getSubs = require('./modules/getSubs')

const app = express()
app.use(express.json({extended: true}))
app.use(cors())
app.options('*', cors())
// app.use('/files', express.static('files'))

app.use('/file', require('./routes/file.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/course', require('./routes/course.routes'))
app.use('/api/subs', require('./routes/subs.routes'))

const PORT = config.get('port') || 5000

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    const [{maxOp}] = await MaxOp.find()
    // getSubs(maxOp)
  } catch (e) {
    process.exit(1)
  }
}

start()