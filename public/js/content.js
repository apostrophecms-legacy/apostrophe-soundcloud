function hydrateSoundclouds(options) {
/*  var async = require('async');*/

  var track_url = options.url
      display_type = options.display_type,
      _client_id = "ef055f9491c6ba9ecd4b2434a8994019";

  if (display_type == 'waveform'){
        SC.initialize({
        client_id: _client_id,
        redirect_uri: "http://example.com/callback.html",
      });
    
      SC.get("/resolve", {url: track_url}, function(track){
        var waveform = new Waveform({
          container: document.getElementById("waveform"),
          innerColor: "rgba(242,244,244,0.7)"
        });

        waveform.dataFromSoundCloudTrack(track);
        var streamOptions = waveform.optionsForSyncedStream();
        SC.stream(track.uri, streamOptions, function(scplayer){
          // waveform
/*          waveform.update({innerColor: "rgba(242,244,244,0.7)"});*/
          $("#waveform").click(function(e) {
            e.preventDefault();
            scplayer.togglePause();
            $('#playpause').toggleClass('icon-play icon-pause');
          });
          // play button
          $("#playpause").click(function(e) {
            e.preventDefault();
                scplayer.togglePause();
                $(this).toggleClass('icon-play icon-pause');
          });
          // mute button
/*          $("#mute").click(function(e) {
            e.preventDefault();
                scplayer.toggleMute();
                $(this).toggleClass("player_button");
          });*/
          // soundcloud link
          $("a[href='http://soundcloud.com']").attr('href', track_url);
        });
      });
  } else {
      SC.initialize({
            client_id: _client_id,
            redirect_uri: "http://example.com/callback.html",
          });

      SC.get("/resolve", {url: track_url}, function(track){

        $('#360_track').attr('href', track.uri + "/stream?client_id=" + _client_id);
        });

      soundManager.setup({
        url: 'swf/',
        flashVersion: 9, // optional: shiny features (default = 8)
        // optional: ignore Flash where possible, use 100% HTML5 mode
        preferFlash: false,

        onready: function() {

        }
      });

    } // ELSE

     
  }


