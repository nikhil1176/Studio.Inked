import { Geist, Geist_Mono, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
// NAYA: AuthProvider import kiya hai
import { AuthProvider } from "@/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Studio Inked", // Title update kar diya
  description: "Premium Tattoo Booking Portal",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* NAYA: AuthProvider se children ko wrap kar diya */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}