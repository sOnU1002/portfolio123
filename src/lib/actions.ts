"use server";

import ContactFormEmail from "@/components/email/ContactFormEmail";
import { Resend } from "resend";
import { z } from "zod";
import { ContactFormSchema } from "./schemas";

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

async function sendViaResend(data: ContactFormInputs) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const { name, email, message } = data;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const toEmail = process.env.CONTACT_EMAIL || "sjnigam10@gmail.com";

  const { data: emailData, error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    react: ContactFormEmail({ name, email, message }),
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (!emailData || error) {
    throw new Error(error?.message || "Resend failed");
  }
}

async function sendViaFormSubmit(data: ContactFormInputs) {
  const { name, email, message } = data;
  const toEmail = process.env.CONTACT_EMAIL || "sjnigam10@gmail.com";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://portfolio-saket-tan.vercel.app";

  const response = await fetch(`https://formsubmit.co/ajax/${toEmail}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Referer: siteUrl,
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `Portfolio message from ${name}`,
      _template: "table",
      _captcha: "false",
    }),
  });

  const result = await response.json();

  if (result.message?.includes("Activation")) {
    throw new Error(
      "ACTIVATION_REQUIRED: Check sjnigam10@gmail.com and click the FormSubmit activation link, then try again.",
    );
  }

  if (!response.ok || result.success === "false" || result.success === false) {
    throw new Error(result.message || "FormSubmit failed");
  }
}

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.format() };
  }

  const payload = result.data;

  try {
    if (process.env.RESEND_API_KEY) {
      await sendViaResend(payload);
    } else {
      await sendViaFormSubmit(payload);
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    const msg = error instanceof Error ? error.message : "";

    if (msg.includes("ACTIVATION_REQUIRED")) {
      return {
        error:
          "Almost ready! Check your email (sjnigam10@gmail.com) for a FormSubmit activation link. Click it once, then try again.",
      };
    }

    return {
      error:
        "Failed to send message. Please email me directly at sjnigam10@gmail.com",
    };
  }
}
