subinclude('//android')
subinclude('//android:native')
package(javac_tool = 'javac')

ndk_toolchain(
    version = '4.9',
    arch = 'arm64',
    platform = 'android-26',
)

ndk_library(
    name = 'native',
    srcs = glob(['src/main/cpp/*.cc']),
    hdrs = glob(['src/main/cpp/*.h']),
)

android_project(
    name = 'simple_synth',
    out = 'SimpleSynth.apk',
    resource_deps = [
        '//third_party/android:appcompat-v7',
    ],
    deps = [
        '//third_party/android:appcompat-v7',
        '//third_party/android:support-v4',
    ],
    visibility = ['//android/example2/...'],
)
