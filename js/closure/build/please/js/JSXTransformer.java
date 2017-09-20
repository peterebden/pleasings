// The contents of this file were originally based on https://gist.github.com/mingfang/3784a0a6e58c24dda687
// although now fairly heavily modified to remove the dynamic require stuff.

package build.please.js;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.NativeObject;
import org.mozilla.javascript.Scriptable;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

class JSXTransformer {
    private static final String JSX_TRANSFORMER = "/JSXTransformer.js";

    private Context ctx;
    private Scriptable exports;
    private Scriptable scope;
    private Function transform;

    public JSXTransformer() {
        ctx = Context.enter();
        try {
            scope = ctx.initStandardObjects();
            InputStream in = getClass().getResourceAsStream(JSX_TRANSFORMER);
            if (in == null) {
                throw new IOException("Failed to load resource " + JSX_TRANSFORMER);
            }
            ctx.evaluateReader(scope, new InputStreamReader(in), JSX_TRANSFORMER, 1, null);
            Object transformer = get(scope, "JSXTransformer");
            this.transform = (Function) get((Scriptable) transformer, "transform");;
        } catch (IOException ex) {
            // Shouldn't really happen since we're reading from within the jar.
            throw new RuntimeException(ex);
        } finally {
            Context.exit();
        }
    }

    public String transform(String jsx) {
        Context.enter();
        try {
            NativeObject result = (NativeObject) transform.call(ctx, scope, exports, new String[]{jsx});
            return result.get("code").toString();
        } finally {
            Context.exit();
        }
    }

    public List<String> readAndTransformAll(List<String> filenames) throws IOException {
        List<String> transformed = new ArrayList<>(filenames.size());
        for (String filename : filenames) {
            String contents = new String(Files.readAllBytes(Paths.get(filename)), StandardCharsets.UTF_8);
            transformed.add(transform(contents));
        }
        return transformed;
    }

    private Object get(Scriptable scope, String id) {
        Object obj = scope.get(id, this.scope);
        if (transform == Scriptable.NOT_FOUND) {
            throw new RuntimeException("Failed to find object named " + id);
        }
        return obj;
    }
}
