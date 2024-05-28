interface Config {
  apiKey: string;
}

let config: Config = {
  apiKey: '',
};

export const setConfig = (newConfig: { apiKey: string }) => {
  config = { ...config, ...newConfig };
};

export const getConfig = () => config;
