import { NextResponse } from "next/server";

// POST: Upload image to Cloudinary via Express backend
export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Upload proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Upload server connection failed." },
      { status: 500 }
    );
  }
}
