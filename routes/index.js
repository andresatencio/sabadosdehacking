
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
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}