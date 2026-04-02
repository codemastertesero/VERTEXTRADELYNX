require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// Email transporter — configure via .env
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,       // your sending Gmail / SMTP user
    pass: process.env.EMAIL_PASS,       // app password or SMTP password
  },
});

// POST /api/enquiry
app.post("/api/enquiry", async (req, res) => {
  const { name, email, phone, service, origin, destination, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Name, email and message are required." });
  }

  const mailToAdmin = {
    from: `"Vertex TradeLynx Website" <${process.env.EMAIL_USER}>`,
    to: "tejasd851@gmail.com",
    subject: `New Freight Enquiry from ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f7fb;padding:30px;border-radius:12px;">
        <div style="background:linear-gradient(135deg,#0a2a5e,#1565c0);padding:24px 30px;border-radius:8px 8px 0 0;">
          <h2 style="color:#fff;margin:0;font-size:22px;">New Enquiry — Vertex TradeLynx</h2>
        </div>
        <div style="background:#fff;padding:30px;border-radius:0 0 8px 8px;border:1px solid #e0e7ef;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#555;width:140px;font-weight:600;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#222;">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#555;font-weight:600;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#222;">${email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#555;font-weight:600;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#222;">${phone || "Not provided"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#555;font-weight:600;">Service</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#222;">${service || "Not specified"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#555;font-weight:600;">Origin</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#222;">${origin || "Not provided"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#555;font-weight:600;">Destination</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#222;">${destination || "Not provided"}</td></tr>
            <tr><td style="padding:10px 0;color:#555;font-weight:600;vertical-align:top;">Message</td><td style="padding:10px 0;color:#222;">${message}</td></tr>
          </table>
          <p style="margin-top:24px;color:#888;font-size:12px;">This enquiry was submitted via the Vertex TradeLynx website contact form.</p>
        </div>
      </div>
    `,
  };

  const mailToClient = {
    from: `"Vertex TradeLynx" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thank you for your enquiry — Vertex TradeLynx",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f7fb;padding:30px;border-radius:12px;">
        <div style="background:linear-gradient(135deg,#0a2a5e,#1565c0);padding:24px 30px;border-radius:8px 8px 0 0;">
          <h2 style="color:#fff;margin:0;font-size:22px;">Thank You, ${name}!</h2>
        </div>
        <div style="background:#fff;padding:30px;border-radius:0 0 8px 8px;border:1px solid #e0e7ef;">
          <p style="color:#333;line-height:1.7;">Thank you for reaching out to <strong>Vertex TradeLynx</strong>. We have received your enquiry and our team will get back to you within <strong>24 hours</strong>.</p>
          <p style="color:#333;line-height:1.7;">In the meantime, feel free to call us directly:</p>
          <p style="font-size:20px;font-weight:bold;color:#1565c0;">📞 +91 95036 45532</p>
          <p style="color:#333;line-height:1.7;">Or email us at: <a href="mailto:nilesh@vertextradelynx.com" style="color:#1565c0;">nilesh@vertextradelynx.com</a></p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
          <p style="color:#555;font-size:13px;">Vertex TradeLynx | Freight Forwarding • Logistics • Export<br/>Mumbai, India</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(mailToClient);
    return res.json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({ success: false, error: "Failed to send email. Please try again." });
  }
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Vertex TradeLynx backend running on port ${PORT}`));
