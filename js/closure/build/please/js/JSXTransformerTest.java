package build.please.js;

import org.junit.Test;

import static org.junit.Assert.assertEquals;


public class JSXTransformerTest {

    @Test
    public void testConvertJSX() {
        String input = "React.renderComponent(<h1>Hello, world!</h1>,document.getElementById('example'));";
        String expected = "React.renderComponent(React.createElement(\"h1\", null, \"Hello, world!\"),document.getElementById('example'));";

        JSXTransformer megatron = new JSXTransformer();
        String output = megatron.transform(input);
        assertEquals(expected, output);
    }
}
