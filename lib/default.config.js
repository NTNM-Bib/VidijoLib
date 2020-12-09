"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultConfigClass = void 0;
// Import DotEnv here instead of in the main entry script file
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger_1 = __importDefault(require("./logger"));
/**
 * Default config for all services
 */
class DefaultConfigClass {
    constructor() {
        this.NODE_ENV = this.getNodeEnv();
        this.PORT = this.getPort();
        this.MONGODB_URI = this.getMongoDbUri();
        this.API_URI = this.getApiUri();
        this.EXTERNAL_DATA_SERVICE_URI = this.getExternalDataServiceUri();
        this.VIDIJO_URI = this.getVidijoUri();
    }
    getNodeEnv() {
        if (!process.env.NODE_ENV) {
            logger_1.default.warn("NODE_ENV not set in .env file ('development' or 'production'). Using 'NODE_ENV=development' instead");
        }
        return process.env.NODE_ENV === 'production' ? 'production' : 'development';
    }
    getPort() {
        if (!process.env.PORT) {
            logger_1.default.warn('PORT not set in .env file. Using port 3000 instead');
        }
        let port = process.env.PORT ? +process.env.PORT : 3000;
        port = isNaN(port) ? 3000 : port;
        return port;
    }
    getMongoDbUri() {
        if (!process.env.MONGODB_URI) {
            logger_1.default.warn("MONGODB_URI not set in .env file. Using 'MONGODB_URI=mongodb://localhost:27017/vidijo' instead");
        }
        return process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/vidijo';
    }
    getApiUri() {
        if (!process.env.API_URI) {
            logger_1.default.warn("API_URI not set in .env file. Using 'API_URI=http://localhost:3000' instead");
        }
        return process.env.API_URI ? process.env.API_URI : 'API_URI=http://localhost:3000';
    }
    getExternalDataServiceUri() {
        if (!process.env.EXTERNAL_DATA_SERVICE_URI) {
            logger_1.default.warn("EXTERNAL_DATA_SERVICE_URI not set in .env file. Using 'EXTERNAL_DATA_SERVICE_URI=http://localhost:3002' instead");
        }
        return process.env.EXTERNAL_DATA_SERVICE_URI ? process.env.EXTERNAL_DATA_SERVICE_URI : 'http://localhost:3002';
    }
    getVidijoUri() {
        if (!process.env.VIDIJO_URI) {
            logger_1.default.warn("VIDIJO_URI not set in /config/shared.env. Using 'VIDIJO_URI=https://localhost' instead");
        }
        return process.env.VIDIJO_URI ? process.env.VIDIJO_URI : 'https://localhost';
    }
}
exports.DefaultConfigClass = DefaultConfigClass;
exports.default = new DefaultConfigClass();
