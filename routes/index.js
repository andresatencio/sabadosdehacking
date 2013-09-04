var modelos = require('../models/models'),
	Usuario = modelos.usuario,
	Tema = modelos.tema;
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.logout = function (req, res){

	if (req.user) {
		req.logout();
		res.redirect("/");
	} else {
		res.send("No autorizado", 401);
	}
};

exports.patova = function (req, res, next) {

  	if (req.user) { 
  		return next(); 
  	} else {
  		res.redirect('/')
  	}	
};

exports.portada = function (req, res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render('user', req.user);
};

exports.nuevoTema = function (req, res){
	
	var temita = new Tema();
	temita.autor = req.user.nombre;
	temita.descripcion = req.body.descripcion;

	temita.save(
		function (err) {
			if(err){
				res.send(500, 'Error');
			}
			res.send(200);
	});

}

exports.temas = function (req, res){
	 console.log(req.body.data);
	 console.log("req.xhr: " + req.xhr);
	 res.send(200);
}
