import ContactFormEmail from "@/components/email/ContactFormEmail";
import { Resend } from "resend";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

async function sendViaResend(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error("RESEND_NOT_CONFIGURED");

  const resend = new Resend(apiKey);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const toEmail = process.env.CONTACT_EMAIL || "sjnigam10@gmail.com";

  const { data: emailData, error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: data.email,
    subject: `Portfolio message from ${data.name}`,
    react: ContactFormEmail({
      name: data.name,
      email: data.email,
      message: data.message,
    }),
    text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
  });

  if (!emailData || error) {
    throw new Error(error?.message || "Resend failed");
  }
}

async function sendViaWeb3Forms(data: ContactPayload) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) throw new Error("WEB3FORMS_NOT_CONFIGURED");

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      name: data.name,
      email: data.email,
      message: data.message,
      subject: `Portfolio message from ${data.name}`,
    }),
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Web3Forms failed");
  }
}

async function sendViaFormSubmit(data: ContactPayload) {
  const toEmail = process.env.CONTACT_EMAIL || "sjnigam10@gmail.com";
  const siteUrl = getSiteUrl();

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: siteUrl,
        Referer: `${siteUrl}/contact`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        _subject: `Portfolio message from ${data.name}`,
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  const result = await response.json();

  if (result.message?.includes("Activation")) {
    throw new Error("FORM_SUBMIT_ACTIVATION_REQUIRED");
  }

  if (!response.ok || result.success === "false" || result.success === false) {
    throw new Error(result.message || "FormSubmit failed");
  }
}

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://portfolio-saket-tan.vercel.app")
  );
}

export async function sendContactEmail(data: ContactPayload) {
  if (process.env.RESEND_API_KEY?.trim()) {
    await sendViaResend(data);
    return;
  }

  if (process.env.WEB3FORMS_ACCESS_KEY?.trim()) {
    await sendViaWeb3Forms(data);
    return;
  }

  await sendViaFormSubmit(data);
}
