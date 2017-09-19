package(default_visibility = ['PUBLIC'])

maven_jar(
    name = 'protoc-gen-grpc-java',
    id = 'io.grpc:protoc-gen-grpc-java:1.1.2',
    binary = True,
)

maven_jar(
    name = 'protobuf',
    id = 'com.google.protobuf:protobuf-java:3.2.0',
)

maven_jars(
    name = 'grpc-all',
    id = 'io.grpc:grpc-all:1.1.2',
    deps = [':protobuf'],
)

maven_jar(
    name = 'junit',
    id = 'junit:junit:4.12',
    hash = 'sha1: a791201ac8a3d2a251045a52e264de01343ad2df',
    test_only = True,
)
