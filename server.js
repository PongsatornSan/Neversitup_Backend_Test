const express = require('express')
const logger = require('./middleware/logger');
const { handleError, ErrorHandler } = require('./helper/error');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet')
const app = express();

// Init Middleware
app.use(logger);

// Normal express config defaults
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Get Home
app.get('/', (req, res) => {
    return res.send({
        error: false,
        message: 'Test Neversitup',
        written_by: 'Pongsatorn',
        host: req.headers.host,
    });
});

// route
app.use(require("./route"));

// require .env
dotenv.config({ path: './.env' });

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});

/// error handlers
app.use((err, req, res, next) => {
    handleError(err, res);
});

// check port
app.listen(3080, () => {
    console.log('Server (http) is running on port 3080')
});

module.exports = app;