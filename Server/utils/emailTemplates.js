export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
  return `
    <div style="font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">

      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 48px 36px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
          <span style="font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">AcadTrack</span>
        </div>
        <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.65); letter-spacing: 0.5px; text-transform: uppercase; font-weight: 500;">Academic Management Platform</p>
      </div>

      <!-- Lock Icon Strip -->
      <div style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 20px 48px; display: flex; align-items: center; gap: 12px;">
        <div style="width: 36px; height: 36px; background: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="11" width="14" height="11" rx="2" stroke="#2563eb" stroke-width="2"/>
            <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div>
          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1e293b;">Password Reset Request</p>
          <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">This link expires in 15 minutes</p>
        </div>
      </div>

      <!-- Body -->
      <div style="padding: 40px 48px;">
        <p style="margin: 0 0 8px; font-size: 17px; font-weight: 600; color: #0f172a;">Hi there,</p>
        <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #475569;">
          We received a request to reset the password for your AcadTrack account. If you made this request, click the button below to choose a new password.
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetPasswordUrl}"
             style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 14px 36px; border-radius: 10px; letter-spacing: 0.2px;">
            Reset My Password
          </a>
        </div>

        <!-- Divider -->
        <div style="border-top: 1px solid #f1f5f9; margin: 32px 0;"></div>

        <p style="margin: 0 0 12px; font-size: 14px; color: #64748b; line-height: 1.6;">
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; word-break: break-all;">
          <a href="${resetPasswordUrl}" style="font-size: 13px; color: #2563eb; text-decoration: none;">${resetPasswordUrl}</a>
        </div>

        <!-- Ignore Note -->
        <div style="margin-top: 24px; padding: 16px; background: #fefce8; border-left: 3px solid #eab308; border-radius: 0 8px 8px 0;">
          <p style="margin: 0; font-size: 13px; color: #713f12; line-height: 1.6;">
            <strong>Didn't request this?</strong> You can safely ignore this email. Your password will remain unchanged.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 48px; text-align: center;">
        <p style="margin: 0 0 4px; font-size: 13px; font-weight: 600; color: #334155;">AcadTrack Team</p>
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">This is an automated message — please do not reply.</p>
      </div>
    </div>
  `;
}

export function generateRequestAcceptedTemplate(supervisorName) {
  return `
    <div style="font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">

      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 48px 36px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
          <span style="font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">AcadTrack</span>
        </div>
        <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.65); letter-spacing: 0.5px; text-transform: uppercase; font-weight: 500;">Academic Management Platform</p>
      </div>

      <!-- Status Strip -->
      <div style="background: #f0fdf4; border-bottom: 1px solid #bbf7d0; padding: 20px 48px; display: flex; align-items: center; gap: 12px;">
        <div style="width: 36px; height: 36px; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13l4 4L19 7" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div>
          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #14532d;">Request Accepted</p>
          <p style="margin: 2px 0 0; font-size: 12px; color: #16a34a;">You're ready to get started</p>
        </div>
      </div>

      <!-- Body -->
      <div style="padding: 40px 48px;">
        <p style="margin: 0 0 8px; font-size: 17px; font-weight: 600; color: #0f172a;">Great news!</p>
        <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #475569;">
          Your supervisor request has been accepted by <strong style="color: #0f172a;">${supervisorName}</strong>. You can now begin working on your project and upload your files directly through the platform.
        </p>

        <!-- Info Card -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px;">
          <p style="margin: 0 0 12px; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">What's next</p>
          <ul style="margin: 0; padding: 0 0 0 20px; font-size: 14px; color: #334155; line-height: 2;">
            <li>Log in to your AcadTrack dashboard</li>
            <li>Start uploading project files and documents</li>
            <li>Communicate with your supervisor through the platform</li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 48px; text-align: center;">
        <p style="margin: 0 0 4px; font-size: 13px; font-weight: 600; color: #334155;">AcadTrack Team</p>
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">This is an automated message — please do not reply.</p>
      </div>
    </div>
  `;
}

export function generateRequestRejectedTemplate(supervisorName) {
  return `
    <div style="font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">

      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 48px 36px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
          <span style="font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">AcadTrack</span>
        </div>
        <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.65); letter-spacing: 0.5px; text-transform: uppercase; font-weight: 500;">Academic Management Platform</p>
      </div>

      <!-- Status Strip -->
      <div style="background: #fff7f7; border-bottom: 1px solid #fecaca; padding: 20px 48px; display: flex; align-items: center; gap: 12px;">
        <div style="width: 36px; height: 36px; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div>
          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #7f1d1d;">Request Not Accepted</p>
          <p style="margin: 2px 0 0; font-size: 12px; color: #dc2626;">You may submit a new request</p>
        </div>
      </div>

      <!-- Body -->
      <div style="padding: 40px 48px;">
        <p style="margin: 0 0 8px; font-size: 17px; font-weight: 600; color: #0f172a;">We're sorry to inform you,</p>
        <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #475569;">
          Your supervisor request to <strong style="color: #0f172a;">${supervisorName}</strong> was not accepted at this time. Don't worry — you're free to browse available supervisors and submit a new request.
        </p>

        <!-- Info Card -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px;">
          <p style="margin: 0 0 12px; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">What you can do</p>
          <ul style="margin: 0; padding: 0 0 0 20px; font-size: 14px; color: #334155; line-height: 2;">
            <li>Browse other available supervisors on the platform</li>
            <li>Send a new supervisor request</li>
            <li>Contact support if you need guidance</li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 48px; text-align: center;">
        <p style="margin: 0 0 4px; font-size: 13px; font-weight: 600; color: #334155;">AcadTrack Team</p>
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">This is an automated message — please do not reply.</p>
      </div>
    </div>
  `;
}
