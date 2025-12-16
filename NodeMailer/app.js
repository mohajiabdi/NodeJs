const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mo.haji.abdi1@gmail.com", // your Gmail
    pass: "kjsc kudo eibr oaim", // your app password (from Google)
  },
});

const mailOptions = {
  from: "mo.haji.abdi1@gmail.com",
  to: "maherr.mahad@gmail.com",
  subject: "Hello from Node.js",
  // text: "This is a test email sent using Nodemailer and App Password!",
  text: "Test Email From Me\nAsc Wll, Xaalada Kwrn seetahay\nWaa tijaabo NodeMailer ah soo dhawoow",
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error("❌ Error:", err);
  } else {
    console.log("✅ Email sent:", info.response);
  }
});
