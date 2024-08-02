var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
const secretKey = require('./config/secretKey');
const cors = require('cors');

var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');

const whiteList= [/\/login\/authenticate/,/\/sigup\/insertUser/,];

const authenticationMiddleware = (req, res, next) => {
    const isPathInWhiteList = whiteList.some(pattern => pattern.test(req.path));

    if (isPathInWhiteList){
        next();
    }else {
        const authorization = req.headers['authorization'];
        const token = authorization && authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ success: false, message: 'TOKEN NOT PROVIDED' });
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // console.error(err);
                return res.status(401).json({ success: false, message: 'INVALID TOKEN' });
            }
            req.user = decoded;

            req.userId = decoded.id;
            next();
        });
    }
}

var app = express();
const port = process.env.PORT;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(authenticationMiddleware);
app.use('/examen/login', loginRouter);
app.use('/examen/sigup', signupRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// https.createServer(httpsOptions, app).listen(port);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
