subinclude('//js')
package(
    webpack_config = ':config',
    webpack_tool = '//third_party/js/webpack',
    node_path = '$TMP_DIR:$TMP_DIR/third_party/js/webpack',
)

filegroup(
    name = 'config',
    srcs = ['config.js'],
)

js_binary(
    name = 'webpack',
    srcs = ['main.js', 'config.js'],
    deps = [
        '//third_party/js/webpack:babel-loader',
        '//third_party/js/webpack:babel-preset-es2015',
        '//third_party/js/webpack:shebang-loader',
        '//third_party/js/webpack:webpack',
        # TODO(peterebden): This is ugly, we have to repeat webpack's dependencies here
        #                   (they don't get copied as expected because it's a tool as well).
        #                   We really shouldn't have to do this.
        '//third_party/js/webpack:acorn',
        '//third_party/js/webpack:acorn-dynamic-import',
        '//third_party/js/webpack:ajv',
        '//third_party/js/webpack:ajv-keywords',
        '//third_party/js/webpack:async',
        '//third_party/js/webpack:enhanced-resolve',
        '//third_party/js/webpack:escope',
        '//third_party/js/webpack:interpret',
        '//third_party/js/webpack:json-loader',
        '//third_party/js/webpack:json5',
        '//third_party/js/webpack:loader-runner',
        '//third_party/js/webpack:loader-utils',
        '//third_party/js/webpack:memory-fs',
        '//third_party/js/webpack:mkdirp',
        '//third_party/js/webpack:node-libs-browser',
        '//third_party/js/webpack:source-map',
        '//third_party/js/webpack:supports-color',
        '//third_party/js/webpack:tapable',
        '//third_party/js/webpack:uglifyjs-webpack-plugin',
        '//third_party/js/webpack:watchpack',
        '//third_party/js/webpack:webpack-sources',
        '//third_party/js/webpack:yargs',
    ],
)
