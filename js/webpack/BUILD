subinclude('//js')
package(
    webpack_config = ':config',
    webpack_tool = '//third_party/js/webpack:webpack_tool',
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
        '//third_party/js/webpack:babel-core',
        '//third_party/js/webpack:babel-loader',
        '//third_party/js/webpack:babel-preset-es2015',
        '//third_party/js/webpack:shebang-loader',
        '//third_party/js/webpack:webpack',
    ],
)
