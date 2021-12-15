const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        'vendor': [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'classnames',
            'redux',
            'react-loadable',
            'react-redux',
            'qs',
            'lodash',
            'axios',
            'ahooks',
            'events',
            '@reduxjs/toolkit'
        ]
    },
    output: {
        library: '[name]',
        path: path.join(__dirname, './dll'),
        filename: '[name].dll.[hash:6].js'
    },
    resolve: {
        modules: ['node_modules']
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            name: '[name]',
            path: path.join(__dirname, './dll/[name].dll.[hash:6].json'),
        }),
        new ProgressBarPlugin({
            format: 'Build [:bar] :percent (:elapsed seconds)',
            clear: false
        })
    ]
}





