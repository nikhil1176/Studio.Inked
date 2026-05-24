import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Backend se check karo/artist-portal
        const res = await fetch(`${API_URL}/api/auth`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });
        const user = await res.json();
        if (res.ok && user) return user;
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/artist-portal',
  }
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };