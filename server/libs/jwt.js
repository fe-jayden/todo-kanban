import path from "path";
import fs from "fs";
import { JWT } from "google-auth-library";

const keyFile = path.join(process.cwd(), "connect-sheet.json");
const credentials = JSON.parse(fs.readFileSync(keyFile, "utf8"));

const authClientJwt = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export default authClientJwt;
