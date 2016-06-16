const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const SassLintPlugin = require('sasslint-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtendedDefineWebpackPlugin = require('extended-define-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const autoprefixer = require('autoprefixer');

// Environment based global variables
const devEnvVars = require('./config/development.json');
const testEnvVars = require('./config/test.json');
const prodEnvVars = require('./config/production.json');

// Determine build environment based on NODE_ENV environment variable
const ENV = process.env.NODE_ENV;
const isTest = ['test', 'testing'].includes(ENV);
const isProduction = ['prod', 'production'].includes(ENV);
const isDev = !isTest && !isProduction;

// Common Settings
const config = {
  // Source folder resolution for relative paths
  context: __dirname + '/src',

  // Bundle entry points
  entry: {
    polyfills: './polyfills.ts',
    vendor: './vendor.ts',
    app: './main.ts'
  },


  output: {
    // Bundle output location
    path: __dirname + '/dist',

    // Server resource resolution path
    publicPath: '/',

    // File name pattern with cache busting hash
    filename: 'scripts/[name].[hash].js',

    // File name pattern for async chunks with cache busting hash
    chunkFilename: 'scripts/[name].[hash].chunk.js'
  },


  plugins: [
    // Cleans out your build folder
    // Reference: https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin(['dist']),

    // Splits vendor and polyfill modules into their respective bundles
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor', 'polyfills'],
      minChunks: Infinity
    }),

    // Extracts text from a bundle into its own file. Currently used to create separate CSS files
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    new ExtractTextPlugin('styles/[name].[contenthash].css'),

    // Automatically add script tags for your bundle files
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    new HTMLWebpackPlugin({
      template: './index.html',
      chunksSortMode: 'dependency'
    }),

    // Copy remaining files from src to dist
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([
      {
        from: 'favicon.ico'
      },
      {
        from: __dirname + '/public',
        to: 'public'
      }
    ]),

    // Lint our SCSS files
    // Reference: https://github.com/alleyinteractive/sasslint-webpack-plugin
    // new SassLintPlugin({
    //   ignorePlugins: ['extract-text-webpack-plugin']
    // })
  ],


  // Loaders Reference: http://webpack.github.io/docs/list-of-loaders.html
  module: {
    preLoaders: [
      // Lint TypeScript files before compilation
      // Reference: https://github.com/wbuchwalter/tslint-loader
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: /node_modules/
      },

      // Extract sourceMappingURL comments from JavaScript files for Webpack to use
      // Reference: https://github.com/webpack/source-map-loader
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // These packages have problems with their sourcemaps
          __dirname + 'node_modules/rxjs',
          __dirname + 'node_modules/@angular2-material',
          __dirname + 'node_modules/@angular'
        ]
      }
    ],
    loaders: [
      // Compile TypeScript files to JavaScript
      // Reference: https://github.com/s-panferov/awesome-typescript-loader
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },

      // Compile Global SCSS files to CSS files
      // sass-loader: https://github.com/jtangelder/sass-loader
      // postcss-loader: https://github.com/postcss/postcss-loader
      // css-loader: https://github.com/webpack/css-loader
      // style-loader: https://github.com/webpack/style-loader
      {
        test: /\.s(c|a)ss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader!sass-loader'),
        exclude: /app\//
      },

      // Compile Component SCSS files to CSS
      // sass-loader: https://github.com/jtangelder/sass-loader
      // postcss-loader: https://github.com/postcss/postcss-loader
      // css-loader: https://github.com/webpack/css-loader
      // css-to-string-loader: https://github.com/smithad15/css-to-string-loader
      {
        test: /\.s(c|a)ss$/,
        loaders: ['css-to-string-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader'],
        exclude: /styles\//
      },

      // Returned parsed JSON objects
      // Reference: https://github.com/webpack/json-loader
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      // Return HTML as text
      // Reference: https://github.com/webpack/raw-loader
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },

      // Process Images
      // Image-Webpack-Loader: https://github.com/tcoopman/image-webpack-loader
      // URL-Loader: https://github.com/webpack/url-loader
      {
        test: /\.(jpe?g|png|gif|ico|svg)$/,
        loaders: ['url-loader?limit=10000&name=images/[name].[hash].[ext]', 'image-webpack-loader']
      },

      // Process Fonts
      // URL-Loader: https://github.com/webpack/url-loader
      {
        test: /\.(eof|woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=10000&name=fonts/[name].[hash].[ext]'
      }
    ],

    // Files patterns that shouldn't be processed by loaders
    noParse: [
      __dirname + 'node_modules/zone.js/dist'
    ]
  },


  postcss: [
    // Automatically add vendor prefixes to your CSS
    // Reference: https://github.com/postcss/autoprefixer
    autoprefixer({
      browsers: ['last 2 versions', '> 5%']
    })
  ],

  // Configure settings for sass-loader
  sassLoader: {
    sourceMap: true
  },

  // Configure settings for image-webpack-loader
  imageWebpackLoader: {
    // Do not minify images when webpack is in debug mode (development)
    bypassOnDebug: true
  },

  // Choose a developer tool for debugging.
  // Reference: https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',

  // Configure the Webpack Dev Server
  // Reference: https://webpack.github.io/docs/webpack-dev-server.html#additional-configuration-options
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  },

  resolve: {
    // Extensions that can be used to resolve module require statements
    extensions: ['', '.ts', '.js']
  }
}

// Development Environment Settings
if (isDev) {
  // Switch loaders to debug mode
  config.debug = true;

  config.plugins.push(
    // Add global variables to use in your code
    // Reference: https://github.com/ArikMaor/extended-define-webpack-plugin
    new ExtendedDefineWebpackPlugin(devEnvVars)
  )
}

// Test Environment Settings
if (isTest) {
  // Switch loaders to debug mode
  config.debug = true;

  config.plugins.push(
    // Add global variables to use in your code
    // Reference: https://github.com/ArikMaor/extended-define-webpack-plugin
    new ExtendedDefineWebpackPlugin(testEnvVars)
  )
}

// Production Environment Settings
if (isProduction) {
  config.debug = false;

  config.plugins.push(
    // Add global variables to use in your code
    // Reference: https://github.com/ArikMaor/extended-define-webpack-plugin
    new ExtendedDefineWebpackPlugin(prodEnvVars),

    // Only emit files when there are no errors
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    new webpack.NoErrorsPlugin(),

    // Minimize all JavaScript chunks and switch loaders into minimizing mode
    // Reference: https://github.com/webpack/docs/wiki/list-of-plugins#uglifyjsplugin
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true
      }
    }),

    // Assign module and chunk ids by occurance count
    // Reference: https://github.com/webpack/docs/wiki/list-of-plugins#occurrenceorderplugin
    new webpack.optimize.OccurenceOrderPlugin(true),

    // Search for equal or similar files and deduplicate them in the output
    // Reference: https://github.com/webpack/docs/wiki/list-of-plugins#dedupeplugin
    new webpack.optimize.DedupePlugin()
  );
}

module.exports = config;
