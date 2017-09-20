subinclude('//js')

js_library(
    name = 'game',
    srcs = ['game.js'],
    deps = [
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
