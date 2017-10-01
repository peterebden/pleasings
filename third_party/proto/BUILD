subinclude('//grpc_gateway')
package(proto_languages = [
    'go',
    'py',
    'js',
])

# This is the googleapis dependency for grpc-gateway.
grpc_gateway_api(
    name = 'grpc_gateway_api',
    visibility = ['PUBLIC'],
)

# This is plz's worker proto.
# Right now there's no way of getting it other than vendorising it.
proto_library(
    name = 'worker',
    srcs = ['worker.proto'],
    visibility = ['PUBLIC'],
)
