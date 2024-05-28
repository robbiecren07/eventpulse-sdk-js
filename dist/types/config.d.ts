interface Config {
    apiKey: string;
}
export declare const setConfig: (newConfig: {
    apiKey: string;
}) => void;
export declare const getConfig: () => Config;
export {};
