import { JWT } from "google-auth-library";

const client_email = process.env.NEXT_PUBLIC_CLIENT_EMAIL;
const private_key = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const authClientJwt = new JWT({
  email: client_email,
  key: private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export default authClientJwt;
