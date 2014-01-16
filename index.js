var extend = require('extend');

module.exports = function(options, callback) {
  return new Construct(options, callback);
};

module.exports.Construct = Construct;

function Construct(options, callback) {
  var apos = options.apos;
  var app = options.app;
  var self = this;
  var clientId = options.clientId;
  self._dirs = (options.dirs || []).concat([ __dirname ]);

  //self._apos.mixinModuleAssets(self, 'moderator', __dirname, options);

  self.pushAsset = function(type, name, optionsArg) {
    var options = {};
    extend(true, options, optionsArg);
    options.fs = __dirname;
    options.web = '/apos-soundcloud';
    return apos.pushAsset(type, name, options);
  };

  // Include our editor template in the markup when aposTemplates is called
  self.pushAsset('template', 'soundcloudEditor', { when: 'user' });
  // Make sure that aposScripts and aposStylesheets summon our assets
  self.pushAsset('script', 'soundcloud', { when: 'always' });
  self.pushAsset('script', 'content', { when: 'always' });
  self.pushAsset('script', 'editor', { when: 'user' });
  self.pushAsset('script', 'waveform', { when: 'always' });
  self.pushAsset('script', 'soundmanager2', { when: 'always' });  
  self.pushAsset('script', 'berniecode-animator', { when: 'always'});
  self.pushAsset('script', '360player', { when: 'always' });
  self.pushAsset('stylesheet', '360player', { when: 'always' });
  self.pushAsset('stylesheet', 'content', { when: 'always' });
  
  app.get('/apos-soundcloud/*', apos.static(__dirname + '/public'));
  apos.itemTypes.soundcloud = {
    widget: true,
    label: 'Soundcloud',
    css: 'soundcloud',
    icon: 'volume-up',
    render: function(data) {
      data.options.clientId = clientId;
      console.log(data)
      return apos.partial('soundcloud', data, self._dirs.map(function(dir) { return dir + '/views'; }) );
    }
  };

  return setImmediate(function() { return callback(null); });
}

//LINKED?