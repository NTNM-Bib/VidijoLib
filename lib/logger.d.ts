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
