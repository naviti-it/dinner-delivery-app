const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const plugins = [
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'src/public', 'index.html'),
        minify: {
            collapseWhitespace: isProd
        }
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, 'src/public', 'favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }
        ]
    }),
    new MiniCssExtractPlugin({
        filename: filename('css')
    }),
    new Dotenv({ systemvars: true }),
]

const AddEslintPlugin = () => {
    if (isDev) {
        plugins.push(new ESLintWebpackPlugin())
    }
    return plugins

}


const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: 'single'
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}


const cssLoaders = (extra) => {
    const loaders = [
        MiniCssExtractPlugin.loader,
        'css-loader']

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const babelOptions = (preset) => {
    const options = {
        presets: [
            '@babel/preset-env',
        ]
    }

    if (preset) {
        options.presets.push(preset)
    }

    return options
}



module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    resolve: {
        extensions: ["*", '.js', '.json', '.jsx'],
    },
    optimization: optimization()
    ,
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
            watch: true
        },
        compress: true,
        port: 9000,
        open: true,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : false,
    plugins: AddEslintPlugin(),
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: cssLoaders('postcss-loader')

            },
            {
                test: /\.less$/i,
                use: cssLoaders('less-loader')


            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader')


            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions()
                }
            },
            {
                test: /\.m?ts$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.m?(jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            }


        ]
    }
}