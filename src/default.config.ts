// Import DotEnv here instead of in the main entry script file
import DotEnv from 'dotenv'
DotEnv.config()

import Logger from './logger'

/**
 * Default config for all services
 */
export class DefaultConfigClass {
  public NODE_ENV: string = this.getNodeEnv()
  public PORT: number = this.getPort()
  public MONGODB_URI: string = this.getMongoDbUri()
  public API_URI: string = this.getApiUri()
  public EXTERNAL_DATA_SERVICE_URI: string = this.getExternalDataServiceUri()
  public VIDIJO_URI: string = this.getVidijoUri()

  private getNodeEnv(): string {
    if (!process.env.NODE_ENV) {
      Logger.warn("NODE_ENV not set in .env file ('development' or 'production'). Using 'NODE_ENV=development' instead")
    }

    return process.env.NODE_ENV === 'production' ? 'production' : 'development'
  }

  private getPort(): number {
    if (!process.env.PORT) {
      Logger.warn('PORT not set in .env file. Using port 3000 instead')
    }
    let port: number = process.env.PORT ? +process.env.PORT : 3000
    port = isNaN(port) ? 3000 : port

    return port
  }

  private getMongoDbUri(): string {
    if (!process.env.MONGODB_URI) {
      Logger.warn("MONGODB_URI not set in .env file. Using 'MONGODB_URI=mongodb://localhost:27017/vidijo' instead")
    }

    return process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/vidijo'
  }

  private getApiUri(): string {
    if (!process.env.API_URI) {
      Logger.warn("API_URI not set in .env file. Using 'API_URI=http://localhost:3000' instead")
    }

    return process.env.API_URI ? process.env.API_URI : 'API_URI=http://localhost:3000'
  }

  private getExternalDataServiceUri(): string {
    if (!process.env.EXTERNAL_DATA_SERVICE_URI) {
      Logger.warn(
        "EXTERNAL_DATA_SERVICE_URI not set in .env file. Using 'EXTERNAL_DATA_SERVICE_URI=http://localhost:3002' instead",
      )
    }

    return process.env.EXTERNAL_DATA_SERVICE_URI ? process.env.EXTERNAL_DATA_SERVICE_URI : 'http://localhost:3002'
  }

  private getVidijoUri(): string {
    if (!process.env.VIDIJO_URI) {
      Logger.warn("VIDIJO_URI not set in /config/shared.env. Using 'VIDIJO_URI=https://localhost' instead")
    }

    return process.env.VIDIJO_URI ? process.env.VIDIJO_URI : 'https://localhost'
  }
}

export default new DefaultConfigClass()
