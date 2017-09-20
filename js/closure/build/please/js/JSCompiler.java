package build.please.js;

import java.io.IOException;
import java.lang.IllegalArgumentException;
import java.util.List;
import java.util.ArrayList;

import com.google.javascript.jscomp.CompilationLevel;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.Result;
import com.google.javascript.jscomp.SourceFile;
import com.google.javascript.jscomp.CommandLineRunner;
import com.google.javascript.jscomp.CompilerOptions.LanguageMode;

class JSCompiler {

    private CompilerOptions options;
    private Compiler closure;
    private List<SourceFile> externs;

    /**
     * Creates a new JSCompiler.
     * Note that you should create a new compiler for every round of source files, don't reuse them.
     */
    public JSCompiler(List<String> commandLine) {
        this(parseOptions(commandLine));
    }

    /**
     * Creates a new JSCompiler.
     * Note that you should create a new compiler for every round of source files, don't reuse them.
     */
    public JSCompiler(CompilerOptions options) {
        this.closure = new Compiler();
        this.options = options;
        try {
            this.externs = CommandLineRunner.getBuiltinExterns(CompilerOptions.Environment.BROWSER);
        } catch (IOException ex) {
            // Not quite sure how/why this would happen?
            throw new RuntimeException(ex);
        }
    }

    /**
     * Compiles the given sources.
     * This is appropriate to use when the source is already in memory.
     */
    public Result compile(List<String> inputs, List<String> filenames) {
        List<SourceFile> sources = new ArrayList<SourceFile>(inputs.size());
        for (int i = 0; i < inputs.size(); ++i) {
            sources.add(SourceFile.fromCode(filenames.get(i), inputs.get(i)));
        }
        return closure.compile(externs, sources, options);
    }

    /**
     * Compiles the given sources.
     * This is appropriate to use when the source is on disk.
     */
    public Result compile(List<String> filenames) {
        List<SourceFile> sources = new ArrayList<SourceFile>(filenames.size());
        for (String filename : filenames) {
            sources.add(SourceFile.fromFile(filename));
        }
        return closure.compile(externs, sources, options);
    }

    /**
     * Convenience function for callers to go straight to a string.
     */
    public String toSource(Result result) {
        if (!result.success) {
            throw new RuntimeException("Compilation failed");
        }
        return closure.toSource();
    }

    /**
     * Parser function for simple command-line style compilation options.
     * This is not intended to be a robust user-facing parser; we control both ends of this
     * and just have to use something like this as an interface.
     */
    public static CompilerOptions parseOptions(List<String> opts) throws IllegalArgumentException {
	CompilerOptions options = new CompilerOptions();
        for (String opt : opts) {
            if (opt.startsWith("--in")) {
                options.setLanguageIn(toLanguageMode(opt.substring(5)));
            } else if (opt.startsWith("--out")) {
                options.setLanguageOut(toLanguageMode(opt.substring(6)));
            } else if (opt.startsWith("-O")) {
                CompilationLevel.fromString(opt.substring(3)).setOptionsForCompilationLevel(options);
            } else {
                throw new IllegalArgumentException("Unknown option " + opt);
            }
        }
        return options;
    }

    private static LanguageMode toLanguageMode(String s) throws IllegalArgumentException {
        LanguageMode mode = LanguageMode.fromString(s);
        if (mode == null) {
            throw new IllegalArgumentException("Unknown language mode " + s);
        }
        return mode;
    }

}
