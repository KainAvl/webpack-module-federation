import webpack from "webpack";
import path from "path";
import {BuildMode, BuildOptions, BuildPlatform, buildWebpack} from '@packages/build-config';
import { Port } from "webpack-dev-server";
import packageJson from "./package.json";

interface EnvVariable {
  port: Port;
  mode: BuildMode;
  platform: BuildPlatform;
  analyzer?: boolean;
  SHOP_REMOTE_URL?: string;
  ADMIN_REMOTE_URL?: string;
}

export default (env: EnvVariable) => {
  
  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3200';
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3100';

  const paths = {
      src: path.resolve(__dirname,'src'),
      entry: path.resolve(__dirname,'src','index.tsx'),
      output: path.resolve(__dirname,"build"),
      html: path.resolve(__dirname, 'public', 'index.html'),
      public: path.resolve(__dirname, 'public'),
    };

  const options: BuildOptions = {
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    platform: env.platform ?? "desktop",
    analyzer: env.analyzer,
    paths: paths,
  };
  const config: webpack.Configuration = buildWebpack(options);

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-router-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    })
  );

  return config;
};