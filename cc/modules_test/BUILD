# This is a simple test of C++ modules, based on an example from codeproject.com

subinclude("//cc:modules")

package(
    cc_modules_clang = True,
    cpp_tool = "clang++",
    default_dbg_cppflags = "--std=c++1z -g3 -pipe -DDEBUG -Wall -Werror",
    default_opt_cppflags = "--std=c++1z -O3 -pipe -DNDEBUG -Wall -Werror",
)

cc_module(
    name = "hello",
    srcs = ["hello.cc"],
    interfaces = ["hello.cppm"],
)

cc_binary(
    name = "modules_test",
    srcs = ["main.cc"],
    deps = [":hello"],
)

cc_module(
    name = "f1",
    srcs = ["f1.cc"],
    interfaces = ["f1.cppm"],
    deps = [":q1"],
)

cc_module(
    name = "q1",
    srcs = ["q1.cc"],
    interfaces = ["q1.cppm"],
    deps = [":f1"],
)

cc_binary(
    name = "interdependent_modules_test",
    srcs = ["f1q1.cc"],
    deps = [
        ":f1",
        ":q1",
    ],
)
