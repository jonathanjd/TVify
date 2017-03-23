$(document).ready(function() {

  var $tvShowscontainer = $('#app-body').find('.tv-shows');

  $tvShowscontainer.on('click','button.like', function (ev) {
    var $this = $(this);
    $this.closest('.tv-show').toggleClass('liked');
  });

  function renderShows(shows){
    $tvShowscontainer.find('.loader').remove();
    shows.forEach(function(show){
      var article = template
        .replace(':name:', show.name)
        .replace(':img:', show.image.medium)
        .replace(':summary:', show.summary)
        .replace(':img alt:', show.name + " Logo");

        var $article = $(article);
        $tvShowscontainer.append($article);
        $article.fadeIn('slow');
    });
  }

  //submit search-form
  $('#app-body')
    .find('form')
    .submit(function (ev) {
    ev.preventDefault();
    var busqueda = $(this)
      .find('input[type="text"]')
      .val();
    $tvShowscontainer.find('.tv-show').remove();
    var $loader = $('<div class="loader">');
    $loader.appendTo($tvShowscontainer);
    $.ajax({
      url: 'http://api.tvmaze.com/search/shows',
      data:{ q: busqueda},
      success: function(res,textStatus, xhr){
        $loader.remove();
        var shows = res.map(function(el){
          return el.show;
        });
        renderShows(shows);
      }
    });
  });

  var template = '<article class="tv-show">' +
                 '<div class="left img-container">' +
                 '<img src=":img:" alt=":img alt:">' +
                 '</div><!-- .left -->' +
                 '<div class="right info">' +
                 '<h1>:name:</h1>' +
                 '<p>:summary:</p>' +
                 '<button class="like">Me Gusta</button>'
                 '</div><!-- .left info -->' +
                 '</article><!-- #tv-show -->';


  if(!localStorage.shows){
    $.ajax('http://api.tvmaze.com/shows')
      .then(function(shows){
        $tvShowscontainer.find('.loader').remove();
        localStorage.shows = JSON.stringify(shows);
        renderShows(shows);
    })
  }else {
    renderShows(JSON.parse(localStorage.shows));
  }





  /*
  //encontrar un elemento
  var title = $('#app-header').find('h1');//.has .not .filter

  //crear un elemento
  var a = $('<a></a>', {
    href: 'http://blogclon.com.ve',
    target: '_blank',
  }).text('Ir a BC');
  //colocar un elemento creado
  $('#app-body').append(a);

  //cambiar atributo de un elemento
  a.attr('href', 'http://google.com');

  var $h1 = $('h1');

  //agregar una clase
  $h1.addClass('danger');

  //agregar estilo a nuestro elemento
  $h1.css({
    'font-size': '70px'
  });

  //manipular el tiempo
  setTimeout(function(){
    $h1.removeClass('danger');
  }, 1500);
  */

});
