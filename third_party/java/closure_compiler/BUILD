package(default_visibility = ['PUBLIC'])

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
