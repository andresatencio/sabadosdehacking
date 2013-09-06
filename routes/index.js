var modelos = require('../models/models'),
	Usuario = modelos.usuario,
	Tema = modelos.tema;

var mongoose = require('mongoose');
/*
 * GET home page.
 */

exports.index = function(req, res){
	if(req.user){
		res.redirect('/' + req.user.email)
	} else {
		res.render('index');
	}
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

	if(validar(req.body.tema)){

		var temita = new Tema();
		temita.autor = req.user.nombre;
		temita.email = req.user.email;
		temita.activo = true;
		temita.descripcion = req.body.tema;

		temita.save(
			function (err) {
				if(err){
					res.send(500, 'Error');
				}
				res.json(temita);
		});
	}
	else {
		res.send(500, 'Error');
	}
	
}

exports.temas = function (req, res){
	 console.log(req.body.data);
	 console.log("req.xhr: " + req.xhr);
	 Tema.find({activo: true}, function (err, doc){
	 	if (err){
	 		res.send(500)
	 	} else {
	 		res.json(doc)
	 	}
	 })
};

exports.eliminarTema = function (req, res){
	var id = mongoose.Types.ObjectId(req.params.id);
	console.log("req.params.email: " + req.params.email )
	console.log("req.user.email: " + req.user.email )

			Tema.findOneAndUpdate(
				{_id: id, email: req.user.email},
					{activo: false},
						function (err, doc){
							if(doc){
								res.send(doc)
							} else {
								res.send(404)
							}
			});
};

var validar = function(txt){
    var txt = txt.toString();
    if ( txt == "" ){
        return false;
    } else if (txt.length > 87){
        return false;
    } else {
        var expReg = /^[\w \,\.\-\!\?\=\*\"]+$/;
        return expReg.test(txt);
    }
}
