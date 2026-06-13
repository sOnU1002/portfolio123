import ContactFormEmail from "@/components/email/ContactFormEmail";
import { Resend } from "resend";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const DEFAULT_CONTACT_EMAIL = "sjnigam10@gmail.com";

function getContactEmail() {
  return process.env.CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;
}

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://portfolio-saket-tan.vercel.app")
  );
}

function isFormSubmitSuccess(result: {
  success?: boolean | string;
  message?: string;
}) {
  return (
    result.success === true ||
    result.success === "true" ||
    result.message?.toLowerCase().includes("submitted successfully")
  );
}

async function sendViaResend(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error("RESEND_NOT_CONFIGURED");

  const resend = new Resend(apiKey);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  const { data: emailData, error } = await resend.emails.send({
    from: fromEmail,
    to: getContactEmail(),
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

export async function sendViaFormSubmit(data: ContactPayload) {
  const toEmail = getContactEmail();
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

  let result: { success?: boolean | string; message?: string };
  try {
    result = await response.json();
  } catch {
    throw new Error("FormSubmit returned an invalid response");
  }

  if (result.message?.includes("Activation")) {
    throw new Error("FORM_SUBMIT_ACTIVATION_REQUIRED");
  }

  if (!response.ok || !isFormSubmitSuccess(result)) {
    throw new Error(result.message || "FormSubmit failed");
  }
}

export async function sendContactEmail(data: ContactPayload) {
  const errors: string[] = [];

  if (process.env.RESEND_API_KEY?.trim()) {
    try {
      await sendViaResend(data);
      return;
    } catch (error) {
      errors.push(
        `Resend: ${error instanceof Error ? error.message : "failed"}`,
      );
    }
  }

  if (process.env.WEB3FORMS_ACCESS_KEY?.trim()) {
    try {
      await sendViaWeb3Forms(data);
      return;
    } catch (error) {
      errors.push(
        `Web3Forms: ${error instanceof Error ? error.message : "failed"}`,
      );
    }
  }

  try {
    await sendViaFormSubmit(data);
    return;
  } catch (error) {
    errors.push(
      `FormSubmit: ${error instanceof Error ? error.message : "failed"}`,
    );
  }

  throw new Error(errors.join(" | ") || "All email providers failed");
}

export function getPublicContactEmail() {
  return (
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    process.env.CONTACT_EMAIL?.trim() ||
    DEFAULT_CONTACT_EMAIL
  );
}
