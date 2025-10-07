'use client'
import Image from "next/image";
import SignUpForm from "./components/sign-up";
import SignInForm from "./components/sign-in";
import React, { useEffect, useMemo } from "react";
import { addUser, fetchUsers } from "../firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, messaging, requestForToken } from "../firebase/config";
import Link from "next/link";
import { logout } from "../firebase/auth";
import { getToken, onMessage } from "firebase/messaging";
import MemoizedComponent from "./components/memoized";

const userContext = React.createContext(null);

export default function Home() {
  const [users, setUsers] = React.useState<any[]>([]);
  const [profile, setProfile] = React.useState<any>();

  const items = ['Item 1', 'Item 2', 'Item 3']

  const handleGetUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      console.log(fetchedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  const handleNotification = async () => {
    const token = await getToken(messaging!, { vapidKey: 'BE4vonviAOP8VqmKqrxL3q2fTfXVIM2rYJKuy7m6silUnnK3Y3KUF0tEB-DWZHfizLivv3btRhMD3zu5iZPczGA' })
    await fetch('/api/sendNotification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        title: 'Hello from Firebase!',
        body: 'This is a test notification.',
      }),
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setProfile(user)
    })
  }, [])

  useEffect(() => {
    const initFCM = async () => {
      try {
        // Register Service Worker
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        console.log("Service Worker registered:", registration);

        // Request notification permission
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("Notification permission not granted");
          return;
        }

        // Get FCM token
        const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
        const currentToken = await getToken(messaging!, {
          vapidKey,
          serviceWorkerRegistration: registration,
        });

        console.log("FCM Token:", currentToken);
        // setToken(currentToken);

        // Foreground message listener
        onMessage(messaging!, (payload) => {
          console.log("Foreground message:", payload);
          if (payload.notification) {
            new Notification(payload.notification.title || 'New message', {
              body: payload.notification.body,
              icon: '/favicon.ico'
            })
          }
        });
      } catch (err) {
        console.error("Error getting FCM token:", err);
      }
    };

    if ("serviceWorker" in navigator) initFCM();
  }, []);
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {
        // users ?
        // <SignUpForm /> :
        <SignInForm />
      }


      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4 text-center">
        {/* Logout */}
        <button
          className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition duration-200"
          onClick={logout}
        >
          Logout
        </button>

        {/* Profile Email */}
        <div className="text-gray-700 text-sm">
          {profile?.email ? profile.email : "No email available"}
        </div>

        {/* Create User */}
        <button
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition duration-200"
          onClick={addUser}
        >
          Create User
        </button>

        {/* Get Notification */}
        <button
          className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow transition duration-200"
          onClick={handleNotification}
        >
          Get Notification
        </button>

        {/* Fetch Users */}
        <button
          className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow transition duration-200"
          onClick={handleGetUsers}
        >
          Fetch Users
        </button>

        {/* Link to Profile */}
        <Link
          href="/profile"
          className="block w-full py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white text-center font-semibold rounded-lg shadow transition duration-200"
        >
          Go to Profile
        </Link>
      </div>

      <MemoizedComponent items={items} />
      <div>
        {users.map(user => (
          <div
            key={user.id}
            className="max-w-sm w-full rounded-xl border border-gray-200 bg-white shadow-md p-5 hover:shadow-lg transition-shadow mb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                User ID
              </h2>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                {user.id}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Email:</span> {user.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Created At:</span>{" "}
                {user.createdAt ? user.createdAt.toDate().toLocaleString() : "—"}
              </p>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}
