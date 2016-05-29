$(document).ready(function(){
  var form = $('#calculations-form');
  form.on( "submit", function(event) {
    console.log( "<p> was clicked" );
    event.preventDefault();
    $.post("calculations_test.php", form.serialize())
    .done(function(data){
      console.log(data);
    });
});
});
