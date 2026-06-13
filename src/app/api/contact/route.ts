import { sendContactEmail } from "@/lib/email";
import { ContactFormSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = ContactFormSchema.safeParse(body);

    if (result.error) {
      return NextResponse.json(
        { error: "Invalid form data." },
        { status: 400 },
      );
    }

    await sendContactEmail(result.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    const msg = error instanceof Error ? error.message : "";

    if (msg === "FORM_SUBMIT_ACTIVATION_REQUIRED") {
      return NextResponse.json(
        {
          error:
            "Email not activated yet. Check sjnigam10@gmail.com for FormSubmit activation link, or add RESEND_API_KEY in Vercel.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        error:
          msg ||
          "Failed to send message. Email sjnigam10@gmail.com directly.",
      },
      { status: 500 },
    );
  }
}
