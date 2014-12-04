function hydrateSoundclouds(options) {

  var track_url = options.url,
      display_type = options.display_type,
      _client_id = options.clientId,
      track_name = track_url.substring(track_url.lastIndexOf("/") + 1);
      
      SC.initialize({
        client_id: _client_id,
        redirect_uri: "http://example.com/callback.html",
      });

  if (display_type == 'waveform'){  // WAVEFORM

        SC.get("/resolve", {url: track_url}, function(track){
          var waveform = new Waveform({
            container: document.getElementById("waveform"),
            interpolate: false
          });
          var ctx = waveform.context;  
          waveform.innerColor = "rgba(255,255,255,0.8)";
          $('.play-text,.sc-logo,.download-button,.playpause-button').css("opacity", 1);
          // Bar function
          /*waveform.innerColor = function(x, y){
            if (Math.floor(x*500) % 3){
              return 'rgba(255,255,255,1)';
            } else {
              return 'rgba(255,255,255,0.0)';
            } 
          }*/
          var waveformOffset = $("#waveform").offset();
          var width = $("#waveform").width();
          var relX;
          var firstStart = true;
          var playing = false;
          if (track.download_url != undefined ) {
             var dwld = track.download_url + "?client_id=" + _client_id;
          }
         
          waveform.dataFromSoundCloudTrack(track);
          var streamOptions = waveform.optionsForSyncedStream();
          SC.stream(track.uri, streamOptions, function(scplayer){
            // waveform

            $("#waveform").click(function(e) {
              e.preventDefault();
              if (firstStart) {
                scplayer.togglePause();
                firstStart = !firstStart;
                playing = true;
                $('#playpause').toggleClass('icon-play icon-pause');
                $('.play-text').css("opacity", 0);

                // GA Custom Metric Event
                if (ga) {
                  ga('send', 'event', 'Soundcloud Track', 'Play', { 'metric7': 1 });
                }
              } else {
                if (!playing) {
                  scplayer.togglePause();
                  playing = !playing;
                  $('#playpause').toggleClass('icon-play icon-pause');
                }
                relX = e.clientX - waveformOffset.left;
                scplayer.setPosition((relX/width)*scplayer.durationEstimate);
              }
            });

            // play button
            $(".playpause-button").click(function(e) {
              playing = !playing;
              e.preventDefault();
              scplayer.togglePause();
              $("#playpause").toggleClass('icon-play icon-pause');
              if (firstStart){
                $('.play-text').css("opacity", 0);
                firstStart = !firstStart;
                // GA Custom Metric Event
                if (ga) {
                  ga('send', 'event', 'Soundcloud Track', 'Play', { 'metric7': 1 });
                }
              }
            });
            // soundcloud link
            $("a[href='http://soundcloud.com']").attr('href', track_url);
            if (dwld != undefined){
               $(".download-button").find("a").attr('href', dwld);
             } else { 
              $(".download-button").find("i").css("color", "#333");
              $(".download-button").css("pointer-events","none");
            }
           
          });


          var hovering = false;

          $('#waveform').mousemove( function (e) {
            if(hovering) {
              waveform.hoverPosition =  (e.clientX - waveformOffset.left)/width;
              if(!playing){
                waveform.redraw();
              }
            }
          });

          // Scrubber
          $("#waveform").hover( function() {
            hovering = true;
          }, function () {
              hovering = false;
              waveform.hoverPosition = -10;
              if(!playing){
                waveform.redraw();
              }
          });

          window.onresize = function(event) {
            $('#wavform,canvas').eq(0).width(window.innerWidth*.7);
            $('#wavform,canvas').eq(0).height(90);
            width = $("#waveform").width();
            waveformOffset = $("#waveform").offset();
            waveform.redraw();
          };
        
      });

      
    
  } else if (display_type == '360') { 

    console.log("init 360 type"); 

    SC.get("/resolve", {url: track_url}, function(res, err){
      var url = res.uri + "/stream?client_id=" + _client_id;
      $('#track').attr('href', url);
      $.get(url, function( data ) {
        console.log( "Data Loaded: " + data.redirect );
      });

    }); // SC.get

    soundManager.setup({
      url: 'soundmanagerv297a-20131201/swf/',
      flashVersion: 9, // optional: shiny features (default = 8)
      // optional: ignore Flash where possible, use 100% HTML5 mode
      preferFlash: false,
      onready: function() {

      }
    });

  } else { // SOUNDCLOUD EMBED

    var sounds = $("#"+String(track_name));
    // loop through each soundcloud container and call the
    // SC.oEmbed method using the data-url attribute on the
    // element: 
    sounds.each(function(){
      var container = $(this);
      SC.oEmbed(track_url, { auto_play: false }, function(oEmbed) {
        /*console.log(oEmbed)*/
        container.html(oEmbed.html);
      });
    });

    } // ELSE

     
  }