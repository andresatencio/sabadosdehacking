
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , connection = require('./db/connection')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , passport = require('./routes/passport')('local');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('buuu'));
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/:email',function (req, res){
  if(req.params.email.length < 5){
    res.render('backbone');
  }
}, routes.patova, routes.portada);
app.get('/', routes.index);
app.get('/:email/logout', routes.patova, routes.logout);

app.get('/:email/temas', routes.patova, routes.temas);
app.post('/:email/tema', routes.patova, routes.nuevoTema);
app.post('/:email/eliminar/tema/:id', routes.patova, routes.eliminarTema);
//app.post('/tema', routes.nuevoTema);


/*
 * Passport login via GitHub
 */
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github', 
  { failureRedirect: '/' }),
        function(req, res) {
          console.log(req.user)
          res.redirect('/' + req.user.email);
        });

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
