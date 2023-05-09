const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "",
//     pass: "",
//   },
// }); // I dont have account for this

const transporter = nodemailer.createTestAccount();

const sendEmail = (email, subject, text) => {
  const mailOptions = {
    from: "E - Commerce <fakunletolulope05@gmail.com>",
    to: email,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log("Email sent: " + info.response);
  });
};
