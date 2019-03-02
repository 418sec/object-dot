# 📦 object-dot

[![CircleCI](https://circleci.com/gh/jusx/object-dot.svg?style=svg)](https://circleci.com/gh/jusx/object-dot) [![codecov](https://codecov.io/gh/jusx/object-dot/branch/master/graph/badge.svg)](https://codecov.io/gh/jusx/object-dot) [![npm](https://img.shields.io/npm/v/object-dot.svg?style=flat-square)](https://www.npmjs.com/package/object-dot)

Easily use dot notation to `get`, or `set` a property of a nested object. A Node.js library.

# Usage

## `set`

Create the nested chain of objects with `set` and dot notation with one simple statement.

```js
const objectd = require('object-dot')
console.log(
  objectd.set({ object: {}, path: 'a.b.c', value: 'you!' })
)
//=> { a: { b: { c: 'you!' } } }
```

## `get`

Get the value of a nested chain of objects without checking each object in the chain for its existence.

```js
// when one of the properties in the chain is undefined. Safely return undefined.
const objectd = require('object-dot')
let object = { foo: { bar: 'you!' }}
console.log(
  objectd.get({ object, path: 'foo.bar.c.d'})
)
//=> undefined

// return a default value if propery is undefined
const objectd = require('object-dot')
let object = { foo: { bar: 'you!' }}
objectd.get({ object, path: 'foo.bar.c.d', value: 'my default value'})
//=> 'my default value'

// When the property exist.
let object = { a: { foo: { bar: 'you!' } }}
console.log(
  objectd.get({ object, path: 'a.foo'})
)
//=> { bar: 'you!' }


```

# Install

```bash
$ npm install object-dot --save
```

# License

ISC
