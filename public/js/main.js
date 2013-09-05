

$(document).ready(function(){
    
    $.ajax({
        url: '/'+ $("#email").text() +'/temas'
        , type: 'GET'
        , cache: false
        , complete: function() {
                //console.log('process complete');
            },
            success: function(data) {
                for(d in data){
                    $(".list-group").append( "<li class='list-group-item' data-idtema='"+ data[d]._id +"' > <span class='label label-warning'>"+ data[d].autor +"</span>&nbsp"+ data[d].descripcion +"<div class='pull-right'><a class='eliminar btn btn-default btn-xs' data-idtema='"+ data[d]._id +"'>eliminar</a></div></li>"  )
                }
                var emailTema, idTema;
                    $("a.eliminar.btn.btn-default.btn-xs").each(function (i, ele){
                    console.log(ele);


                    $(ele).click(function() {

                        console.log(this);
                        console.log($(this).attr("data-idtema"));
                        emailTema = $("#email").text();
                        idTema = $(this).attr("data-idtema"); 
                        var URL = '/'+ emailTema + '/tema/' + idTema +'';
                        console.log("URL: " + '/'+ emailTema + '/tema/' + idTema +'');
                        
                        console.log("dale");
                        eliminar(emailTema, idTema);
                    
                    })
                
                });
              },
            error: function() {
                console.log('process error');
              },
        });


    $("#guardar").click(function(){
    var t = $("#tema").val();
    if (validar(t)){

        $.ajax({
            url: '/'+ $("#email").text() +'/tema'
            , type: 'POST'
            , cache: false
            , data: { tema: t }
            , complete: function() {
                //console.log('process complete');
            },
            success: function(data) {
                $('#propone').modal('hide');
                $("#tema").val("");
                console.log('ok nuevo tema');
                $(".list-group").append( "<li class='list-group-item' data-idtema='"+ data._id +"'> <span class='label label-warning'>"+ data.autor +"</span>&nbsp"+ data.descripcion +" <div class='pull-right'><a class='eliminar btn btn-default btn-xs' data-idtema='"+ data._id +"'>eliminar</a></div> </li>" );
                var elemento = $("a[data-idtema="+data._id+"]");
                elemento.click(function() {

                        console.log(this);
                        console.log($(this).attr("data-idtema"));
                        emailTema = $("#email").text();
                        idTema = $(this).attr("data-idtema"); 
                        var URL = '/'+ emailTema + '/tema/' + idTema +'';
                        console.log("URL: " + '/'+ emailTema + '/tema/' + idTema +'');
                        
                        console.log("dale");
                        eliminar(emailTema, idTema);
                    
                    })
              },
            error: function() {
                console.log('process error');
                $(".form-group").addClass( "has-error" );
              }
        });

    } else {
        $(".form-group").addClass( "has-error" );
    }

    });

});



var validar = function(txt){
    var txt = txt.toString();
    if ( txt == "" ){
        return false;
    } else if (txt.length > 87){
        return false;
    } else {
        var expReg = /^[\w ]+$/;
        return expReg.test(txt);
    }
}



var eliminar = function(email, id){
    console.log(email + id)
    URL = '/'+ email + '/eliminar/tema/' + id +''
    
    $.ajax({
            url: URL
            , type: 'POST'
            , cache: false
            , data: { email: email }
            , complete: function() {
                //console.log('process complete');
            },
            success: function(data) {
                $("li[data-idtema="+data._id+"]").remove();
              },
            error: function() {
                console.log('process error');
                alert("No podes eliminar temas de otros usuarios")
              }
        });

}

