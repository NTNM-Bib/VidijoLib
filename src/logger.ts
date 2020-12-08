import Winston from 'winston'

/**
 * TODO: This logger currently outputs messages to the console
 * TODO: Implement a central log aggregator that collects the logs of all services
 * TODO: Use a new Winston transport to send the logs
 */

class Logger {
  private consoleTransport = new Winston.transports.Console({
    format: Winston.format.combine(
      Winston.format.colorize(),
      Winston.format.timestamp({
        format: 'HH:mm:ss',
      }),
      Winston.format.printf((info) => {
        return `${info.timestamp} ${info.level}: ${info.message}`
      }),
    ),
  })

  private logger: Winston.Logger = Winston.createLogger({
    transports: [this.consoleTransport],
  })

  // Log a message
  public log(message: string) {
    this.logger.info(message)
  }

  // Log a warning
  public warn(warning: string) {
    this.logger.warn(warning)
  }

  // Log an error
  public error(error: Error) {
    if (error.stack) {
      this.logger.error(error.stack)
    } else if (error.message) {
      this.logger.error(error.message)
    } else {
      this.logger.error('Invalid error was passed to Logger.error()')
    }
  }

  public debug(object: unknown) {
    console.log(object)
  }
}

export default new Logger()
