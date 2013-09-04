$("#guardar").click(function(){
	$.ajax({
		url: '/'+ $("#email").text() +'/tema'
        , type: 'POST'
        , cache: false
        , data: { tema: $("#tema").val() }
        , complete: function() {
                //console.log('process complete');
            },
	        success: function(data) {
                $('#propone').modal('hide');
                $("#tema").val("");
                console.log('ok nuevo tema');
              },
            error: function() {
            	console.log('process error');
              },
        });
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
                console.log(data);
              },
            error: function() {
                console.log('process error');
              },
        });
});