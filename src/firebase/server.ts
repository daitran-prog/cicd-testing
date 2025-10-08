import admin, { ServiceAccount } from 'firebase-admin'
import { readFileSync } from 'fs';

let app: admin.app.App

if (!admin.apps.length) {
    const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    let serviceAccount;

    if (!path) {
        const encoded = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;
        const json = encoded
            ? Buffer.from(encoded, "base64").toString("utf-8")
            : "{}";
        serviceAccount = JSON.parse(json);
    } else {
        const json = readFileSync(path, "utf-8");
        serviceAccount = JSON.parse(json);
    }
    app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    })
} else {
    app = admin.app()
}

export const adminMessaging = admin.messaging(app)