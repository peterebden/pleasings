package(default_visibility = ['PUBLIC'])

filegroup(
    name = 'android',
    srcs = ['android.build_defs'],
)

filegroup(
    name = 'native',
    srcs = ['native.build_defs'],
)

filegroup(
    name = 'appium',
    srcs = ['appium.build_defs'],
)

python_library(
    name = 'appium_test_base',
    srcs = ['appium_test_base.py'],
    test_only = True,
    deps = ['//third_party/python:appium'],
)
