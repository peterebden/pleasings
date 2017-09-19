java_library(
    name = 'lib',
    srcs = glob(['build/please/js/*.java']),
    resources = ['//third_party/js:jsx_transformer'],
    deps = [
        '//third_party/java/closure_compiler',
        '//third_party/java/closure_compiler:rhino',
    ],
)

java_binary(
    name = 'compiler',
    deps = [':lib'],
)
