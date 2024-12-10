import { Port } from "webpack-dev-server";

export type BuildMode = "production" | "development";
export type BuildPlatform = "mobile" | "desktop";

export interface BuildPaths {
    entry: string;
    html: string;
    output: string;
    src: string;
    public: string;
}

export interface BuildOptions {
  port: Port;
  paths: BuildPaths;
  mode: BuildMode;
  platform: BuildPlatform;
  analyzer?: boolean;
}