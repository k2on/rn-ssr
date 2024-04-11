import { readFileSync } from "fs";

const FINDER = "<meta charSet=\"utf-8\"/>"

export function GET(request: Request) {
    const id = request.url.split("/myapi/")[1];

    const meta = `
        <meta property="description" content="Look you passed in ${id} to the URL" />
    `
  const html = readFileSync("dist/server/mydynamic/[id].html")
      .toString()
      .replace("></title>", `>Your var: ${id}</title>`)
      .replace(FINDER, FINDER + meta);
  return new Response(html, { headers: { "Content-Type": "text/html" }});
}

