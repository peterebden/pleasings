subinclude('//rust')
package(rustc_tool = '//rust/test:toolchain')

rust_toolchain(
    name = 'toolchain',
    version = '1.20.0',
    hashes = ['98024c9678f6269f85299f20f90fce264347f0b5'],
)

rust_library(
    name = 'lib',
    srcs = ['lib.rs'],
)

rust_binary(
    name = 'bin',
    main = 'main.rs',
    deps = [
        ':lib',
    ],
)

rust_test(
    name = 'test',
    srcs = ['lib.rs'],
)
