# glances

A heads-up dashboard for displaying thing-statuses.

![](screenshot.png?raw=true)

## Overview

Glances is made up of Tiles and works primarily over websockets. Add your own tiles in `tiles/`.

## Usage

1. `npm install -S glances-app`
2. `echo "require('glances-app')()" > server.js`
3. Add tiles to `tiles/`
4. Start your server: `npm start`

And remember: it's just JavaScript, there's nothing fancy here.

## Tile Anatomy

A tile may be either a function or an object and include the following keys:

* title
* value
* moreInfo
* color
* position

Example:

```javascript
module.exports = function(emit) {
  every('5 minutes', function () {
    emit({
      name: 'Test',
      value: isUp ? '✓' : ':(',
      color: isUp ? 'green' : 'red'
    })
  })

  return {
    name: 'Test'
  }
}
```

Tip: Treat your tile objects as immutable to avoid sneaky bugs.

# TODO

* [ ] More robust scheduler
* [ ] More robust value types based on data structures or setting
