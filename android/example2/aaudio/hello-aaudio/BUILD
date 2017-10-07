subinclude('//android')
subinclude('//android:native')
package(javac_tool = 'javac')

ndk_toolchain(
    version = '4.9',
    arch = 'arm64',
    cflags = ['-Wno-unused-variable'],
    platform = 'android-26',
)

ndk_shared_object(
    name = 'native',
    srcs = glob(['src/main/cpp/*.cc']),
    out = 'libhello-aaudio.so',
    hdrs = glob(['src/main/cpp/*.h']),
    linker_flags = ['-laaudio -latomic'],
    deps = [
        '//android/example2/aaudio/third_party:aaudio_utils',
        '//android/example2/aaudio/third_party:android',
    ],
)

android_project(
    name = 'hello-aaudio',
    out = 'hello-aaudio.apk',
    native_libs = [':native'],
    deps = ['//android/example2/aaudio/aaudio_common'],
    visibility = ['//android/example2/...'],
)
