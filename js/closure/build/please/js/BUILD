package(javac_tool = 'javac')

java_library(
    name = 'compiler',
    srcs = ['JSXTransformer.java', 'JSCompiler.java', 'Main.java'],
    deps = [
        '//third_party/java/closure_compiler',
        '//third_party/java/closure_compiler:jsx_transformer',
        '//third_party/java/closure_compiler:rhino',
    ],
    visibility = ['//js/closure:all'],
)

java_test(
    name = 'jsx_transformer_test',
    srcs = ['JSXTransformerTest.java'],
    deps = [
        ':compiler',
        '//third_party/java:junit',
    ],
)

java_test(
    name = 'js_compiler_test',
    srcs = ['JSCompilerTest.java'],
    deps = [
        ':compiler',
        '//third_party/java/closure_compiler',
        '//third_party/java:junit',
    ],
)
