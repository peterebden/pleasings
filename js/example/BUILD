subinclude('//js')

# These rules are broken up more than is necessary to illustrate how the different
# libraries work together.
js_library(
    name = 'winner',
    srcs = ['winner.js'],
)

jsx_library(
    name = 'game',
    srcs = ['game.js'],
    deps = [
        ':winner',
        '//third_party/js:react',
    ],
)

js_binary(
    name = 'js',
    srcs = ['main.js'],
    out = 'game.js',
    deps = [
        '//third_party/js:react-dom',
    ],
)

js_bundle(
    name = 'vendor',
    srcs = [
        '//third_party/js:react',
        '//third_party/js:react-dom',
    ],
)

filegroup(
    name = 'example',
    srcs = [
        'game.css',
        'game.html',
        ':js',
        ':vendor',
    ],
)
