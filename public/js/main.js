$("#guardar").click(function(){
	$.ajax({
		url: '/'+ $("#email").text() +'/tema'
        , type: 'POST'
        , cache: false
        , data: { tema: $("#tema").val().sanitizeHTML() }
        , complete: function() {
                //console.log('process complete');
            },
	        success: function(data) {
                $('#propone').modal('hide');
                $("#tema").val("");
                console.log('ok nuevo tema');
                $(".list-group").append( "<li class='list-group-item'> <span class='label label-warning'>&nbsp"+ data.autor +"</span>"+ data.descripcion +"  </li>" )
              },
            error: function() {
            	console.log('process error');
              },
        });
});
var sara;
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
                    $(".list-group").append( "<li class='list-group-item'> <span class='label label-warning'>&nbsp"+ data[d].autor +"</span>"+ data[d].descripcion +"  </li>" )
                }
                
              },
            error: function() {
                console.log('process error');
              },
        });
});

$.fn.sanitizeHTML = function() {
  var $children = $(this).children();
  $children.each(function() {
    if ($(this).not("b").not("i").not("p").not("br").length > 0) {
      $(this).replaceWith($(this).text());
    } else {
      $(this).sanitizeHTML();
    }
  });
  return $(this);
}