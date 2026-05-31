import { NextRequest, NextResponse } from "next/server";
import {
  escapeHtml,
  isValidEmail,
  sendResendEmail,
} from "@/app/api/_utils/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const service = String(body.service || "").trim();
    const message = String(body.message || "").trim();

    // Honeypot field (hidden input in frontend)
    const website = String(body.website || "").trim();

    if (website) {
      return NextResponse.json(
        { message: "Message sent successfully." },
        { status: 200 }
      );
    }

    if (!name || !phone || !email || !service || !message) {
      return NextResponse.json(
        {
          error:
            "Name, email, phone, service, and message are required.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        {
          error: "Message is too short.",
        },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        {
          error: "Message is too long.",
        },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

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
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin:0;padding:20px;background:#f4f4f5;font-family:Arial,sans-serif;">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="max-width:700px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;"
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
              <h2 style="margin:0;">
                New Contact Form Submission
              </h2>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;">
              <p>
                A new inquiry has been submitted through the
                NexGen Developers website.
              </p>

              <table
                width="100%"
                cellpadding="10"
                cellspacing="0"
                style="border-collapse:collapse;"
              >
                <tr>
                  <td style="border:1px solid #e5e7eb;font-weight:bold;">
                    Name
                  </td>
                  <td style="border:1px solid #e5e7eb;">
                    ${safeName}
                  </td>
                </tr>

                <tr>
                  <td style="border:1px solid #e5e7eb;font-weight:bold;">
                    Email
                  </td>
                  <td style="border:1px solid #e5e7eb;">
                    ${safeEmail}
                  </td>
                </tr>

                <tr>
                  <td style="border:1px solid #e5e7eb;font-weight:bold;">
                    Phone
                  </td>
                  <td style="border:1px solid #e5e7eb;">
                    ${safePhone}
                  </td>
                </tr>

                <tr>
                  <td style="border:1px solid #e5e7eb;font-weight:bold;">
                    Service
                  </td>
                  <td style="border:1px solid #e5e7eb;">
                    ${safeService}
                  </td>
                </tr>

                <tr>
                  <td style="border:1px solid #e5e7eb;font-weight:bold;">
                    Submitted At
                  </td>
                  <td style="border:1px solid #e5e7eb;">
                    ${submittedAt}
                  </td>
                </tr>
              </table>

              <div style="margin-top:24px;">
                <h3>Message</h3>

                <div
                  style="
                    background:#f8fafc;
                    border:1px solid #e5e7eb;
                    border-radius:8px;
                    padding:20px;
                    line-height:1.7;
                  "
                >
                  ${safeMessage}
                </div>
              </div>

              <p
                style="
                  margin-top:30px;
                  color:#64748b;
                  font-size:13px;
                "
              >
                This email was automatically generated from the
                NexGen Developers contact form.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const text = `
NEW CONTACT FORM SUBMISSION

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

Submitted At:
${submittedAt}

MESSAGE:
${message}

----------------------------------
Sent from NexGen Developers Website
----------------------------------
`;

    const result = await sendResendEmail({
      subject: `New Contact Inquiry - ${service}`,
      html,
      text,
      replyTo: email,
    });

    if (!result.ok) {
      console.error("Email Error:", result);

      return NextResponse.json(
        {
          error:
            result.error ||
            "Failed to send message. Please try again.",
        },
        {
          status: result.status || 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Contact Route Error:", error);

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