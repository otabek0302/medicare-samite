﻿/* global firebase */
// public/firebase-messaging-sw.js

importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyAHjk8-PIXaoKjpy0cgBeJoyIYgDkhiIBA',
  authDomain: 'medicare-de4a6.firebaseapp.com',
  projectId: 'medicare-de4a6',
  storageBucket: 'medicare-de4a6.firebasestorage.app',
  messagingSenderId: '160309417131',
  appId: '1:160309417131:web:5dfb4c832d9c7a8a1793ee',
  measurementId: 'G-3D2YW6C0WQ'
};

try {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Retrieve Firebase Messaging instance
  const messaging = firebase.messaging();

  // Handle background messages
  messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/logo.svg' // Optional: Custom notification icon
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (error) {
  console.error('Firebase messaging service worker error:', error);
}
