import ContactForm from "@/components/ContactForm";
import SectionHeader from "@/components/SectionHeader";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <article className="flex flex-col gap-10 pb-20 pt-8">
      <SectionHeader
        label="Contact"
        title="Let's Connect"
        description="Have a project in mind, career opportunity, or want to collaborate on AI? Drop me a message."
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          {[
            { icon: Mail, label: "Email", value: "sjnigam10@gmail.com", href: "mailto:sjnigam10@gmail.com" },
            { icon: Phone, label: "Phone", value: "+91 7620120592" },
            { icon: MapPin, label: "Location", value: "Pune, India" },
          ].map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="glass-card flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-violet-500/20">
                <Icon className="size-5 text-accent-violet" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                {href ? (
                  <a href={href} className="text-sm font-medium link">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-medium">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-6 lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </article>
  );
}
