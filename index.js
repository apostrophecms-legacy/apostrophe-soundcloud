var extend = require('extend');

module.exports = function(options, callback) {
  return new Construct(options, callback);
};

module.exports.Construct = Construct;

function Construct(options, callback) {
  var self = this;

  self._apos = options.apos;
  self._app = options.app;
  self.clientId = options.clientId;
  self._dirs = (options.dirs || []).concat([ __dirname ]);

  self.pushAsset = function(type, name, optionsArg) {
    var options = {};
    extend(true, options, optionsArg);
    options.fs = __dirname;
    options.web = '/apos-soundcloud';
    return self._apos.pushAsset(type, name, options);
  };
  
  self._apos.mixinModuleAssets(self, 'soundcloud', __dirname, options);

  self.pushAsset('template', 'soundcloudEditor', { when: 'user' });
  self.pushAsset('script', 'vendor/soundcloud', { when: 'always' });
  self.pushAsset('script', 'vendor/waveform', { when: 'always' });
  self.pushAsset('script', 'content', { when: 'always' });
  self.pushAsset('stylesheet', 'content', { when: 'always' });

  self._apos.pushGlobalCallWhen('always', 'sc.connect(?)', { 
    clientId: self.clientId,
    displayOptions: options.displayOptions || {}
  });

  self._apos.itemTypes.soundcloud = {
    widget: true,
    label: 'Soundcloud',
    css: 'soundcloud',
    icon: 'volume-up',
    renderWidget: function(data) {
      data.options.clientId = self.clientId;
      return self._apos.partial('soundcloud', data, self._dirs.map(function(dir) { return dir + '/views'; }) );
    }
  };

  return setImmediate(function() { return callback(null); });
}

