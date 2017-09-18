subinclude('//js')
package(default_visibility = ['PUBLIC'])

filegroup(
    name = 'config',
    srcs = ['config.js'],
)

filegroup(
    name = 'node_config',
    srcs = ['node_config.js'],
)

# This creates a standalone binary of Webpack that's used to bundle everything else.
webpack_binary(
    name = 'webpack',
    srcs = ['main.js', 'config.js'],
    webpack = '//third_party/js/webpack',
    config = ':node_config',
    deps = [
        '//third_party/js/webpack:babel-core',
        '//third_party/js/webpack:babel-loader',
        '//third_party/js/webpack:babel-preset-es2015',
    ],
)

# This similarly creates a standalone Webpack, but for Node binaries instead of for the web.
webpack_binary(
    name = 'node_webpack',
    srcs = ['node_main.js', 'node_config.js'],
    webpack = '//third_party/js/webpack',
    config = ':node_config',
    deps = [
        '//third_party/js/webpack:babel-core',
        '//third_party/js/webpack:babel-loader',
        '//third_party/js/webpack:babel-preset-es2015',
    ],
)
