/**
 * Default config for all services
 */
export declare class DefaultConfigClass {
    NODE_ENV: string;
    PORT: number;
    MONGODB_URI: string;
    API_URI: string;
    EXTERNAL_DATA_SERVICE_URI: string;
    VIDIJO_URI: string;
    private getNodeEnv;
    private getPort;
    private getMongoDbUri;
    private getApiUri;
    private getExternalDataServiceUri;
    private getVidijoUri;
}
declare const _default: DefaultConfigClass;
export default _default;
