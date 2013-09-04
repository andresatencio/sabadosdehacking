$("#grabar").click(function(){
	$.ajax({
		url: '/'+ $("#email").val() +'/tema'
        , type: 'POST'
        , cache: false
        , data: { tema: $("#tema").val() }
        , complete: function() {
            console.log('process complete');
            },
	        success: function(data) {
                alert(data);
                console.log('process sucess');
              },
            error: function() {
            	console.log('process error');
              },
        });
})