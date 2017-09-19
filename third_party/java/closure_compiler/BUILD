package(default_visibility = ['PUBLIC'])

remote_file(
    name = 'jsx_transformer_js',
    url = 'https://unpkg.com/react@0.13.3/dist/JSXTransformer.js',
    hashes = ['bc80f5c68aa15e8b99a2e120b37b9121377003e4'],
)

java_library(
    name = 'jsx_transformer',
    resources = [':jsx_transformer_js'],
    resources_root = '.',
)

maven_jar(
    name = 'rhino',
    id = 'org.mozilla:rhino:1.7.7.2',
)

maven_jars(
    name = 'closure_compiler_main',
    id = 'com.google.javascript:closure-compiler-main:v20170910',
    deps_only = True,
)

maven_jar(
    name = 'closure_compiler',
    id = 'com.google.javascript:closure-compiler:v20170910',
    deps = [':closure_compiler_main']
)
