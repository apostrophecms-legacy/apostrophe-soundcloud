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
<<<<<<< HEAD
    // url field
    self.$url = self.$el.find('.apos-soundcloud-url');
    self.$url.val(self.data.url);
    // type dropdown
    self.$display_type = self.$el.find('.apos-soundcloud-display_type');
    self.$display_type.val(self.data.display_type);

=======
    self.$url = self.$el.find('.apos-soundcloud-url');
    self.$url.val(self.data.url);
>>>>>>> e4cd0a1771173aef16d29527d6733a1cf07d114c
  };

  self.prePreview = beforeUpdate;
  self.preSave = beforeUpdate;

  function beforeUpdate(callback) {
    self.exists = !!self.$url.val();
    if (self.exists) {
      self.data.url = self.$url.val();
<<<<<<< HEAD
      self.data.track_name = self.data.url.substring(self.data.url.lastIndexOf("/") + 1);
      self.data.display_type = self.$display_type.val();
=======
>>>>>>> e4cd0a1771173aef16d29527d6733a1cf07d114c
    }

    return callback();
  }
}

AposSoundcloudWidgetEditor.label = 'Soundcloud';
apos.addWidgetType('soundcloud');
