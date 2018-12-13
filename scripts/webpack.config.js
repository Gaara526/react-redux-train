/**
 * @since 2018-12-13 15:18
 * @author pengyumeng
 */

const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PostcssImport = require('postcss-import');
const precss = require('precss');
const cssnext = require('postcss-cssnext');

const ENV_DEVELOPMENT = 'development';
const HOST = process.env.HOST || `0.0.0.0`;
const PORT = process.env.PORT || 9999;

const SRC = path.join(process.cwd(), 'src');
const BUILD = path.join(process.cwd(), 'build');
const TEMPLATE = path.join(process.cwd(), 'template');
const BASEDIR = path.join(__dirname, '..');

const NODE_ENV = process.env.NODE_ENV || 'production';

const config = {
    entry: {},
    output: {
        path: `${BUILD}`,
        filename: '[name]',
        publicPath: './'
    },
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=2048000',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.pcss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    PostcssImport(),
                                    precss,
                                    cssnext,
                                ];
                            },
                        },
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                include: [
                    path.resolve(BASEDIR, 'src'),
                ],
                use: 'eslint-loader',
            }
        ]
    },
    plugins: [],
};


const entryFileNameList = glob.sync(path.join(SRC, '*/entries') + '/*.js');
entryFileNameList.forEach((item) => {
    const {
        entry,
        plugins
    } = config;

    let fileName = path.basename(item, '.js');
    entry[fileName] = [`${item}`];
    console.log('entry[item]: ', entry[fileName]);

    entry[fileName].unshift(`webpack-dev-server/client?http://${HOST}:${PORT}`);
    entry[fileName].unshift(`webpack/hot/log-apply-result`);

    entry[fileName].unshift(`webpack/hot/only-dev-server`);
    entry[fileName].unshift(`react-hot-loader/patch`);

    const htmlName = fileName.toLowerCase();
    plugins.push(
        new HtmlWebpackPlugin({
            template: `${TEMPLATE}/index.html`,
            filename: `${htmlName}.html`,
            hash: false,
            inject: 'body',
            chunks: [
                // 'common',
                fileName,
            ]
        })
    );
});

switch (NODE_ENV) {
    case ENV_DEVELOPMENT:
        console.log('dev start');
        config.output.publicPath = '/';
        config.devServer = {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: {
                colors: true,
                hash: false,
                version: false,
                timings: false,
                assets: false,
                chunks: false,
                modules: false,
                reasons: false,
                children: false,
                source: false,
                errors: true,
                errorDetails: true,
                warnings: true,
                publicPath: false
            },
            host: HOST,
            port: PORT
        };

        config.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
        break;
    default:
        break;
}

module.exports = config;
