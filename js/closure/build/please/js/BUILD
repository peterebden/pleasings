package(javac_tool = 'javac')

java_library(
    name = 'jsx_transformer',
    srcs = ['JSXTransformer.java'],
    deps = [
        '//third_party/java/closure_compiler:jsx_transformer',
        '//third_party/java/closure_compiler',
        '//third_party/java/closure_compiler:rhino',
    ],
)

java_test(
    name = 'jsx_transformer_test',
    srcs = ['JSXTransformerTest.java'],
    deps = [
        ':jsx_transformer',
        '//third_party/java:junit',
    ],
)
