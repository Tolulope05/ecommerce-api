const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

const sendEmail = async (email, subject, html) => {
  const mailOptions = {
    from: "fakunletolulope05@gmail.com",
    to: email,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
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

const sendWelcomeEmail = async (email, name) => {
  const subject = "Welcome to E - Commerce";
  const html = `
        <p>Hi ${name},</p>
        <p>Thank you for registering on our site</p>
        <p>Regards,</p>
        <p><b>E - Commerce Team<b></p>
    `;
  await sendEmail(email, subject, html);
};

module.exports = {
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendOrderEmail,
  sendForgotPasswordEmail,
  sendWelcomeEmail,
};
