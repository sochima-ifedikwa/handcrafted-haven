const { randomBytes } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const envPath = path.join(process.cwd(), ".env.development.local");
const secret = randomBytes(32).toString("base64url");

let content = "";
if (fs.existsSync(envPath)) {
  content = fs.readFileSync(envPath, "utf8");
}

if (/^NEXTAUTH_SECRET=.*/m.test(content)) {
  content = content.replace(
    /^NEXTAUTH_SECRET=.*/m,
    `NEXTAUTH_SECRET=${secret}`,
  );
} else {
  content = `${content.trimEnd()}\nNEXTAUTH_SECRET=${secret}\n`;
}

fs.writeFileSync(envPath, content, "utf8");
console.log("NEXTAUTH_SECRET has been set in .env.development.local");
