import { NextRequest, NextResponse } from "next/server";
import {
  escapeHtml,
  isValidEmail,
  sendResendEmail,
} from "@/app/api/_utils/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const result = await sendResendEmail({
      subject: "New Newsletter Subscription",
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111827;">
          <h2 style="border-bottom: 2px solid #0d9488; padding-bottom: 12px;">New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        </div>
      `,
      text: `New Newsletter Subscription

Email: ${email}`,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error, details: result.details },
        { status: result.status }
      );
    }

    return NextResponse.json({ message: "Subscription received." });
  } catch (error) {
    console.error("Subscribe route error:", error);
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}
