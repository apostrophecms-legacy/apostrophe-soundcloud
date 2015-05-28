var SoundCloud = function() {
	var self = this;
	self.clientId;
	self.tracks = [];

  self.connect = function(options) {
  	self.clientId = options.clientId;
  	self.multiPlay = options.multiPlay || false;
  	self.displayOptions = options.displayOptions || {};

	  SC.initialize({
	    client_id: self.clientId,
	  });

	  return self.initializeTracks();
  }

  self.initializeTracks = function() {
		$('[data-soundcloud-track]').each(function(e){
      var displayOptions = JSON.parse($(this).attr('data-display-options'));
      var globalDisplayOptions = $.extend(true, {}, self.displayOptions);
			self.tracks.push(new SoundCloudTrack(self, $.extend(true, globalDisplayOptions, displayOptions), $(this)));
		});
  }

  self.pauseAllTracks = function() {
  	// if multiplay is enabled, we don't care about pausing all tracks
  	if(!self.multiplay) {
	  	self.tracks.forEach(function(track, index){
	  		if(track.playing) {
	  			track.player.togglePause();
	  			track.playing = false;
	  			track.$playPause.toggleClass('apos-playing', false);
	  		}
	  	});
  	}
  }
}

var SoundCloudTrack = function(soundcloud, displayOptions, $el) {
	var self = this;
	self.soundcloud = soundcloud;
	self.displayOptions = displayOptions;

	self.$el = $el;
	self.$waveform = self.$el.find('[data-waveform]');
	self.$playPause = self.$el.find('[data-play-pause]');

	self.url = $el.attr('data-url');

	self.waveform;
	self.player;

	self.playing = false;
	self.firstStart = true;
	self.width = self.$waveform.width();
	self.waveformOffset = self.$waveform.offset();
	self.relX;
	self.hovering = false;

	SC.get("/resolve", { url: self.url }, function(track) {
    self.waveform = new Waveform({
      container: self.$waveform.context,
      interpolate: self.displayOptions.interpolate || false,
      sampleSize: self.displayOptions.sampleSize || null,
      innerColor: self.displayOptions.innerColor || null,
      outerColor: self.displayOptions.outerColor || null,
      loadedColor: self.displayOptions.loadedColor || null,
      playedColor: self.displayOptions.playedColor || null,
      scrubberColor: self.displayOptions.scrubberColor || null
    });

    self.waveform.dataFromSoundCloudTrack(track);

    self.streamOptions = self.waveform.optionsForSyncedStream();
    SC.stream(track.uri, self.streamOptions, function(player){
    	self.player = player;
    });
	});

	// EVENT LISTENERS FOR EACH TRACK
  self.$waveform.on('click', function(e) {
    e.preventDefault();

    if (self.firstStart) {
    	// if it's the first time clicking on the waveform, we're just going to play it from the start
    	self.soundcloud.pauseAllTracks();
      self.player.togglePause();
      self.firstStart = !self.firstStart;
      self.playing = true;
      self.$playPause.toggleClass('apos-playing', true);
    } else {

    	// otherwise, we are skipping to a particluar point in the track
      if (!self.playing) {
      	self.soundcloud.pauseAllTracks();
        self.player.togglePause();
        self.playing = !self.playing;
        self.$playPause.toggleClass('apos-playing');
      }

      self.relX = e.clientX - self.waveformOffset.left;
      self.player.setPosition((self.relX/self.width) * self.player.durationEstimate);
    }
  });

  self.$waveform.hover(function(e) {
    self.hovering = true;
  }, function () {
    self.hovering = false;
    self.waveform.hoverPosition = -10;
    if(!self.playing){
      self.waveform.redraw();
    }
  });

  self.$waveform.on('mousemove', function(e) {
    if(self.hovering) {
      self.waveform.hoverPosition =  (e.clientX - self.waveformOffset.left)/self.width;
      if(!self.playing){
        self.waveform.redraw();
      }
    }
  });

  self.$playPause.on('click', function(e) {
  	if(!self.playing) {
  		self.soundcloud.pauseAllTracks();
  	}

    self.playing = !self.playing;
    self.player.togglePause();
    self.$playPause.toggleClass('apos-playing');
    e.preventDefault();

    if (self.firstStart){
      self.firstStart = !self.firstStart;
    }
  });
}

window.sc = new SoundCloud();
