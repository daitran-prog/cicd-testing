import admin, { ServiceAccount } from 'firebase-admin'
import { readFileSync } from 'fs';

let app: admin.app.App

if (!admin.apps.length) {
    let serviceAccount;

    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        // read from file
        const raw = readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf-8");
        serviceAccount = JSON.parse(raw);
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64) {
        // fallback: decode from env var
        const credentialsJsonEncoded =
            process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;
        const credentialsJson = credentialsJsonEncoded
            ? Buffer.from(credentialsJsonEncoded, "base64").toString("utf-8")
            : "{}";
        serviceAccount = JSON.parse(credentialsJson) as ServiceAccount;
    } else {
        throw new Error("Firebase credentials not found");
    }

    app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    })
} else {
    app = admin.app()
}

export const adminMessaging = admin.messaging(app)