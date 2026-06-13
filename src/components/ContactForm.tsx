"use client";

import { ContactFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import Link from "next/link";

type Inputs = z.infer<typeof ContactFormSchema>;

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sjnigam10@gmail.com";

async function sendViaFormSubmit(data: Inputs) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
  const ok =
    result.success === true ||
    result.success === "true" ||
    result.message?.toLowerCase().includes("submitted successfully");

  if (result.message?.includes("Activation")) {
    throw new Error(
      "Email not activated yet. Check your inbox for a FormSubmit activation link.",
    );
  }

  if (!response.ok || !ok) {
    throw new Error(result.message || "FormSubmit failed");
  }
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      // FormSubmit works reliably from the browser (server-side calls fail on Vercel)
      await sendViaFormSubmit(data);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send. Please email sjnigam10@gmail.com directly.";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {/* Name */}
        <div className="h-16">
          <Input
            id="name"
            type="text"
            placeholder="Name"
            autoComplete="given-name"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="input-error">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="h-16">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
          />

          {errors.email?.message && (
            <p className="input-error">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="h-32 sm:col-span-2">
          <Textarea
            rows={4}
            placeholder="Leave feedback about the site, career opportunities or just to say hello etc."
            autoComplete="Message"
            className="resize-none"
            {...register("message")}
          />

          {errors.message?.message && (
            <p className="input-error">{errors.message.message}</p>
          )}
        </div>
      </div>
      <div className="mt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <span>Sending...</span>
              <ReloadIcon className="ml-2 animate-spin" />
            </div>
          ) : (
            <div className="flex items-center">
              <span>Send Message</span>
              <PaperPlaneIcon className="ml-2" />
            </div>
          )}
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          By submitting this form, I agree to the{" "}
          <Link href="/privacy" className="link font-semibold">
            privacy&nbsp;policy.
          </Link>
        </p>
      </div>
    </form>
  );
}
