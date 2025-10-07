import admin, { ServiceAccount } from 'firebase-admin'
import { readFileSync } from 'fs';

let app: admin.app.App

if (!admin.apps.length) {

    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    let serviceAccount: ServiceAccount;

    if (!credentialsPath) {
        const credentialsJsonEncoded =
            process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;
        const credentialsJson = credentialsJsonEncoded
            ? Buffer.from(credentialsJsonEncoded, "base64").toString("utf-8")
            : "{}";
        serviceAccount = JSON.parse(credentialsJson) as ServiceAccount;
    } else {
        // serviceAccount = require(credentialsPath) as ServiceAccount;
        const credentialsJson = readFileSync(credentialsPath, "utf-8");
        serviceAccount = JSON.parse(credentialsJson) as ServiceAccount;
    }

    app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    })
} else {
    app = admin.app()
}

export const adminMessaging = admin.messaging(app)