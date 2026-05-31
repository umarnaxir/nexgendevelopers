import { NextRequest, NextResponse } from "next/server";
import { escapeHtml, sendResendEmail } from "@/app/api/_utils/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and contact number are required." },
        { status: 400 }
      );
    }

    const result = await sendResendEmail({
      subject: "New Callback Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111827;">
          <h2 style="border-bottom: 2px solid #0d9488; padding-bottom: 12px;">New Callback Request</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        </div>
      `,
      text: `New Callback Request

Name: ${name}
Phone: ${phone}`,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error, details: result.details },
        { status: result.status }
      );
    }

    return NextResponse.json({ message: "Callback request sent successfully." });
  } catch (error) {
    console.error("Callback route error:", error);
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}

