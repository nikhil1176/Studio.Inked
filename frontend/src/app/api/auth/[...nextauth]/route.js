import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

// Only allowed artist/admin emails
const ALLOWED_EMAILS = [
  "nkanwal.nk@gmail.com",
  "sk9711162@gmail.com",
  "admin123@gmail.com"
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
        console.log("1. Fetching from API:", `${API_URL}/api/auth/artist-portal`);
        
        try {
          const res = await fetch(`${API_URL}/api/auth/artist-portal`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log("2. Backend se Status Code aaya:", res.status);
          const responseBody = await res.json();
          console.log("3. Backend se Data aaya:", responseBody);

          // Ensure response is OK aur uske andar 'data' exist karta hai
          if (res.ok && responseBody.success && responseBody.data) {
            
            const userData = responseBody.data; // <-- Asli user details yahan hain

            // Allow only approved emails
            if (!ALLOWED_EMAILS.includes(userData.email)) {
              console.log("4. ERROR: Email ALLOWED_EMAILS me nahi hai!");
              throw new Error("Unauthorized access");
            }
            
            console.log("5. Login Success frontend par!");
            // NextAuth ko EXACTLY sirf user object (id, name, email) dena hota hai
            return userData; 
          }

          console.log("4. ERROR: res.ok false hai ya user nahi mila");
          return null;

        } catch (error) {
          console.log("FETCH ERROR:", error.message);
          return null;
        }
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