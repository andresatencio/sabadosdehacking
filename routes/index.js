
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.logout = function (req, res){

	if (req.user) {
		console.log("deslogueo")
		req.logout();
		res.redirect("/");
	} else {
		res.send("No autorizado", 401);
	}

};

exports.patova = function (req, res, next) {
	console.log(req.user)
  if (req.user) 
  	{ 
  	return next(); 
  	} else {
  		console.log("Errorrrr no se autentico")
  res.redirect('/')
  }
}

exports.portada = function (req, res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render('user', req.user);
}