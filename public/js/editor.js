function AposSoundcloudWidgetEditor(options) {
  var self = this;

  if (!options.messages) {
    options.messages = {};
  }
  if (!options.messages.missing) {
    options.messages.missing = 'You must enter a URL.';
  }

  self.type = 'soundcloud';
  options.template = '.apos-soundcloud-editor';

  // Parent class constructor shared by all widget editors
  AposWidgetEditor.call(self, options);

  // Override methods
  self.afterCreatingEl = function() {
    self.$url = self.$el.find('.apos-soundcloud-url');
    self.$url.val(self.data.url);
  };

  self.prePreview = beforeUpdate;
  self.preSave = beforeUpdate;

  function beforeUpdate(callback) {
    self.exists = !!self.$url.val();
    if (self.exists) {
      self.data.url = self.$url.val();
    }

    return callback();
  }
}

AposSoundcloudWidgetEditor.label = 'Soundcloud';
apos.addWidgetType('soundcloud');
