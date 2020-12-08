import Logger from '../src/logger'

test('Default log', () => {
  Logger.log('Hello, World!')
})

test('Log warning', () => {
  Logger.warn('This is a warning!')
})

test('Log error', () => {
  Logger.error(new Error('This is an error!'))
})

test('Debug print an object', () => {
  Logger.debug({
    name: 'TestObject',
    numbers: [1, 2, 3, 4],
    isUseful: false,
  })
})
