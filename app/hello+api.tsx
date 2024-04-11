import { readFileSync } from "fs";

export function GET(request: Request) {
  const html = readFileSync("dist/server/(tabs)/index.html").toString();
  return new Response(html, { headers: { "Content-Type": "text/html" }});
}

