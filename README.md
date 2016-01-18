# glances

A heads-up dashboard for displaying thing-statuses.

![](screenshot.png?raw=true)

## Overview

Glances is made up of Tiles and works primarily over websockets. Add your own tiles in `tiles/`.

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
      value: isUp() ? '✓' : ':(', // `isUp` is a hypothetical function
      color: isUp() ? 'green' : 'red'
    })
  })

  return {
    name: 'Test'
  }
}
```

## Usage

1. Add glances to your `package.json`
2. Require and call it to start the server: `require('glances')()`
3. Add tiles to `tiles/`

And remember: it's just JavaScript, there's nothing fancy here.
