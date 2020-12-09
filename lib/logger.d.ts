/**
 * TODO: This logger currently outputs messages to the console
 * TODO: Implement a central log aggregator that collects the logs of all services
 * TODO: Use a new Winston transport to send the logs
 */
declare class Logger {
    private consoleTransport;
    private logger;
    log(message: string): void;
    warn(warning: string): void;
    error(error: Error): void;
    debug(object: unknown): void;
}
declare const _default: Logger;
export default _default;
