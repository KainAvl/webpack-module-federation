import { BuildOptions } from "../types/types";

export default function BuildBableLoader({ mode }: BuildOptions){
  const isDev = mode === "development";
  const isProd = mode === "production";
  return {
    test: /\.tsx?$/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-typescript",
            [
              "@babel/preset-react",
              {
                runtime: isDev ? "automatic" : "classic",
              },
            ],
          ],
        },
      },
    ],
    exclude: /node_modules/,
  };
}
