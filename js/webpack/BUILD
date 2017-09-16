subinclude('//js')
package(webpack_config = ':config')

filegroup(
    name = 'config',
    srcs = ['config.js'],
    deps = [
        '//third_party/js:babel-loader',
        '//third_party/js:babel-preset-es2015',
        '//third_party/js:webpack',
    ],
)

js_binary(
    name = 'webpack',
    srcs = ['main.js', 'config.js'],
    deps = ['//third_party/js:webpack'],
)
