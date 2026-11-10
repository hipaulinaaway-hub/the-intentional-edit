// Builds public/index.html from src/index.html + content/home.json.
// No dependencies. Run with: node build.js
const fs = require("fs");
const path = require("path");

const root = __dirname;
const content = JSON.parse(fs.readFileSync(path.join(root, "content/home.json"), "utf8"));
let html = fs.readFileSync(path.join(root, "src/index.html"), "utf8");

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// Lists rendered as HTML
const lists = {
  "services.items": (items) => (items || []).map((t) => `      <li>${esc(t)}</li>`).join("\n"),
  "story.paragraphs": (items) => (items || []).filter(Boolean).map((t) => `      <p>${esc(t)}</p>`).join("\n"),
};

const get = (key) => key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), content);

html = html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
  const value = get(key);
  if (lists[key]) return lists[key](value);
  if (value === undefined) {
    console.warn(`Warning: no content for {{${key}}}`);
    return "";
  }
  return esc(value);
});

fs.mkdirSync(path.join(root, "public"), { recursive: true });
fs.writeFileSync(path.join(root, "public/index.html"), html);
console.log("Built public/index.html");
