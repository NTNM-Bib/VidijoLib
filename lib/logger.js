"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
class Logger {
    constructor() {
        this.consoleTransport = new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({
                format: 'HH:mm:ss',
            }), winston_1.default.format.printf((info) => {
                return `${info.timestamp} ${info.level}: ${info.message}`;
            })),
        });
        this.logger = winston_1.default.createLogger({
            transports: [this.consoleTransport],
        });
    }
    log(message) {
        this.logger.info(message);
    }
    warn(warning) {
        this.logger.warn(warning);
    }
    error(error) {
        if (error.stack) {
            this.logger.error(error.stack);
        }
        else if (error.message) {
            this.logger.error(error.message);
        }
        else {
            this.logger.error('Invalid error was passed to Logger.error()');
        }
    }
    debug(object) {
        console.log(object);
    }
}
exports.default = new Logger();
