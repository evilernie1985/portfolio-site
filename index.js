const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

// Static assets ====================

app.use(express.static('public'))

// Utility Middleware ===================

app.use(morgan('dev'))

// Express handlebars ===================

app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts')}))
app.set('view engine', 'handlebars')

// Routes ======================

app.get('/', function (req, res) {
  res.render('index')
})

// Server =====================

const port = process.env.PORT || 3500

app.listen(port, function () {
  console.log('Express is listening on port ' + port)
})
