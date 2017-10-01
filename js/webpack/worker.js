// Support for plz's remote worker protocol, which is a binary protobuf-based
// serialisation over stdin / stdout.
//
// We endeavour not to break the serialisation, but it isn't strongly guaranteed
// at this point.

const fs = require('fs');
const pb = require('third_party/proto/worker_pb');
const process = require('process');

class Worker {

    // Constructor takes a single argument, the function to be called to handle compilations.
    // It receives an object with at least the properties tmpDir and srcs, and returns
    // an array of errors received. Success is assumed if the array is empty.
    constructor(callback) {
	this.callback = callback;
    }

    run() {
	const fd = process.stdin.fd;
	const sizeBuf = Buffer.allocUnsafe(4);
	// Continually read stdin to consume requests.
	while (true) {
	    // Recall that protobufs are unframed, so we send a 4-byte header first
	    // describing how long the forthcoming message will be.
	    fs.read(fd, sizeBuf, 0, 4, null, (err, bytesRead, buffer) => {
		this.check(err);
		const size = buffer.readInt32LE(0);
		// Now read this many bytes of the proto.
		const buf = Buffer.allocUnsafe(size);
		fs.read(fd, buf, 0, size, null, (err, bytesRead, buffer) => {
		    this.check(err);
		    const request = pb.worker.BuildRequest.deserializeBinary(buffer);
		    setImmediate(this.handleRequest, request);
		});
	    });
	}
    }

    handleRequest(request) {
	const fd = process.stdout.fd;
	const sizeBuf = Buffer.allocUnsafe(4);
	const errors = this.callback({
	    srcs: request.getSrcsList(),
	    tmpDir: request.getTempDir(),
	});
	const response = new pb.worker.BuildResponse();
	response.setRule(request.getRule());
	response.setSuccess(!errors);
	response.setErrorsList(errors);
	const buf = response.serializeBinary();
	sizeBuf.writeInt32LE(buf.length, 0, true);
	fs.write(fd, sizeBuf, (err, bytesWritten, buffer) => {
	    this.check(err);
	    fs.write(fd, buf, (err, bytesWritten, buffer) => {
		this.check(err);
	    });
	});
    }

    check(err) {
	if (err != nil) {
	    console.log(err);
	    process.exit(1);
	}
    }
}

module.exports = Worker;
