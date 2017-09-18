subinclude('//js')
package(
    default_visibility = ['PUBLIC'],
    rollup_tool = '//third_party/js/rollup',
)

js_binary(
    name = 'rollup_node',
    srcs = ['node.js'],
    deps = [
        '//third_party/js/rollup',
        '//third_party/js/rollup:rollup-plugin-node-resolve',
        '//third_party/js/rollup:rollup-plugin-commonjs',
    ],
)
