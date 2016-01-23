# glances

A heads-up dashboard for displaying thing-statuses.

![](screenshot.png?raw=true)

## Demo

Example: https://github.com/nicinabox/glances-example

Demo: https://glances-example.herokuapp.com/

## Overview

Glances is designed to be displayed on a monitor and works primarily over websockets. Built with React and Socket.io for lightning fast updates.

## Basic Usage

1. `npm install -S glances-app`
2. `echo "require('glances-app')()" > server.js`
3. Add tiles to `tiles/`
4. Start your server: `npm start`

## Tile Anatomy

A tile may be either a function or an object and include the following keys:

* id
* title
* value
* moreInfo
* color
* position
* display (see Tile Layouts below)

Example:

```javascript
var state = {
  id: 'counter',
  title: 'Counter',
  color: 'teal',
  value: 0
}

module.exports = {
  state,

  onRequest($, body) {
    Object.assign(state, {
      value: +body.counter
    })

    return $.emitChange(state)
  },

  schedule($) {
    $.every('2 sec', 'update counter', () => {
      Object.assign(state, {
        value: state.value + 1
      })
      return $.emitChange(state)
    })
  }
}
```

## Tile Layouts

Currently supported tile layouts:

* standard
* ticker
* list

For ticker and list types, pass a key/value object, a flat array, or an array of pairs as the `value`.

## Tile API

### `state`

The tile state object.

### `onRequest`

Called when tile receives a POST request.

### `schedule`

Called when tile receives a POST request.

## TODO

* [ ] More robust scheduler
* [x] More robust value types based on data structures or setting
* [x] Dynamic tile routes to POST data
* [x] Pluggable, reusable tiles (should be possible currently, but need to investigate)
* [ ] Management UI to search, install, and configure tiles
* [x] Improve error handling
* [ ] Improve schedule api. Right now it's not obvious that id is required.

See [NEXT.md](NEXT.md) for brainstorming on upcoming todos.

## Prior Art

Glances was inspired by, and borrows heavily from [Dashing](http://dashing.io/) by Shopify.
