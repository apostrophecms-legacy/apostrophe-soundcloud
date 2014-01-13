function hydrateSoundclouds(options) {
  SC.initialize({
    client_id: options.clientId
  });

  console.log('jkhg')

  var sounds = $('.apos-soundcloud-container');
  console.log(sounds)

  // loop through each soundcloud container and call the
  // SC.oEmbed method using the data-url attribute on the
  // element: 
  sounds.each(function(){
    var container = $(this);
    console.log(container.attr('data-url'))
    var trackUrl = container.attr('data-url');
    SC.oEmbed(trackUrl, { auto_play: false }, function(oEmbed) {
      console.log(oEmbed)
      container.html(oEmbed.html);
    });
  });
}

