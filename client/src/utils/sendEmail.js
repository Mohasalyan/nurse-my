import emailjs from '@emailjs/browser';

export const sendStatusEmail = async ({ to_name, to_email, message, includeLoginButton = false }) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // لو فيه زر تسجيل دخول، بنضيفه على الرسالة
    const fullMessage = includeLoginButton
      ? `${message}<br /><br /><a href="https://your-app-url.com/auth/login" style="display:inline-block;background-color:#00695c;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">כניסה למערכת</a>`
      : message;

    const templateParams = {
      to_name: to_name,
      to_email: to_email,
      message: fullMessage, // ✅ هذا كان ناقص
    };

    const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log("📨 Email sent:", result.text);
    return true;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return false;
  }
};
