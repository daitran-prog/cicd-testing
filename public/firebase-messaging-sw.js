// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey:'AIzaSyAZJYNSGVzYTmxLqPFTou3wukdq1ApoVxA',
    authDomain: 'first-try-94a3e.firebaseapp.com',
    projectId: 'first-try-94a3e',
    messagingSenderId: '313724414959',
    appId: '1:313724414959:web:0a9ecd1fbef3a8de5c641a',
})

const messaging = firebase.messaging();

// Optional: customize notification display
messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/icon.png",
    });
});
