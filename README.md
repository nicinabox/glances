# glances

A heads-up dashboard for displaying thing-statuses.

![](screenshot.png?raw=true)

## Demo

Example: https://github.com/nicinabox/glances-example

Demo: https://glances-example.herokuapp.com/

## Overview

Glances is designed to be displayed on a monitor and works primarily over websockets. Built with React and Socket.io for lightning fast updates.

### Features

* Responsive, flexbox-based grid
* Small, simple API
* Easy deployment
* Push data in with a request
* Pull data in on a schedule

## Basic Usage

1. `npm install -S glances-app`
2. `echo "require('glances-app')()" > server.js`
3. Add tiles to `tiles/`
4. Start your server: `npm start`

## Tile Anatomy

A tile is an object and structured like the following:

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

### `id`

An identifier for the tile. If not specified, the file name will be used.

### `state`

The tile state object.

* title
* value
* moreInfo
* color
* position
* display (see Tile Layouts above)
* span (1-4)

### `onRequest`

Called when tile receives a POST request. Make a request:

```
POST /tiles/:id
```

### `schedule`

Define a schedule for the tile.

Accepts: utils

## Utils

### `every`

Schedule tile updates every so often. Must return a Promise or call next from callback

Accepts: interval, description (optional), callback

Callback proviles `err`, `next`

### `emitChange`

Emit your new tile state

Accepts: object

## TODO

* [x] More robust value types based on data structures or setting
* [x] Dynamic tile routes to POST data
* [x] Pluggable, reusable tiles (should be possible currently, but need to investigate)
* [x] Improve error handling
* [x] Improve schedule api. Right now it's not obvious that id is required.
* [ ] More robust scheduler
* [ ] Management UI to search, install, and configure tiles
* [ ] Custom tiles

See [NEXT.md](NEXT.md) for brainstorming on upcoming todos.

## Prior Art

Glances was inspired by, and borrows heavily from [Dashing](http://dashing.io/) by Shopify.
