# React Native for Web SSR with Expo

## How does it work

Goal: SSR a page at `/myapi/<whatever>`

1. Make a normal route that you want to get server side rendered, at a DIFFERENT URL (app/mydynamic/[id].tsx)

2. Make an API route at the url you want (app/myapi/[id]+api.tsx)


```ts
import { readFileSync } from "fs";

const FINDER = "<meta charSet=\"utf-8\"/>"

export function GET(request: Request) {
    // Get the URL params
    const id = request.url.split("/myapi/")[1];

    // Edit your data
    const meta = `
        <meta property="description" content="Look you passed in ${id} to the URL" />
    `
  
  // Replace parts of the normal route you want to ssr
  const html = readFileSync("dist/server/mydynamic/[id].html")
      .toString()
      .replace("></title>", `>Your var: ${id}</title>`)
      .replace(FINDER, FINDER + meta);
  return new Response(html, { headers: { "Content-Type": "text/html" }});
}
```


3. Modify the build script

After Expo generates the client, you need to modify the JS bundle.

This is getting deployed on vercel so the build script looks like this:

```
"buildCommand": "expo export -p web && sed -i 's/mydynamic/myapi/g' dist/client/_expo/static/js/web/entry-*",
```

You have to replace the `mydynamic` with `myapi` and then it will work.



