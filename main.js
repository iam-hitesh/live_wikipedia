function searchResult(){
  $.ajax({
    url :'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch='+ $('#search').val(),
    dataType : 'jsonp',
    type : 'GET',
    success :function(data){
      $('#update').empty();
      // Other Method for Parsing
      // var data = JSON.stringify(data); // Converts JavaScript Objects into JSON text and stores it as strings
      // //JSON.stringify() is to create a JSON string out of an object/array.
      // var json_data = JSON.parse(data); // Converts strings of JSON text into JavaScript Objects
      // //JSON.parse() is for "parsing" something that was received as JSON.
      var json_data = JSON.parse(JSON.stringify(data));
      var output = '';

      json_data.query.search.forEach(function(json_data){
        var title = "<h2>"+ json_data.title +"</h2><br/>";
        var snippet = "<p>"+ json_data.snippet +"</p>";
        var url = "<a target='_BLANK' href='https://en.wikipedia.org/wiki/"+json_data.title+"'>";
        var endUrl = "</a>";
        output += url+title+endUrl+snippet+"<hr/>";
      });
      $("#update").append(output);
    }
  });
}

function getRandom(){
  $('#update').empty();
  $('#search').empty();
  $('iframe').attr('src','https://en.wikipedia.org/wiki/special:random');
  $('#random').html('Get Another Article');
}


$(document).ready(function(){
  $('#search').focus();
  $('#search').off('keyup');
  $('#search').on('keyup',function(){
    searchResult();
    $('iframe').attr('src','');
    $(".embed-responsive").hide();
  });
  $('#random').on('click',function(){
    $(".embed-responsive").show();
    getRandom();
  });
});
