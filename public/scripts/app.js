$(document).ready(function() {

// toggles favorite icon when clicked;
  $('.favoriteIcon').click(function() {

    let map_id = $(this).children().attr('name');

    if ($(this).hasClass('favorited')) {
      $(this.children).removeClass('fas');
      $(this.children).addClass('far');
      $(this).removeClass('favorited')
      // delete this favorite from database
      $.ajax({method: 'post', url: '/favorites/delete', data: { map_id }}) // when pages are using map data from database, delete <: 2>


    } else {
      $(this.children).removeClass('far');
      $(this.children).addClass('fas');
      $(this).addClass('favorited');
      // add this favorite to database
      $.ajax({method: 'post', url: '/favorites/add', data: { map_id }}); // when pages are using map data from database, delete <: 2>

    }
  });

  // allows toggle of favorites/my maps on profile page.
  $('.profileFavorites').click(function() {
    $($("#favoritesHider")[0]).slideToggle(400, function() {});

  });

  $('.profileMyMaps').click(function() {
    $($("#myMapsHider")[0]).slideToggle(400, function() {});
  });

  //lets navButton bring user back to top of page.
  $('#navButton').click(function() {
    $(window).scrollTop(0);
  });

  //displays navButton on scroll, hides if at top of page.
  $(window).scroll(function() {
    if($(this).scrollTop() >= 100) {
      $('#navButton').removeClass('hidden');
    } else {
      $('#navButton').addClass('hidden');
    }
  });

});
