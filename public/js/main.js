$("#guardar").click(function(){
    var tema = $("#tema").val();
    if (validar(tema)){

        $.ajax({
            url: '/'+ $("#email").text() +'/tema'
            , type: 'POST'
            , cache: false
            , data: { tema: tema }
            , complete: function() {
                //console.log('process complete');
            },
            success: function(data) {
                $('#propone').modal('hide');
                $("#tema").val("");
                console.log('ok nuevo tema');
                $(".list-group").append( "<li class='list-group-item'> <span class='label label-warning'>"+ data.autor +"</span>&nbsp"+ data.descripcion +"  </li>" )
              },
            error: function() {
                console.log('process error');
                $(".form-group")..addClass( "has-error" );
              },
        });

    } else {
        $(".form-group")..addClass( "has-error" );
    }

});

$(window).ready(function(){
    $.ajax({
        url: '/'+ $("#email").text() +'/temas'
        , type: 'GET'
        , cache: false
        , data: {}
        , complete: function() {
                //console.log('process complete');
            },
            success: function(data) {
                for(d in data){
                    $(".list-group").append( "<li class='list-group-item'> <span class='label label-warning'>"+ data[d].autor +"</span>&nbsp"+ data[d].descripcion +"  </li>" )
                }
                
              },
            error: function() {
                console.log('process error');
              },
        });
});

var validar = function(txt){
    var txt = txt.toString();
    if ( txt == "" ){
        return false;
    } else {
        var expReg = /[a-z]|[A-Z]|[0-9]/;
        return txt.match(expReg);
    }
}

