export function VerificationEmail(username: string, otp: string) {
  return `
  <div style="font-family:Arial;padding:40px;background:#f1f5f9">
    <div style="max-width:500px;margin:auto;background:white;padding:30px;border-radius:10px">
      <h2>Verify Your Email</h2>
      <p>Hello <strong>${username}</strong></p>
      <p>Your OTP code is:</p>
      <h1 style="letter-spacing:6px">${otp}</h1>
      <p>This code expires soon.</p>
    </div>
  </div>
  `;
}