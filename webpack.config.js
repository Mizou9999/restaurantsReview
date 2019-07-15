const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const proxy = require('http-proxy-middleware')



module.exports = {
    entry: {
        entry: __dirname + '/src/app.js'
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9300,
        watchContentBase: true,
        proxy: {
            '/api': {
                target: 'https://maps.googleapis.com',
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            }
        }
    },
    module: {
        rules: [{
                test: /\.(json|html)/,
                test: /\.css$/,
                use: [{ loader: 'style-loader/url' },
                    { loader: 'file-loader' }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2)$/,
                use: [
                    'file-loader'
                ]
            }

        ],
        
    },
    plugins:[
        new HtmlWebpackPlugin({
            // Required
            inject: false,
            template: require('html-webpack-template'),
            // template: 'node_modules/html-webpack-template/index.ejs',
      
            // Optional
            appMountId: 'app',
            appMountHtmlSnippet: '<div class="app-spinner"><i class="fa fa-spinner fa-spin fa-5x" aria-hidden="true"></i></div>',
            headHtmlSnippet: '<style>div.app-spinner {position: fixed;top:50%;left:50%;}</style >',
           
                   
            meta: [
              {
                name: 'description',
                content: 'A better default template for html-webpack-plugin.'
              }
            ],
            mobile: true,
            lang: 'en-US',
            links: [
              'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
              
            ],
                      
            title: 'Restaurant Reviews',
            
          })
    ]

}