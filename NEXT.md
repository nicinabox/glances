# Manage UI

* Probably at `/manage`
* Tiles will need to generate forms for configuration
* Mis- or Unconfigured tiles must not be show (or maybe show with an error?)
* Search plugin repo (Probably just npm packages tagged `glances`)

# Plugin API

Tile plugins should be standalone, but may need configuration.

```javascript
export default {  
  tile: {
    title: 'Example',
    value: 'Hello'
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
      return Promise.resolve()
    })
  }
}

```
