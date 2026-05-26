import { NextResponse } from "next/server";

const API_URL = "https://studio-inked.onrender.com";

// POST: Create a new booking
export async function POST(req) {
  try {
    const body = await req.json();

    console.log("Booking request:", body);

    const response = await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log("Backend response:", data);

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Booking proxy error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server connection failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}