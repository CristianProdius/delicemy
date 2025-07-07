// app/api/contact/route.ts
import { NextResponse } from "next/server";

// If using Resend (install: npm install resend)
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Save to Strapi
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const strapiToken = process.env.STRAPI_API_TOKEN;

    try {
      const strapiResponse = await fetch(
        `${strapiUrl}/api/contact-submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${strapiToken}`,
          },
          body: JSON.stringify({
            data: {
              name,
              email,
              phone: phone || "",
              subject: subject || "General Inquiry",
              message,
              statusEmail: "new",
              submittedAt: new Date().toISOString(),
            },
          }),
        }
      );

      if (!strapiResponse.ok) {
        console.error("Strapi submission failed:", await strapiResponse.text());
      }
    } catch (strapiError) {
      console.error("Strapi submission error:", strapiError);
      // Continue even if Strapi fails - we still want to send the email
    }

    // 2. Send Email
    try {
      // Option A: Using Resend
      /*
      await resend.emails.send({
        from: 'DÉLICE Contact Form <noreply@yourdomain.com>',
        to: process.env.CONTACT_EMAIL || 'hello@delice.com',
        replyTo: email,
        subject: `New Contact Form: ${subject || 'General Inquiry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #B8956A;">New Contact Form Submission</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            </div>
            <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h3 style="color: #333;">Message:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 12px;">
              This email was sent from the contact form on your website.
            </p>
          </div>
        `,
      });
      */

      // Option B: Using SendGrid
      /*
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      await sgMail.send({
        to: process.env.CONTACT_EMAIL || 'hello@delice.com',
        from: 'noreply@yourdomain.com',
        replyTo: email,
        subject: `New Contact Form: ${subject || 'General Inquiry'}`,
        html: // same HTML as above
      });
      */

      // Option C: Using Nodemailer (for custom SMTP)
      /*
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"DÉLICE Contact Form" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: `New Contact Form: ${subject || 'General Inquiry'}`,
        html: // same HTML as above
      });
      */

      // For now, just log the email (remove this in production)
      console.log("Email would be sent:", {
        to: process.env.CONTACT_EMAIL || "hello@delice.com",
        from: email,
        subject: subject || "General Inquiry",
        body: { name, email, phone, message },
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Continue - we don't want to fail the whole request if email fails
    }

    // 3. Send auto-reply to user (optional)
    try {
      // Similar email sending code but to the user's email
      // with a thank you message
    } catch (autoReplyError) {
      console.error("Auto-reply error:", autoReplyError);
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
