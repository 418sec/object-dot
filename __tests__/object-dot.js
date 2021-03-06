const objectd = require('object-dot')

describe('set', () => {
  test('deep nested', () => {
    let object = {}
    objectd.set({ object, path: 'a.b.c.d.e.f.g.h.i.j.k', value: 'my value' })
    expect(object.a.b.c.d.e.f.g.h.i.j.k).toBe('my value')
  })

  test('medium nested', () => {
    let object = {}
    objectd.set({ object, path: 'a.b.c.d', value: 'my value' })
    expect(object.a.b.c.d).toBe('my value')
  })

  test('shallow nested', () => {
    let object = {}
    objectd.set({ object, path: 'a', value: 'my value' })
    expect(object.a).toBe('my value')
  })

  test('array over dot notation', () => {
    let object = {}
    objectd.set({ object, path: ['a', 'b', 'c'], value: 'my value' })
    expect(object).toEqual({ a: { b: { c: 'my value' } } })
  })

  test('some property in the chain exists', () => {
    let object = { a: { exist: true } }
    objectd.set({ object, path: 'a.b', value: 'foo' })
    expect(object).toEqual({ a: { exist: true, b: 'foo' } })
  })

  test('with arguments instead of destructing object', () => {
    let object = { a: { exist: true } }
    objectd.set(object, 'a.b', 'foo')
    expect(object.a.b).toBe('foo')
  })

  test('array parameter mutation', () => {
    let object = { a: { b: { c: 'd' } } }
    let pathArray = ['a', 'b', 'c']
    objectd.set({ object, path: pathArray, value: 'foo' })
    expect(pathArray).toEqual(['a', 'b', 'c'])
  })

  test('deep chain with a property that exist', () => {
    let object = { a: { b: { c: 'a' } } }
    objectd.set(object, 'a.b.c.d.e', 'foo')
    expect(object.a.b.c.d.e).toBe('foo')
  })

  test('deep chain with a property that is falsy', () => {
    let object = { a: { b: { c: false } } }
    objectd.set(object, 'a.b.c.d.e', 'foo')
    expect(object.a.b.c.d.e).toBe('foo')
  })

  test('overwrite is false', () => {
    let object = { a: { b: { c: 'a' } } }
    objectd.set(object, 'a.b.c.d.e', 'foo', false)
    expect(object.a.b.c).toBe('a')
  })
})

describe('get', () => {
  test('exists', () => {
    let object = { a: { b: { c: 'd' } } }
    expect(
      objectd.get({ object, path: 'a.b.c' })
    ).toBe('d')
  })

  test('exist in the middle ', () => {
    let object = { a: { b: { c: 'd' } } }
    expect(
      objectd.get({ object, path: 'a.b' })
    ).toEqual({ c: 'd' })
  })

  test('does not exist', () => {
    let object = {}
    expect(
      objectd.get({ object, path: 'a.b.c' })
    ).toBeUndefined()
  })

  test('default', () => {
    let object = {}
    expect(
      objectd.get({ object, path: 'a.b.c', value: 'foo' })
    ).toBe('foo')
  })

  test('array over dot notation', () => {
    let object = { a: { b: { c: 'd' } } }
    expect(
      objectd.get({ object, path: ['a', 'b', 'c'] })
    ).toEqual('d')

    object.c = undefined
    expect(
      objectd.get({ object, path: ['a', 'b', 'c'], value: 'default' })
    ).toEqual('default')
  })

  test('with arguments instead of destructing object', () => {
    let object = { a: { b: 'foo' } }
    expect(
      objectd.get(object, 'a.b')
    ).toBe('foo')
  })

  test('null values are acceptable', () => {
    let object = { a: { b: null } }
    expect(
      objectd.get(object, 'a.b')
    ).toBeNull()
  })

  test('array parameter mutation', () => {
    let object = { a: { b: { c: 'd' } } }
    let pathArray = ['a', 'b', 'c']
    objectd.get(object, pathArray)
    expect(pathArray).toEqual(['a', 'b', 'c'])
  })
})

describe('exists', () => {
  const object = { foo: { bar: { a: { b: 'foo' } } } }

  test('is true', () => {
    expect(
      objectd.exists(object, 'foo.bar.a')
    ).toBe(true)
  })

  test('is false', () => {
    expect(
      objectd.exists(object, 'foo.bar.d')
    ).toBe(false)
  })

  test('is true and deep edge of the chain', () => {
    expect(
      objectd.exists(object, 'foo.bar.a.b')
    ).toBe(true)
  })

  test('is false and deep edge of the chain', () => {
    expect(
      objectd.exists(object, 'foo.bar.a.e')
    ).toBe(false)
  })

  test('array parameter mutation', () => {
    let object = { a: { b: { c: 'd' } } }
    let pathArray = ['a', 'b', 'c']
    objectd.exists({ object, path: pathArray })
    expect(pathArray).toEqual(['a', 'b', 'c'])
  })
})

describe('extend', () => {
  test('basic extend', () => {
    const object = { foo: { bar: { a: { b: 'foo' } } } }
    objectd.extend()
    Object.set(object, 'foo.isCool', true)
    expect(object.foo.isCool).toBe(true)
    expect(Object.get(object, 'foo.bar.a.b')).toBe('foo')
    expect(Object.exists(object, 'foo.bar')).toBe(true)
  })
})
