require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

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
log("INFO", `Email User configured: ${process.env.EMAIL_USER ? "✅ YES" : "❌ NO"}`);
log("INFO", `Email Pass configured: ${process.env.EMAIL_PASS ? "✅ YES" : "❌ NO"}`);
log("INFO", `Email Service: ${process.env.EMAIL_SERVICE || "gmail"}`);

// ============== MIDDLEWARE ==============
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// ============== REQUEST LOGGER MIDDLEWARE ==============
// This logs EVERY incoming request
app.use((req, res, next) => {
  log("REQUEST", `${req.method} ${req.url}`, {
    ip: req.ip || req.connection.remoteAddress,
    headers: {
      origin: req.headers.origin,
      "content-type": req.headers["content-type"],
      "user-agent": req.headers["user-agent"],
    },
    body: req.body && Object.keys(req.body).length > 0 ? req.body : "empty",
  });
  
  // Log response when it finishes
  const startTime = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    log("RESPONSE", `${req.method} ${req.url} → ${res.statusCode} (${duration}ms)`);
  });
  
  next();
});

// ============== EMAIL TRANSPORTER ==============
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    log("ERROR", "❌ Email transporter verification FAILED", { error: error.message });
  } else {
    log("INFO", "✅ Email transporter verified — ready to send emails");
  }
});

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
    log("WARN", "⚠️ Validation failed — missing required fields", {
      hasName: !!name,
      hasEmail: !!email,
      hasMessage: !!message,
    });
    return res.status(400).json({
      success: false,
      error: "Name, email and message are required.",
    });
  }

  log("INFO", "✅ Validation passed");

  const mailToAdmin = {
    from: `"Vertex TradeLynx Website" <${process.env.EMAIL_USER}>`,
    to: "chavannilesh987@gmail.com",
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
    log("INFO", "📧 Sending admin notification email...");
    const adminResult = await transporter.sendMail(mailToAdmin);
    log("INFO", "✅ Admin email sent", {
      messageId: adminResult.messageId,
      to: "chavannilesh987@gmail.com",
    });

    log("INFO", "📧 Sending client confirmation email...");
    const clientResult = await transporter.sendMail(mailToClient);
    log("INFO", "✅ Client email sent", {
      messageId: clientResult.messageId,
      to: email,
    });

    log("INFO", "🎉 === ENQUIRY PROCESSED SUCCESSFULLY ===");
    return res.json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (err) {
    log("ERROR", "❌ === EMAIL SENDING FAILED ===", {
      errorMessage: err.message,
      errorCode: err.code,
      errorCommand: err.command,
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
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
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
