import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

// GET REQUEST (Bookings mangwane ke liye)
export async function GET(req) {
  // 1. Check karo ki user actually dashboard mein logged in hai ya nahi
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Aap login nahi hain" }, { status: 401 });
  }

  // 2. Agar login hai, toh Secret Key laga kar Express Backend se data laao
  try {
    const response = await fetch(`${API_URL}/api/bookings`, {
      headers: {
        "x-api-key": process.env.ADMIN_SECRET_KEY, // Secret Chaabi
      },
      cache: "no-store"
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Backend error" }, { status: 500 });
  }
}

// PUT REQUEST (Status update karne ke liye)
export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  try {
    const body = await req.json();
    const { bookingId, status } = body;

    const response = await fetch(`${API_URL}/api/bookings/${bookingId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ADMIN_SECRET_KEY,
      },
      body: JSON.stringify({ status }),
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}