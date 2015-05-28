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

  AposWidgetEditor.call(self, options);

  self.afterCreatingEl = function() {
    self.$url = self.$el.find('.apos-soundcloud-url');
    self.$url.val(self.data.url);
  };

  function beforeUpdate(callback) {
    self.exists = !!self.$url.val();
    if (self.exists) {
      self.data.url = self.$url.val();
    }

    return callback();
  }

  self.prePreview = beforeUpdate;
  self.preSave = beforeUpdate;
}

AposSoundcloudWidgetEditor.label = 'Soundcloud';
apos.addWidgetType('soundcloud');
