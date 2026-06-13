"use server";

import { sendContactEmail } from "@/lib/email";
import { z } from "zod";
import { ContactFormSchema } from "./schemas";

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

/** @deprecated Use /api/contact from the client instead */
export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.format() };
  }

  try {
    await sendContactEmail(result.data);
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      error:
        "Failed to send message. Please email sjnigam10@gmail.com directly.",
    };
  }
}
