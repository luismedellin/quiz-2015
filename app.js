var express =   require('express');
var path =      require('path');
var favicon =   require('serve-favicon');
var logger =    require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials=   require('express-partials');
var methodOverride = require('method-override');
var session=    require('express-session');

var routes =    require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinamicos
app.use(function (req, res, next) {
    // guardar path en session.redir para despues de login
    if(!req.path.match(/\/login|\/logout/)){
        req.session.redir = req.path;
    }

    //Hacer visible req.session en las vistas
    res.locals.session = req.session;
    next();
});

//autologout de la sesion
app.use(function (req, res, next) {
    //si el usuario se ha autenticado
    if(req.session.user){
        //capturo la fecha actual
        var now=new Date().getTime();
        //si no se ha inicializado el último login 
        if(req.session.user.ultimoLogin===0){
            req.session.user.ultimoLogin=now;
        }
        //calculo la diferencia entre la última transacción
        var dif=now-+(req.session.user.ultimoLogin);
        //si han pasado mas de dos minutos destruyo la sesión del usuario
        //if(dif>1000*2){
        if(dif>1000*60*2){
            //sino actualizo el tiempo de la ultima transacción
            //destruyo la sesión
            delete req.session.user;
        }else{
            console.log('Actualiza sesión,segundos:'+dif/1000);
            req.session.user.ultimoLogin=now;
        }
    }
    next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});






module.exports = app;
