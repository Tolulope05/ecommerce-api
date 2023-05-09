const nodemailer = require("nodemailer");

const testAccunt = await nodemailer.createTestAccount(); // I dont have account for this
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
    user: testAccunt.user,
    pass: testAccunt.pass,
  },
}); // I dont have account for this

const sendEmail = async (email, subject, html) => {
  const mailOptions = {
    from: "E - Commerce <fakunletolulope05@gmail.com>",
    to: email,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log("Email sent: " + info.response);
  });
};
