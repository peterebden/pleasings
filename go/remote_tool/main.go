// package main implements a tool for fetching remote libraries, akin to go get
// but in a way that has better incrementality and verifiability (i.e. every transitive
// dependency can be fully pinned to a git revision and hash-verified).
package main

import (
	"fmt"

	"github.com/thought-machine/please/src/cli"
	"gopkg.in/op/go-logging.v1"

	"cli"
	"tools/please_go_tool/remote"
	"tools/please_go_tool/testmain"
)

var log = logging.MustGetLogger("remote_tool")

var opts = struct {
	Usage       string
	Verbosity   int    `short:"v" long:"verbose" default:"2" description:"Verbosity of output (higher number = more output, default 2 -> notice, warnings and errors only)"`
	Go          string `short:"g" long:"go" default:"go" description:"Go binary to run"`
	ShortFormat bool   `short:"s" long:"short_format" description:"Prints a shorter format that is used for deriving individual generated rules."`
	Hashes      bool   `short:"h" long:"hashes" description:"Adds hashes to the generated rules."`
	Repo        string `short:"r" long:"repo" description:"Repository we're fetching from"`
	Args        struct {
		Packages []string `positional-arg-name:"packages" description:"Packages to fetch" required:"true"`
	} `positional-args:"true" required:"true"`
}{
	Usage: `
remote_tool implements a

Firstly, it implements a code templater for Go tests.
This is essentially equivalent to what 'go test' does but it lifts some restrictions
on file organisation and allows the code to be instrumented for coverage as separate
build targets rather than having to repeat it for every test.

It also implements a dependency fetcher, akin to a Pleaseish version of go get, which
generates a bunch of build rules for separate dependencies (and at runtime is re-invoked to
find source files etc).
`,
}

func main() {
	parser := cli.ParseFlagsOrDie("please_go_tool", "7.9.0", &opts)
	cli.InitLogging(opts.Verbosity)

	if parser.Active.Name == "testmain" {
		coverVars, err := testmain.FindCoverVars(opts.TestMain.Dir, opts.TestMain.Exclude, opts.TestMain.Args.Sources)
		if err != nil {
			log.Fatalf("Error scanning for coverage: %s", err)
		}
		if err = testmain.WriteTestMain(opts.TestMain.Package, testmain.IsVersion18(opts.Go), opts.TestMain.Args.Sources, opts.TestMain.Output, coverVars); err != nil {
			log.Fatalf("Error writing test main: %s", err)
		}
	} else if parser.Active.Name == "remote" {
		s, err := remote.FetchLibraries(opts.Go, opts.Remote.ShortFormat, opts.Remote.Hashes, opts.Remote.Repo, opts.Remote.Args.Packages...)
		if err != nil {
			log.Fatalf("%s\n", err)
		}
		fmt.Print(s)
	}
}
