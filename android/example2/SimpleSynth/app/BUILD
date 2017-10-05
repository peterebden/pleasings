subinclude('//android')
package(javac_tool = 'javac')

cc_library(
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
