const transporter = require('../config/email');
const emailTemplates = require('./emailTemplates');

// Send email function
const sendEmail = async (to, template, ...args) => {
  try {
    const emailContent = emailTemplates[template](...args);

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: emailContent.subject,
      html: emailContent.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Specific email sending functions
const emailService = {
  sendWelcomeEmail: async (email, name) => {
    return await sendEmail(email, 'welcome', name);
  },

  sendAccountApprovedEmail: async (email, name) => {
    return await sendEmail(email, 'accountApproved', name);
  },

  sendPasswordSetEmail: async (email, name, password) => {
    return await sendEmail(email, 'passwordSet', name, email, password);
  },

  sendPaymentConfirmedEmail: async (email, name) => {
    return await sendEmail(email, 'paymentConfirmed', name);
  },

  sendInterestReceivedEmail: async (receiverEmail, senderName, receiverName, senderProfile) => {
    return await sendEmail(receiverEmail, 'interestReceived', senderName, receiverName, senderProfile);
  },

  sendInterestAcceptedEmail: async (senderEmail, accepterName, senderName) => {
    return await sendEmail(senderEmail, 'interestAccepted', accepterName, senderName);
  },

  sendPasswordResetOTPEmail: async (email, name, otp) => {
    return await sendEmail(email, 'passwordResetOTP', name, otp);
  },

  sendPasswordResetSuccessEmail: async (email, name) => {
    return await sendEmail(email, 'passwordResetSuccess', name);
  },
};

module.exports = emailService;
