// Email templates for various notifications

const emailTemplates = {
  // Welcome email after registration
  welcome: (name) => ({
    subject: 'Welcome to Siruvapuri Matrimony',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00D26A; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .button { display: inline-block; padding: 12px 30px; background-color: #00D26A; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Siruvapuri Matrimony</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Thank you for registering with Siruvapuri Matrimony!</p>
            <p>Your registration has been received successfully. Our admin team will review your profile and verify your payment status.</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Wait for admin approval</li>
              <li>Complete your payment</li>
              <li>You will receive your login credentials via email once approved</li>
            </ul>
            <p>We're excited to help you find your perfect match!</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Siruvapuri Matrimony. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Email when admin approves account
  accountApproved: (name) => ({
    subject: 'Your Account Has Been Approved',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00D26A; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .success { background-color: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Account Approved!</h1>
          </div>
          <div class="content">
            <h2>Congratulations ${name}!</h2>
            <div class="success">
              <strong>Your account has been approved by our admin team.</strong>
            </div>
            <p>You can now access all features of Siruvapuri Matrimony platform.</p>
            <p><strong>What you can do now:</strong></p>
            <ul>
              <li>Complete your profile</li>
              <li>Browse matches</li>
              <li>Send interests to profiles you like</li>
              <li>View your recommendations</li>
            </ul>
            <p>Start your journey to find your perfect life partner today!</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Siruvapuri Matrimony. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Email when password is set
  passwordSet: (name, email, password) => ({
    subject: 'Your Login Credentials - Siruvapuri Matrimony',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00D26A; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .credentials { background-color: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .warning { color: #856404; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Login Credentials</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Your password has been set by our admin team. You can now login to your account.</p>
            <div class="credentials">
              <h3>Login Credentials:</h3>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Password:</strong> ${password}</p>
            </div>
            <p class="warning"><strong>Important:</strong> Please change your password after your first login for security purposes.</p>
            <p>You can now access your account and start exploring matches!</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Siruvapuri Matrimony. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Email when payment status is updated
  paymentConfirmed: (name) => ({
    subject: 'Payment Confirmed - Siruvapuri Matrimony',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00D26A; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .success { background-color: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Confirmed</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <div class="success">
              <strong>Your payment has been confirmed!</strong>
            </div>
            <p>Thank you for your payment. Your account is now fully activated.</p>
            <p>You will receive your login credentials shortly via email.</p>
            <p>Get ready to start your journey to find your perfect match!</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Siruvapuri Matrimony. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Email when someone sends an interest
  interestReceived: (senderName, receiverName, senderProfile) => ({
    subject: `New Interest from ${senderName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00D26A; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .profile-card { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .button { display: inline-block; padding: 12px 30px; background-color: #00D26A; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Interest Received!</h1>
          </div>
          <div class="content">
            <h2>Hello ${receiverName},</h2>
            <p>Great news! Someone is interested in your profile.</p>
            <div class="profile-card">
              <h3>${senderName} has sent you an interest</h3>
              <p><strong>Age:</strong> ${senderProfile.age}</p>
              <p><strong>Location:</strong> ${senderProfile.location || 'Not specified'}</p>
              <p><strong>Education:</strong> ${senderProfile.education || 'Not specified'}</p>
            </div>
            <p>Login to your account to view the full profile and respond to this interest.</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Siruvapuri Matrimony. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Email when interest is accepted
  interestAccepted: (accepterName, senderName) => ({
    subject: `${accepterName} Accepted Your Interest`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00D26A; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .success { background-color: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Interest Accepted!</h1>
          </div>
          <div class="content">
            <h2>Congratulations ${senderName}!</h2>
            <div class="success">
              <strong>${accepterName} has accepted your interest!</strong>
            </div>
            <p>This is a great step forward in your journey to find your perfect match.</p>
            <p>Login to your account to view contact details and take the next step.</p>
            <p>Wishing you all the best!</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Siruvapuri Matrimony. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // OTP email for password reset
  passwordResetOTP: (name, otp) => ({
    subject: 'Password Reset OTP - Siruvapuri Matrimony',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00D26A; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .otp-box { background-color: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; margin: 20px 0; text-align: center; }
          .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .warning { color: #856404; font-size: 14px; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>We received a request to reset your password. Use the OTP below to verify your identity:</p>
            <div class="otp-box">
              <p>Your One-Time Password (OTP)</p>
              <p class="otp-code">${otp}</p>
              <p class="warning">This OTP is valid for 10 minutes only.</p>
            </div>
            <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
            <p><strong>Do not share this OTP with anyone.</strong></p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Siruvapuri Matrimony. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Password reset successful email
  passwordResetSuccess: (name) => ({
    subject: 'Password Reset Successful - Siruvapuri Matrimony',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #00D26A; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .success { background-color: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Successful</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <div class="success">
              <strong>Your password has been reset successfully!</strong>
            </div>
            <p>You can now login to your account with your new password.</p>
            <p>If you did not make this change, please contact our support team immediately.</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Siruvapuri Matrimony. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};

module.exports = emailTemplates;
