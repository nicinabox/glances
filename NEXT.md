# Manage UI

* Probably at `/manage`
* Tiles will need to generate forms for configuration
* Mis- or Unconfigured tiles must not be show (or maybe show with an error?)
* Search plugin repo (Probably just npm packages tagged `glances`)

# Plugin API

Tile plugins should be standalone, but may need configuration.

```javascript
// tile/counter-example.js

export default {  
  tile: {
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

  render({ emit, every }, tile, options) {
    every(options.interval, function () {
      var newTile = Object.assign({}, tile, {
        value: tile.value + 30
      }
      
      return Promise.resolve(newTile)
    })
  }
}
```
