const express = require('express')
const app = express()
const static = express.static(__dirname + '/public')

const configRoutes = require('./routes')
const exphbs = require('express-handlebars')