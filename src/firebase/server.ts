import admin from 'firebase-admin'
import serviceAccountKey from './serviceAccountKey.json'

let app: admin.app.App

if (!admin.apps.length) {
    app =    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount)
    })
}else{
    app = admin.app()
}

export const adminMessaging = admin.messaging(app)