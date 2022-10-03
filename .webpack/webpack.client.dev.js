import path from "path"
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserJsPlugin from 'terser-webpack-plugin'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.js",
  },
  mode: "development",
  output: {
    path: path.join(__dirname, "..", "public"),
    clean: true,
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: (file) => {
          return /node_modules/.test(file);
        },
        use: ['cache-loader', 'thread-loader', 'babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserJsPlugin({
        parallel: true,
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../src/", "index.html"),
      inject: true,
    }),
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].bundle.[fullhash].css",
    //   chunkFilename: "chunks/[id].chunk.[fullhash].css",
    // }),
  ],
  resolve: {
    extensions: [".js", ".json"],
  },
};
