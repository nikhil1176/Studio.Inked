import { NextResponse } from "next/server";

// POST: Create a new booking (Public route - proxies to Express backend)
export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Booking proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Server connection failed." },
      { status: 500 }
    );
  }
}
