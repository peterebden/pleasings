subinclude('//js')
package(
    default_visibility = ['PUBLIC'],
    rollup_tool = '//third_party/js/rollup',
)

build_rollup(
    name = 'rollup_node',
    main = 'node.js',
    config = 'node.config.js',
    rollup = '//third_party/js/rollup',
    deps = [
        '//third_party/js/rollup:rollup-plugin-node-resolve',
        '//third_party/js/rollup:rollup-plugin-babel',
        '//third_party/js/rollup:rollup-plugin-commonjs',
        '//third_party/js/rollup:babel-core',
        '//third_party/js/rollup:babel-preset-es2015-rollup',
        '//third_party/js/rollup:rollup-plugin-json',
    ],
)
