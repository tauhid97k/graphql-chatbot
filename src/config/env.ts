import "@dotenvx/dotenvx/config";

interface Config {
  port: number;
  nodeEnv: string;
}

export const config: Config = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
};
