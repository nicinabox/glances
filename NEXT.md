# Manage UI

* Probably at `/manage`
* Tiles will need to generate forms for configuration
* Mis- or Unconfigured tiles must not be show (or maybe show with an error?)
* Search plugin repo (Probably just npm packages tagged `glances`)

# Tile API

Tile plugins should be standalone, but may need configuration.

```javascript
// tile/counter-example.js

export default {  
  state: {
    disabled: false,
    title: 'Counter',
    value: 0
  },

  options: [
    {
      name: 'API_KEY',
      type: 'text',
      required: true
    },
    {
      name: 'interval',
      value: '30 seconds',
      type: 'text',
      required: true
    }
  ],

  onRequest({ emit }, options) {
    return emit(...)
  }

  schedule({ emit, every }, options) {
    every(options.interval.value, function () {
      var nextState = Object.assign({}, state, {
        value: state.value + 30
      }

      return Promise.resolve(nextState)
    })
  }
}
```

# Loading Tiles

Currently Tiles are required automatically from a directory. This may be manually required in the future in order to have more flexibility over instances of a Tile rather than a 1:1 Tile-to-file relationship.
