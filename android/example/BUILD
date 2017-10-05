subinclude('//android')
package(javac_tool = 'javac')

android_resource(
    name = 'resources',
    manifest = 'app/src/main/AndroidManifest.xml',
    package = 'com.example.android.asymmetricfingerprintdialog',
    res = 'app/src/main/res',
    resources_root = 'android/app/src/main',
    deps = [
        '//third_party/android:appcompat-v7',
    ],
)

android_library(
    name = 'lib',
    srcs = glob(['app/src/main/java/**/*.java']),
    deps = [
        ':resources',
        '//third_party/android:annotations',
        '//third_party/android:dagger',
        '//third_party/android:dagger-compiler',
        '//third_party/android:javax.inject',
    ],
)

android_binary(
    name = 'apk',
    out = 'AsymmetricFingerprintDialog.apk',
    resource_deps = [
        '//third_party/android:appcompat-v7',
    ],
    resources = ':resources',
    deps = [':lib'],
)
