function searchResult(){
  $.ajax({
    url :'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch='+ $('#search').val(),
    dataType : 'jsonp',
    type : 'GET',
    success :function(data){
      $('#update').empty();
      var data = JSON.stringify(data);
      var data = JSON.parse(data);

      var output = '';

      data.query.search.forEach(function(data){
        var title = "<h2>"+ data.title +"</h2><br/>";
        var snippet = "<p>"+ data.snippet +"</p>";
        var url = "<a target='_BLANK' href='https://en.wikipedia.org/wiki/"+data.title+"'>";
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
