import { merge } from 'webpack-merge'
import devConfig from './webpack.client.dev.js'

export default merge(devConfig, {
  devServer: {
    hot: true,
    open: true,
    port: 8090,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  output: {
    publicPath: "/"
  }
});
