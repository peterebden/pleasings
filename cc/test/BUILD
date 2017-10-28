# A set of example rules that test ThinLTO.
# These are obviously too simple to illustrate any real performance benefits
# but do help to show that the rules work.
subinclude('//cc:thinlto')

cc_library(
    name = 'kitten',
    srcs = ['kitten.cc'],
    hdrs = ['kitten.h'],
)

cc_library(
    name = 'cat',
    srcs = ['cat.cc'],
    hdrs = ['cat.h'],
    deps = [':kitten'],
)

cc_library(
    name = 'litter',
    srcs = ['litter.cc'],
    hdrs = ['litter.h'],
    deps = [':kitten'],
)

cc_library(
    name = 'family',
    srcs = [
        'families.cc',
        'family.cc',
    ],
    hdrs = [
        'families.h',
        'family.h',
    ],
    deps = [
        ':cat',
        ':litter',
    ],
)

cc_test(
    name = 'test',
    srcs = ['test.cc'],
    deps = [':family'],
)
