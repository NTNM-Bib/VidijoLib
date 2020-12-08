import DefaultConfig, { DefaultConfigClass } from '../src/default.config'

test('Check NODE_ENV', () => {
  expect(DefaultConfig.NODE_ENV).toEqual('development')
})

test('Check PORT', () => {
  expect(DefaultConfig.PORT).toEqual(1234)
})

test('Check MONGODB_URI', () => {
  expect(DefaultConfig.MONGODB_URI).toEqual('mongodb://localhost:27017/vidijo')
})

test('Check API_URI', () => {
  expect(DefaultConfig.API_URI).toEqual('mongodb://localhost:27017/vidijo')
})

test('Check EXTERNAL_DATA_SERVICE_URI', () => {
  expect(DefaultConfig.EXTERNAL_DATA_SERVICE_URI).toEqual('http://external-data.service:3000')
})

test('Check VIDIJO_URI', () => {
  expect(DefaultConfig.VIDIJO_URI).toEqual('https://www.vidijo.org')
})

test('Create custom config', () => {
  class CustomConfig extends DefaultConfigClass {
    public HELLO_WORLD = this.getHelloWorld()

    private getHelloWorld() {
      if (!process.env.HELLO_WORLD) {
        throw new Error('HELLO_WORLD not set in .env file!')
      }

      return process.env.HELLO_WORLD
    }
  }

  expect(new CustomConfig().HELLO_WORLD).toEqual('HelloWorld!')
})
