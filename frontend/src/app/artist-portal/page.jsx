"use client";

import { useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CursorEffect from "../components/SplashCursor";

function InkFlowBackground() {
  const accentDust = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        left: `${(index * 19 + 11) % 100}%`,
        top: `${(index * 27 + 7) % 100}%`,
        size: 40 + (index % 4) * 18,
        opacity: 0.025 + (index % 3) * 0.012,
        rotation: (index * 31) % 360,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(5, 5, 6, 0.34) 0%, rgba(4, 4, 5, 0.62) 40%, rgba(0, 0, 0, 0.94) 100%), url('/tattoo-artist-bg.png')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "saturate(0.95) contrast(1.05) brightness(0.70)",
          transform: "scale(1.03)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(35, 18, 16, 0.18) 0%, rgba(0, 0, 0, 0.46) 48%, rgba(0, 0, 0, 0.92) 100%)",
        }}
      />

      {accentDust.map((dust, index) => (
        <div
          key={`${dust.left}-${dust.top}-${index}`}
          aria-hidden="true"
          className="absolute rounded-full bg-[#f2d28a]"
          style={{
            left: dust.left,
            top: dust.top,
            width: `${dust.size}px`,
            height: `${Math.max(2, dust.size * 0.05)}px`,
            opacity: dust.opacity,
            transform: `translate(-50%, -50%) rotate(${dust.rotation}deg)`,
            boxShadow: "0 0 18px rgba(197,160,89,0.1)",
          }}
        />
      ))}

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.72\" numOctaves=\"2\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 0 46%, rgba(0,0,0,0.58) 100%)",
        }}
      />
    </div>
  );
}

function InputIconEmail() {
  return (
    <svg
      className="h-5 w-5 text-neutral-500 transition-colors group-focus-within:text-[#d7b15d]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function InputIconPassword() {
  return (
    <svg
      className="h-5 w-5 text-neutral-500 transition-colors group-focus-within:text-[#d7b15d]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleManualLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/admin" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden text-white" style={{ backgroundColor: '#000' }}>

      <style>{`
        @keyframes loginRise {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <InkFlowBackground />
      
      {/* React Bits default jaisi properties set ki hain */}
      <CursorEffect
        RAINBOW_MODE={false}
        COLOR="#d7b15d"
        SPLAT_FORCE={3000} 
        SPLAT_RADIUS={0.08} 
        DENSITY_DISSIPATION={5} 
        VELOCITY_DISSIPATION={2.5} 
        CURL={3} 
        PRESSURE={0.1} 
        PRESSURE_ITERATIONS={20}
        SHADING={true}
      />

      <div className="pointer-events-none relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <section className="pointer-events-auto w-full max-w-md animate-[loginRise_700ms_ease-out]">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#c9a059]/35 bg-[#060606]/72 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.88)] backdrop-blur-3xl sm:px-9 sm:py-10">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01) 24%, rgba(0,0,0,0.1) 100%)",
              }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#d7b15d] to-transparent opacity-70" />
            <div className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f2d28a]/80 bg-[#c9a059] shadow-[0_0_24px_rgba(197,160,89,0.7)]" />

            <div className="relative">
              <div className="text-center">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-[#d7b15d]/70">
                  Artist Portal Access
                </p>
                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Studio<span className="text-[#d7b15d]">.</span>Inked
                </h1>
                <p className="mt-3 text-sm text-neutral-400">
                  Sign in to access bookings, uploads, and the studio dashboard.
                </p>
              </div>

              {error ? (
                <div className="mt-7 rounded-2xl border border-red-900/60 bg-red-950/35 px-4 py-3 text-center text-sm text-red-300">
                  {error}
                </div>
              ) : null}

              <form onSubmit={handleManualLogin} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <label className="ml-1 block text-[10px] font-bold uppercase tracking-[0.35em] text-[#d7b15d]/80">
                    Email Address
                  </label>
                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <InputIconEmail />
                    </div>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-2xl border border-white/6 bg-white/3 py-3.5 pl-12 pr-4 text-[15px] text-white outline-none transition duration-300 placeholder:text-neutral-600 focus:border-[#d7b15d]/50 focus:bg-white/5 focus:shadow-[0_0_0_1px_rgba(215,177,93,0.12)]"
                      placeholder="artist@studioinked.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 block text-[10px] font-bold uppercase tracking-[0.35em] text-[#d7b15d]/80">
                    Password
                  </label>
                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <InputIconPassword />
                    </div>
                    <input
                      type="password"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-2xl border border-white/6 bg-white/3 py-3.5 pl-12 pr-4 text-[15px] text-white outline-none transition duration-300 placeholder:text-neutral-600 focus:border-[#d7b15d]/50 focus:bg-white/5 focus:shadow-[0_0_0_1px_rgba(215,177,93,0.12)]"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-2xl border border-[#f1d18a]/40 bg-linear-to-r from-[#b8860b] via-[#d7a61e] to-[#b8860b] px-4 py-3.5 text-[11px] font-black uppercase tracking-[0.35em] text-black shadow-[0_16px_36px_rgba(197,160,89,0.2)] transition duration-300 hover:-translate-y-px hover:shadow-[0_18px_46px_rgba(197,160,89,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Authenticating..." : "Access Dashboard"}
                </button>
              </form>

              <div className="mt-7 flex items-center gap-3">
                <span className="h-px flex-1 bg-linear-to-r from-transparent via-white/15 to-white/10" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
                  Or
                </span>
                <span className="h-px flex-1 bg-linear-to-l from-transparent via-white/15 to-white/10" />
              </div>

              <button
                onClick={handleGoogleLogin}
                type="button"
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/8 bg-white/3 px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-300 transition duration-300 hover:border-[#d7b15d]/35 hover:bg-white/6 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}