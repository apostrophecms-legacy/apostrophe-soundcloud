function hydrateSoundclouds(options) {
  var track_url = options.url;

    SC.initialize({
      client_id: "ef055f9491c6ba9ecd4b2434a8994019",
      redirect_uri: "http://example.com/callback.html",
    });
  
    SC.get("/resolve", {url: track_url}, function(track){
      var waveform = new Waveform({
        container: document.getElementById("waveform"), 
        innerColor: "#333"
      });

    waveform.dataFromSoundCloudTrack(track);
    var streamOptions = waveform.optionsForSyncedStream();
    SC.stream(track.uri, streamOptions, function(scplayer){
      // waveform
      $("#waveform").click(function(e) {
        e.preventDefault();
        scplayer.togglePause();
/*        $('#playpause').toggleClass("player_button");*/
        $('#playpause').toggleClass('icon-play icon-pause');

      })
      // play button
      $("#playpause").click(function(e) {
        e.preventDefault();
            scplayer.togglePause();
/*            $(this).toggleClass("player_button");*/
            $(this).toggleClass('icon-play icon-pause');
      });
      // mute button
      $("#mute").click(function(e) {
        e.preventDefault();
            scplayer.toggleMute();
            $(this).toggleClass("player_button");
      });
    });
  });
}

