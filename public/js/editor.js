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
    // url field
    self.$url = self.$el.find('.apos-soundcloud-url');
    self.$url.val(self.data.url);
    // type dropdown
    self.$display_type = self.$el.find('.apos-soundcloud-display_type');
    self.$url.val(self.data.display_type);
  };

  self.prePreview = beforeUpdate;
  self.preSave = beforeUpdate;

  function beforeUpdate(callback) {
    self.exists = !!self.$url.val();
    if (self.exists) {
      self.data.url = self.$url.val();
      self.data.display_type = self.$display_type.val();
    }

    return callback();
  }
}

AposSoundcloudWidgetEditor.label = 'Soundcloud';
apos.addWidgetType('soundcloud');
