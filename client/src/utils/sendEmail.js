import emailjs from '@emailjs/browser';

export const sendStatusEmail = async ({ to_name, to_email, message, includeLoginButton = false }) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const appUrl = import.meta.env.VITE_NURSE_APP_URL;


 
const login_button = includeLoginButton
  ? `<a href="${appUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#00695c;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">כניסה למערכת</a>`
  : '';

    const templateParams = {
      to_name: to_name,
      to_email: to_email,
      message: message,
      login_button: login_button,
    };

    const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log("📨 Email sent:", result.text);
    return true;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return false;
  }
};
