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
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};

const sendResetPasswordEmail = async (email, token) => {
  const subject = "Reset Password";
  const html = `
    <p>Click this <a href="http://localhost:3000/reset-password/${token}">link</a> to reset your password</p>
    `;
  await sendEmail(email, subject, html);
};

const sendVerificationEmail = async (email, token) => {
  const subject = "Verify Email";
  const html = `
        <p>Click this <a href="http://localhost:3000/verify-email/${token}">link</a> to verify your email</p>
    `;
  await sendEmail(email, subject, html);
};

const sendOrderEmail = async (email, order) => {
  const subject = "Order Confirmation";
  const html = `
        <p>Thank you for your order</p>
        <p>Order ID: ${order._id}</p>
        <p>Order Items:</p>
        <ul>
            ${order.orderItems.map(
              (item) =>
                `<li>
                    <img src="${item.image}" alt="${item.name}" />
                    <div>
                        <p>${item.name}</p>
                        <p>Qty: ${item.quantity}</p>
                        <p>Price: $${item.price}</p>
                    </div>
                </li>`
            )}
        </ul>
        <p>Order Total: $${order.totalPrice}</p>
    `;
  await sendEmail(email, subject, html);
};

const sendForgotPasswordEmail = async (email, token) => {
  const subject = "Reset Password";
  const html = `
        <p>Click this <a href="http://localhost:3000/reset-password/${token}">link</a> to reset your password</p>
    `;
  await sendEmail(email, subject, html);
};

module.exports = {
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendOrderEmail,
  sendForgotPasswordEmail,
};