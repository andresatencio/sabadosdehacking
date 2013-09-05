var mongoose = require('mongoose'),
	Schema = mongoose.Schema,

esquemaUsuario = {
	provider: String,
  	uid: String,
  	nombre: String,
  	image: String,
  	creado: {type: Date, default: Date.now},
	email: {type: String, unique: true, trim: true, lowercase: true },
},

esquemaTema = {
	email: String,
	autor: String,
	descripcion: String,
	votos: [{usuario: String, voto: Number}]
}

modeloUsuario = Schema(esquemaUsuario),
modeloTema = Schema(esquemaTema),

Usuario = mongoose.model('Usuario', modeloUsuario),
Tema = mongoose.model('Tema', modeloTema),

exports.usuario = Usuario,
exports.tema = Tema;