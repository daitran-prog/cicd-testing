import AuthProvider from "../components/auth";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>
}