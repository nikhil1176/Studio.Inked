import { NextResponse } from "next/server";

const API_URL = "https://studio-inked.onrender.com";

// POST: Upload image to Cloudinary via Express backend
export async function POST(req) {
  try {
    const body = await req.json();

    console.log("Upload request:", body);

    const response = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log("Upload response:", data);

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Upload proxy error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload server connection failed.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}