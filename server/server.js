const express = require('express')
const apiRouter = require('./routes/apiRouter')
const staticRouter = require('./routes/staticRouter')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

function start() {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  const whitelist = ['http://localhost:3000', 'https://squareparty.netlify.app']
  const corsOptions = {
    origin: whitelist,
    credentials: true,
  }
  app.use(cors(corsOptions))
  app.use('/api', apiRouter)
  app.use(express.static('./build/'))
  app.get('*', function (req, res) {
    res.sendFile(path.resolve('build', 'index.html'))
  })

  app.listen(process.env.PORT || 5000, () =>
    console.log('token server running on 5000'),
  )
}

module.exports.start = start
