import nodemailer from 'nodemailer';
import AppError from './appError.js';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      );
    }
  });
};

export const sendEmailForgetPasswordEmployee = async (to, token) => {
  const resetURL = `${process.env.CLIENT_URL}/dashboard/auth/reset-password/${token}`;
  const link = `<a href="${resetURL}">Reset Password</a>`;
  await sendEmail(to, 'Password reset token', link);
};
