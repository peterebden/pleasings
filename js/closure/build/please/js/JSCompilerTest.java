package build.please.js;

import org.junit.Test;
import java.util.Arrays;
import com.google.javascript.jscomp.CompilerOptions;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;

public class JSCompilerTest {

    @Test
    public void testCompileJavascript() {
        // This is pretty brittle since it's asserting specific compiler output, but it's a fairly
        // straightforward example and we want to make sure it's doing *something* of use.
        String input = "function bob(someParam) { someParam += ' world'; Console.log(someParam); } bob('hello');";
        String expected = "Console.log(\"hello world\");";
        JSCompiler compiler = new JSCompiler(Arrays.asList("-O=ADVANCED"));
        String output = compiler.toSource(compiler.compile(Arrays.asList(input), Arrays.asList("test.js")));
        assertEquals(expected, output);
    }

    @Test
    public void testParseOptions() {
        CompilerOptions options = JSCompiler.parseOptions(Arrays.asList("-O=SIMPLE"));
        assertFalse(options.smartNameRemoval); // Arbitrary property that ADVANCED sets but others don't.
        options = JSCompiler.parseOptions(Arrays.asList("-O=ADVANCED"));
        assertTrue(options.smartNameRemoval);
        options = JSCompiler.parseOptions(Arrays.asList("--in=ES_2015"));
        assertEquals(CompilerOptions.LanguageMode.ECMASCRIPT_2015, options.getLanguageIn());
        options = JSCompiler.parseOptions(Arrays.asList("--out=ES5"));
        assertEquals(CompilerOptions.LanguageMode.ECMASCRIPT5, options.getLanguageOut());
    }
}
