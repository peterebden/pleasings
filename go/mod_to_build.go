// Package main implements a converter from Go mod information to BUILD files
// using the new go_module rule.
package main

import (
	"bufio"
	"encoding/json"
	"os"
	"strings"

	"github.com/peterebden/go-cli-init"
	"gopkg.in/op/go-logging.v1"
)

var log = logging.MustGetLogger("mod_to_build")

var opts = struct {
	Usage     string
	Verbosity cli.Verbosity `short:"v" long:"verbosity" description:"Verbosity of output (error, warning, notice, info, debug)" default:"notice"`
	Args      struct {
		Packages []string `positional-arg-name:"packages" description:"Packages to write the BUILD file for"`
	} `positional-args:"true"`
}{
	Usage: `
mod_to_build is a smol binary for taking in Go package specifiers and
writing a BUILD file based on them.

Typical usage is either manual:
    mod_to_build google.golang.org/grpc > third_party/go/BUILD
or to convert a set of modules:
    go mod graph | mod_to_build > third_party/go/BUILD
`,
}

func main() {
	cli.ParseFlagsOrDie("mod_to_build", &opts)
	cli.InitLogging(opts.Verbosity)
	if len(opts.Args.Packages) == 0 {
		log.Notice("Reading packages from stdin...")
		scanner := bufio.NewScanner(os.Stdin)
		for scanner.Scan() {
			opts.Args.Packages = append(opts.Args.Packages, scanner.Text())
		}
		if err := scanner.Err(); err != nil {
			log.Fatalf("%s", err)
		}
	}
	mustConvertPackages(opts.Args.Packages)
}

func mustConvertPackages(packages []string) {
	modules := map[string]string{}
	for _, pkg := range packages {
		// Packages are accepted either as standalone specifiers or in `go mod graph` format,
		// which has a prefix of the depending package.
		if idx := strings.IndexByte(pkg, ' '); idx != -1 {
			pkg = pkg[idx+1:]
		}

	}
}
