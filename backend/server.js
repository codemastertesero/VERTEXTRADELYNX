require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 5000;

// ============== LOGGING HELPER ==============
const log = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] ${message}`;
  if (data) {
    console.log(logEntry, JSON.stringify(data, null, 2));
  } else {
    console.log(logEntry);
  }
};

// ============== STARTUP LOGS ==============
log("INFO", "🚀 Server starting...");
log("INFO", `Environment: ${process.env.NODE_ENV || "development"}`);
log("INFO", `Port: ${PORT}`);
log("INFO", `Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`);
log("INFO", `Resend API configured: ${process.env.RESEND_API_KEY ? "✅ YES" : "❌ NO"}`);

// ============== MIDDLEWARE ==============
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// ============== REQUEST LOGGER MIDDLEWARE ==============
app.use((req, res, next) => {
  log("REQUEST", `${req.method} ${req.url}`, {
    ip: req.ip || req.connection.remoteAddress,
    body: req.body && Object.keys(req.body).length > 0 ? req.body : "empty",
  });

  const startTime = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    log("RESPONSE", `${req.method} ${req.url} → ${res.statusCode} (${duration}ms)`);
  });

  next();
});

// ============== EMAIL CLIENT ==============
const resend = new Resend(process.env.RESEND_API_KEY);

// ============== ROUTES ==============

// POST /api/enquiry
app.post("/api/enquiry", async (req, res) => {
  log("INFO", "📩 === NEW ENQUIRY RECEIVED ===");

  const { name, email, phone, service, origin, destination, message } = req.body;

  log("INFO", "Enquiry details:", {
    name: name || "MISSING",
    email: email || "MISSING",
    phone: phone || "not provided",
    service: service || "not specified",
    origin: origin || "not provided",
    destination: destination || "not provided",
    message: message ? message.substring(0, 100) + "..." : "MISSING",
  });

  // Validation
  if (!name || !email || !message) {
    log("WARN", "⚠️ Validation failed — missing required fields");
    return res.status(400).json({
      success: false,
      error: "Name, email and message are required.",
    });
  }

  log("INFO", "✅ Validation passed");

  try {
    // Send email to admin
    log("INFO", "📧 Sending admin notification email...");
    const adminEmail = await resend.emails.send({
      from: "Vertex TradeLynx <onboarding@vertextradelynx.com>", // Change after domain verification
      to: process.env.ADMIN_EMAIL || "chavannilesh987@gmail.com",
      subject: `New Freight Enquiry from ${name}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f7fb;padding:30px;border-radius:12px;">
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
        </div>
      </div>`,
    });

    log("INFO", "✅ Admin email sent", { id: adminEmail.id });

    // Send confirmation to client
    log("INFO", "📧 Sending client confirmation email...");
    const clientEmail = await resend.emails.send({
      from: "Vertex TradeLynx <onboarding@vertextradelynx.com>",
      to: email,
      subject: "Thank you for your enquiry — Vertex TradeLynx",
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f7fb;padding:30px;border-radius:12px;">
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
      </div>`,
    });

    log("INFO", "✅ Client email sent", { id: clientEmail.id });

    log("INFO", "🎉 === ENQUIRY PROCESSED SUCCESSFULLY ===");
    return res.json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (err) {
    log("ERROR", "❌ === EMAIL SENDING FAILED ===", {
      errorMessage: err.message,
      fullError: err.toString(),
    });
    return res.status(500).json({
      success: false,
      error: "Failed to send email. Please try again.",
    });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  log("INFO", "💚 Health check hit");
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    emailConfigured: !!process.env.RESEND_API_KEY,
  });
});

// ============== CATCH-ALL FOR UNKNOWN ROUTES ==============
app.use("*", (req, res) => {
  log("WARN", `⚠️ 404 — Unknown route hit: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
});

// ============== GLOBAL ERROR HANDLER ==============
app.use((err, req, res, next) => {
  log("ERROR", "💥 Unhandled error", {
    message: err.message,
    stack: err.stack,
  });
  res.status(500).json({ success: false, error: "Internal server error" });
});

// ============== START SERVER ==============
app.listen(PORT, () => {
  log("INFO", `✅ Vertex TradeLynx backend running on port ${PORT}`);
  log("INFO", "📋 Available routes:");
  log("INFO", "   GET  /api/health");
  log("INFO", "   POST /api/enquiry");
});
