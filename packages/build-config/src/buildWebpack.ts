import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildResolvers } from './buildResolvers';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const {port, mode, paths} = options;
    const isDev = options.mode === "development";
    const isProd = options.mode === "production";

    return {
      mode: mode ?? "development",
      entry: paths.entry,
      module: { rules: buildLoaders(options) },
      resolve: buildResolvers(options),
      output: {
        path: paths.output,
        filename: "bundle.[contenthash].js",
        clean: true,
      },
      plugins: buildPlugins(options),
      devtool: isDev && "inline-source-map",
      devServer: isDev ? buildDevServer(options) : undefined,
    };
}