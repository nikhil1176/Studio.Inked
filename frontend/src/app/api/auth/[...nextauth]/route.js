import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

// Only allowed artist/admin emails
const ALLOWED_EMAILS = [
  "nkanwal.nk@gmail.com",
  "sk9711162@gmail.com",
];

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
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const res = await fetch(`${API_URL}/api/auth`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();

        if (res.ok && user) {
          // Allow only approved emails
          if (!ALLOWED_EMAILS.includes(user.email)) {
            throw new Error("Unauthorized access");
          }

          return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // Restrict Google login
      if (!ALLOWED_EMAILS.includes(user.email)) {
        return false;
      }

      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/artist-portal",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };