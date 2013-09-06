
$(function(){

	var Usuario = Backbone.Model.extend({

		defaults: function (){
			return {
				nombre: 'Carlos Alberto',
				edad: 18 + parseInt(Math.random() * 30),
				empleado: 'Si'
			}
		},
		//
		validate: function(att){
			console.log(att);
			if( !_.isNumber(att.edad) || _.isNaN(att.edad) ){
				return "eso no es numero";
			}

			if( att.edad < 18 ){
				return "sos menor de edad";
			}
		}
	});

	var usuario = new Usuario();
	
	usuario.on("change", actualizar);

	usuario.on("invalid", function (model, error){
		console.log("Ops: " + error);
	})

	function actualizar(){
		$("span.nombre").html(usuario.get('nombre'));
		$("span.edad").html(usuario.get('edad'));
		$('span.empleado').html(usuario.get('empleado'));
	}

	$('button').click(function (event){
		usuario.set({
			nombre: $("input[name='nombre']").val(),
			edad: parseInt($("input[name='edad']").val()),
			empleado: $("input[name='empleado']").is(":checked") ? "Si" : "No"
		}, {validate : true});
	})

	actualizar();

	var Usuarios = Backbone.Collection.extend({
		model: Usuario
	})

	var usuarios = new Usuarios();

	usuarios.on("add", function (model){
		console.log("Se agrego :" + model.get("nombre"));
		agregarUsuario();
	});


	$("#add").click(function (event){
		var usu = new Usuario({
			nombre: $("input[name='nombre']").val(),
			edad: parseInt($("input[name='edad']").val()),
			empleado: $("input[name='empleado']").is(":checked") ? "Si" : "No"
		}, {validate: true})
		usuarios.add(usu);
	})

	function agregarUsuario(){
		var template = $.trim($("[data-template-name='user-row']").html() || "Row template not found!");
		var $tbody = $(".users-table tbody");
		$tbody.empty();

		usuarios.each(function(user){
			$tbody.append(Mustache.render(template, user.toJSON()));
		}, this);
	}





})
