# ⛔️ **DEPRECATED** — do not use for new projects

See [our current docs](https://docs.apostrophecms.org/)

## apostrophe-soundcloud

A simple, style-able Soundcloud widget for [Apostrophe](http://apostrophenow.org/).

You must have a Soundcloud client id in order to use this module. To obtain a client id, log in to SoundCloud and register an "application" on [this page](http://soundcloud.com/you/apps). It doesn't take long.

### usage

Enable the module and configure your client id in `app.js` 

```javascript
modules: {
  apostrophe-soundcloud: {
    clientId: 'xxxxxxxxxxxxxxx'
  }
  // ...other modules
}
```

Now in a template, you can simply call the widget as an `aposSingleton`

```javascript
{{ aposSingleton(page, 'sound', 'soundcloud', {}) }}
```

You can also add it to the controls aray of an `aposArea` to make it available in the "Add Content" menu

```javascript
{{ aposArea(page, 'mixed', {
  controls: ['style', 'bold', 'italic', 'slideshow', 'soundcloud']
}) }}
```

### configuration

You can set a `multiPlay` option that allows multiple soundcloud widgets to play on the page at once. This defaults to `false`, making sure that when a user clicks "play" on a soundcloud widget, the soundcloud manager will stop the playback of any other soundcloud widgets on the page. 

You can also pass a `displayOptions` object to customize the display of your waveforms

* `sampleSize` the resolution of the waveform. The higher the number, the chunkier it gets.
* `innerColor` the fill color of the waveform before it has been interacted with.
* `loadedColor` the fill color of the part of waveform that has been loaded after play
* `playedColor` the fill color for the part of the waveform that has already been played
* `scrubberColor` the color of the bar that appears when your cursor hovers over a sound that is playing  

```javascript
modules: {
  apostrophe-soundcloud: {
    clientId: 'xxxxxxxxxxxxxxxxxxx',
    multiPlay: false,
    displayOptions: {
      sampleSize: 1,
      innerColor: 'rgba(255, 255, 255)',
      loadedColor: 'rgb(240, 240, 240)',
      playedColor: 'rgb(160, 160, 160)',
      scrubberColor: '#00ff00'
    }
  }
}
```

Instead of specifying site-wide `displayOptions`, you can pass them directly into your widget. If you have configured `displayOptions` in your `app.js`, setting them in your singleton's options will extend what you have already set in `app.js`

```javascript
{{ aposSingleton(page, 'sound', 'soundcloud', {
  displayOptions: {
    // override the loadedColor set in app.js but leave the other colors as-is
    loadedColor: 'rgb(0, 0, 255)'
  }
}) }}
```
