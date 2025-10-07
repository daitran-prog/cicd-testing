'use client'
import { auth } from "@/src/firebase/config"
import { onAuthStateChanged } from "firebase/auth"
import React, { useContext, useEffect, useState } from "react"

const AuthContext = React.createContext({ user: null })

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
        })
        return () => unsubscribe()
    }, [])

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export const useAuthStore = () => useContext(AuthContext);