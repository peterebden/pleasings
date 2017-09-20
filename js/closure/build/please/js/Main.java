package build.please.js;

import com.google.javascript.jscomp.Result;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Arrays;

class Main {

    /**
     * Main for standalone command-line compiler.
     * Will probably be removed later in favour of worker form.
     */
    public static void main(String[] argv) throws Exception {
        List<String> args = Arrays.asList(argv);
        List<String> srcs = Arrays.asList(System.getenv("SRCS_JS").split(" "));
        String out = System.getenv("OUTS_JS");

        JSCompiler compiler = new JSCompiler(args);
        Result result;
        if (args.contains("--jsx")) {
            // Need JSX transpilation too.
            JSXTransformer megatron = new JSXTransformer();
            List<String> transformed = megatron.readAndTransformAll(srcs);
            result = compiler.compile(transformed, srcs);
        } else {
            result = compiler.compile(srcs);
        }
        String source = null;
        try {
            compiler.toSource(result);
        } catch (Exception ex) {
            System.exit(1);  // Exception has already been reported.
        }
        Files.write(Paths.get(out), source.getBytes(StandardCharsets.UTF_8));
    }

}
