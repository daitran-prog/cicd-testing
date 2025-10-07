'use client'
import React, { FC } from 'react';
import { useAuthStore } from '../components/auth';

type Props = {};

const Profile: FC<Props> = () => {
  const { user = {} }: any = useAuthStore()
  const provider = user?.providerData?.[0] || {};

  // Convert timestamps
  const createdAt = new Date(Number(user?.createdAt)).toLocaleString();
  const lastLoginAt = new Date(Number(user?.lastLoginAt)).toLocaleString();
  const tokenExpiry = new Date(Number(user?.stsTokenManager?.expirationTime)).toLocaleString();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">User Profile</h1>

        {/* Avatar */}
        <div className="flex flex-col items-center space-y-2">
          {provider.photoURL ? (
            <img
              src={provider.photoURL}
              alt="User avatar"
              className="w-24 h-24 rounded-full shadow"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-600 shadow">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <p className="text-lg font-semibold text-gray-700">
            {provider.displayName || user?.email}
          </p>
          <p className="text-sm text-gray-500">{provider.providerId || "—"}</p>
        </div>

        {/* Main Info */}
        <div className="space-y-2">
          <InfoRow label="UID" value={user?.uid} />
          <InfoRow label="Email" value={user?.email} />
          <InfoRow
            label="Email Verified"
            value={user?.emailVerified ? "Yes ✅" : "No ❌"}
          />
          <InfoRow label="Anonymous" value={user?.isAnonymous ? "Yes" : "No"} />
        </div>

        {/* Activity */}
        <div className="space-y-2 border-t pt-4">
          <InfoRow label="Created At" value={createdAt} />
          <InfoRow label="Last Login" value={lastLoginAt} />
          <InfoRow label="Token Expiry" value={tokenExpiry} />
        </div>
      </div>
    </div>)
}


function InfoRow({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-medium text-gray-600">{label}:</span>
      <span className="text-gray-800">{value || "—"}</span>
    </div>
  );
}
export default Profile;