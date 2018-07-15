const config = require('config');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middlewares/logger');
const startupDebugger = require('debug')('app:startup');
const courses = require('./routes/courses');
const home = require('./routes/homePage');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // Makes the req body in json format and sets to req.body
app.use(express.static('public')); // This middleware is used to serve request for static files eg: images, txt files
app.use(helmet()); // This middleware is used to add headers to the req
app.use(morgan('tiny')); //avoid using for production environments
app.use(logger); // custom built middleware for the purpose of logging for every request
app.use('/api/courses', courses);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}....`));