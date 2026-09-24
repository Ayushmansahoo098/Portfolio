import { Router } from 'express';
import nodemailer from 'nodemailer';

export const contactRouter = Router();

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

contactRouter.post('/', async (req, res) => {
  const { name, email, message } = req.body as Partial<ContactPayload>;

  if (!email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Email and message are required.',
    });
  }

  const senderName = name?.trim() || 'Anonymous Visitor';
  const recipient = process.env.NOTIFICATION_EMAIL || 'ayushmansahoo098@gmail.com';
  const timestamp = new Date().toLocaleString();

  console.log(`\n📨 [NEW INCOMING TRANSMISSION]`);
  console.log(`   From: ${senderName} <${email}>`);
  console.log(`   Message: ${message}`);
  console.log(`   Time: ${timestamp}\n`);

  let emailSent = false;
  let deliveryMethod = 'none';
  let deliveryError = '';

  // 1. Try Gmail SMTP / Nodemailer if configured
  if (process.env.GMAIL_APP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER || recipient,
          pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''), // strip spaces from Google app password
        },
      });

      await transporter.sendMail({
        from: `"Ayushman.OS Portfolio" <${process.env.GMAIL_USER || recipient}>`,
        replyTo: email,
        to: recipient,
        subject: `🚀 [Ayushman.OS] New Message from ${senderName}`,
        text: `You received a new message from your portfolio contact form:\n\nSender: ${senderName} (${email})\nTime: ${timestamp}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #080305; border: 1px solid #6D001A; border-radius: 16px; padding: 32px; color: #ffffff;">
            <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 16px; margin-bottom: 24px;">
              <span style="font-family: monospace; font-size: 11px; letter-spacing: 2px; color: #E01E43; font-weight: bold; text-transform: uppercase;">
                AYUSHMAN.OS // TRANSMISSION RECEIVED
              </span>
              <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 8px 0 0 0;">
                New Message from ${senderName}
              </h2>
            </div>
            
            <div style="background-color: #120508; border: 1px solid rgba(153, 0, 38, 0.4); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 10px 0; font-size: 13px; color: #94a3b8;">
                <strong style="color: #e2e8f0;">Sender:</strong> ${senderName}
              </p>
              <p style="margin: 0 0 10px 0; font-size: 13px; color: #94a3b8;">
                <strong style="color: #e2e8f0;">Email:</strong> <a href="mailto:${email}" style="color: #E01E43; text-decoration: none;">${email}</a>
              </p>
              <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                <strong style="color: #e2e8f0;">Date & Time:</strong> ${timestamp}
              </p>
            </div>

            <div style="background-color: #000000; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <span style="font-family: monospace; font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">
                MESSAGE PAYLOAD
              </span>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #f1f5f9; white-space: pre-wrap;">
                ${message}
              </p>
            </div>

            <div style="text-align: center; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.05);">
              <a href="mailto:${email}?subject=Re: Your message via Ayushman.OS" style="display: inline-block; background-color: #6D001A; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-size: 12px; font-weight: bold; font-family: monospace; letter-spacing: 1px;">
                REPLY TO ${senderName.toUpperCase()} →
              </a>
            </div>
          </div>
        `,
      });

      emailSent = true;
      deliveryMethod = 'gmail_smtp';
      console.log(`✅ [EMAIL DISPATCHED] Successfully sent email via Gmail SMTP to ${recipient}`);
    } catch (err: any) {
      deliveryError = err.message || 'SMTP delivery failed';
      console.error(`❌ [GMAIL SMTP ERROR] ${deliveryError}`);
    }
  }

  // 2. Try Resend API if configured
  if (!emailSent && process.env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Ayushman.OS <onboarding@resend.dev>',
          to: recipient,
          reply_to: email,
          subject: `🚀 [Ayushman.OS] Message from ${senderName}`,
          html: `<p><strong>From:</strong> ${senderName} (${email})</p><p>${message}</p>`,
        }),
      });

      if (resendRes.ok) {
        emailSent = true;
        deliveryMethod = 'resend_api';
        console.log(`✅ [EMAIL DISPATCHED] Successfully sent email via Resend to ${recipient}`);
      } else {
        const resendErr = await resendRes.text();
        console.error(`❌ [RESEND API ERROR] ${resendErr}`);
      }
    } catch (err: any) {
      console.error(`❌ [RESEND ERROR] ${err.message}`);
    }
  }

  // 3. Try Web3Forms if configured
  if (!emailSent && process.env.WEB3FORMS_ACCESS_KEY) {
    try {
      const w3fRes = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name: senderName,
          email: email,
          message: message,
          subject: `🚀 [Ayushman.OS] New message from ${senderName}`,
        }),
      });

      const w3fData = await w3fRes.json();
      if (w3fData.success) {
        emailSent = true;
        deliveryMethod = 'web3forms';
        console.log(`✅ [EMAIL DISPATCHED] Successfully delivered message via Web3Forms to ${recipient}`);
      } else {
        console.error(`❌ [WEB3FORMS ERROR] ${w3fData.message}`);
      }
    } catch (err: any) {
      console.error(`❌ [WEB3FORMS ERROR] ${err.message}`);
    }
  }

  if (!emailSent) {
    console.log(`⚠️ [EMAIL SETUP REQUIRED] Message was recorded in the backend console, but no email service is configured yet.`);
    console.log(`   👉 To receive live emails in your inbox, set your GMAIL_APP_PASSWORD, WEB3FORMS_ACCESS_KEY, or RESEND_API_KEY in backend/.env`);
  }

  return res.json({
    success: true,
    emailSent,
    deliveryMethod,
    message: emailSent
      ? 'Transmission dispatched and delivered to inbox.'
      : 'Transmission received and logged on Ayushman.OS.',
    receipt: {
      id: `TX-${Date.now()}`,
      timestamp: new Date().toISOString(),
      sender: senderName,
    },
  });
});
