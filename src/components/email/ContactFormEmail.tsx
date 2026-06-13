interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={{ fontFamily: "sans-serif", maxWidth: "600px" }}>
    <h2 style={{ color: "#7c3aed" }}>New Portfolio Message</h2>
    <p>
      <strong>From:</strong> {name}
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
    <hr style={{ border: "1px solid #e5e7eb", margin: "16px 0" }} />
    <p>
      <strong>Message:</strong>
    </p>
    <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
    <hr style={{ border: "1px solid #e5e7eb", margin: "16px 0" }} />
    <p style={{ color: "#6b7280", fontSize: "12px" }}>
      Sent from portfolio-saket-tan.vercel.app
    </p>
  </div>
);

export default ContactFormEmail;
