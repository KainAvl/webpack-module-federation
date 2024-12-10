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
}

export default (env: EnvVariable) => {
  
  const options: BuildOptions = {
    port: env.port ?? 3200,
    mode: env.mode ?? 'development',
    platform: env.platform ?? 'desktop',
    analyzer: env.analyzer,
    paths: {
      src: path.resolve(__dirname,'src'),
      entry: path.resolve(__dirname,'src','index.tsx'),
      output: path.resolve(__dirname,"build"),
      html: path.resolve(__dirname, 'public', 'index.html'),
      public: path.resolve(__dirname, 'public'),
    }
  }
  const config: webpack.Configuration = buildWebpack(options);

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "shop",
      filename: "remoteEntry.js",
      exposes: {
        "./Router": "./src/router/Router.tsx",
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