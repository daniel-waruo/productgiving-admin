const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withPlugins = require("next-compose-plugins");
const withFonts = require('next-fonts');

module.exports = withPlugins(
  [
    withFonts({
        enableSvg: true,
        webpack(config, options) {
          config.module.rules.push(
            {
              test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
              use: [
                {
                  loader: 'file-loader',
                },
              ],
            },
            // ...
          );
          return config;
        }
      }
    ),
    withCSS({
      webpack: function (config) {
        config.module.rules.push({
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]'
            }
          }
        })
        return config
      }
    }),
    withSass,
    withImages
  ]
);
