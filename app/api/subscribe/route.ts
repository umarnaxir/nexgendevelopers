import { NextRequest, NextResponse } from "next/server";
import {
  escapeHtml,
  isValidEmail,
  sendResendEmail,
} from "@/app/api/_utils/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    // Honeypot field (add a hidden field named "website" on frontend)
    const website = String(body.website || "").trim();

    // Bot detection
    if (website) {
      return NextResponse.json(
        {
          success: true,
          message: "Subscription received.",
        },
        { status: 200 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          error: "Email address is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    const safeEmail = escapeHtml(email);

    const submittedAt = new Date().toLocaleString("en-IN", {
      dateStyle: "full",
      timeStyle: "medium",
      timeZone: "Asia/Kolkata",
    });

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>New Newsletter Subscription</title>
      </head>
      <body style="margin:0;padding:20px;background:#f8fafc;font-family:Arial,sans-serif;">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="max-width:650px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;"
        >
          <tr>
            <td
              style="
                background:#0f172a;
                color:#ffffff;
                padding:24px;
                text-align:center;
              "
            >
              <h2 style="margin:0;font-size:24px;">
                New Newsletter Subscription
              </h2>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;">
              <p style="margin-top:0;color:#334155;">
                A new visitor has subscribed to the NexGen Developers newsletter.
              </p>

              <table
                width="100%"
                cellpadding="10"
                cellspacing="0"
                style="border-collapse:collapse;margin-top:20px;"
              >
                <tr>
                  <td
                    style="
                      border:1px solid #e5e7eb;
                      font-weight:bold;
                      width:180px;
                    "
                  >
                    Subscriber Email
                  </td>
                  <td style="border:1px solid #e5e7eb;">
                    ${safeEmail}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      border:1px solid #e5e7eb;
                      font-weight:bold;
                    "
                  >
                    Subscription Time
                  </td>
                  <td style="border:1px solid #e5e7eb;">
                    ${submittedAt}
                  </td>
                </tr>
              </table>

              <div
                style="
                  margin-top:25px;
                  padding:15px;
                  background:#f8fafc;
                  border-left:4px solid #14b8a6;
                  color:#475569;
                "
              >
                This subscription was submitted through the newsletter form on the NexGen Developers website.
              </div>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:20px;
                background:#f8fafc;
                text-align:center;
                color:#64748b;
                font-size:12px;
              "
            >
              © NexGen Developers
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const text = `
NEW NEWSLETTER SUBSCRIPTION

Subscriber Email:
${email}

Subscription Time:
${submittedAt}

------------------------------------------
Sent from NexGen Developers Website
------------------------------------------
`;

    const result = await sendResendEmail({
      subject: "New Newsletter Subscription",
      html,
      text,
      replyTo: email,
    });

    if (!result.ok) {
      console.error("Newsletter Email Error:", result);

      return NextResponse.json(
        {
          error:
            result.error ||
            "Failed to process subscription.",
          details: result.details,
        },
        {
          status: result.status || 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Subscription successful.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Subscribe Route Error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}