//Dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
//Scheme User
var schemaUser = {
	provider: String,
  	uid: String,
  	nombre: String,
  	image: String,
  	creado: {type: Date, default: Date.now},
	email: {type: String, unique: true, trim: true, lowercase: true },
},

esquemaVendedor = {
	usuario: {type: String, required: true, trim: true, lowercase: true },
	pass: {type: String, required: true},
	empresa: {type: String},
	nombre: {type: String},
	apellido: {type: String}
},

esquemaPedido = {
	vendedor: {type: String, required: true, trim: true, lowercase: true },
	empresa: {type: String, required: true, unique: true, trim: true, lowercase: true },
	productos: [{ descripcion: String, cantidad: Number }],
	fecha: {type: Date}
}

modeloUsuario = Schema(esquemaUsuario),
modeloVendedor = Schema(esquemaVendedor),
modeloPedido = Schema(esquemaPedido),

Usuario = mongoose.model('User', modeloUsuario),
Vendedor = mongoose.model('Vendedor', modeloVendedor),
Pedido = mongoose.model('Pedido', modeloPedido),

exports.usuario = Usuario,
exports.vendedor = Vendedor,
exports.pedido = Pedido;
