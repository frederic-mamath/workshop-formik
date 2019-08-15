require('dotenv').config();

const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');
const dotenv = require('dotenv-webpack');
const path = require('path');
const { compose } = require('ramda');

module.exports = compose(
  withTypescript,
  withSass
)({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]___[local]___[hash:base64:5]'
  },
  target: 'serverless',
  webpack: config => {
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      new dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ];
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['ducks'] = path.join(__dirname, 'ducks')
    config.resolve.alias['helpers'] = path.join(__dirname, 'helpers')
    config.resolve.alias['styles'] = path.join(__dirname, 'styles')

    return config;
  }
});
