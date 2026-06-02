import nodemailer from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const provider = process.env.EMAIL_PROVIDER || 'resend';

// Email transporter setup
let transporter;

if (provider === 'resend') {
  // Using Resend API via nodemailer SMTP
  transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 587,
    secure: false,
    auth: {
      user: 'resend',
      pass: process.env.RESEND_API_KEY
    }
  });
} else if (provider === 'sendgrid') {
  // Using SendGrid
  transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY
    }
  });
}

export const sendEmail = async (to, subject, html, text) => {
  try {
    const mailOptions = {
      from: `BIORAIZ <noreply@bioraiz.net>`,
      to,
      subject,
      html,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export const sendFormSubmission = async (formData) => {
  const { name, email, message, type } = formData;

  const html = `
    <h2>Nueva solicitud de ${type}</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;

  const text = `
    Nueva solicitud de ${type}
    
    Nombre: ${name}
    Email: ${email}
    Mensaje: ${message}
  `;

  // Send to admin
  await sendEmail(
    process.env.ADMIN_EMAIL,
    `Nueva solicitud de formulario - ${type}`,
    html,
    text
  );

  // Send confirmation to user
  const confirmationHtml = `
    <h2>¡Hola ${name}!</h2>
    <p>Hemos recibido tu solicitud en BIORAIZ. Te contactaremos pronto.</p>
    <p>Saludos,<br>El equipo de BIORAIZ</p>
  `;

  await sendEmail(
    email,
    'Confirmación de tu solicitud - BIORAIZ',
    confirmationHtml,
    'Hemos recibido tu solicitud.'
  );
};

export const sendSubscriberNotification = async (email, subject, content) => {
  const html = `
    <h2>${subject}</h2>
    <div>${content}</div>
    <hr>
    <p style="color: #666; font-size: 12px;">
      Recibiste este email porque te suscribiste a notificaciones de BIORAIZ.
    </p>
  `;

  await sendEmail(email, subject, html, subject);
};
