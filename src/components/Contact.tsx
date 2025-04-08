import { useState } from "react";
import { cn } from "../lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  Twitter,
  Instagram,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ status: "submitting", message: "" });

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        status: "success",
        message: "Thank you for your message! I'll get back to you soon.",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "naman.rathi@example.com",
      link: "mailto:naman.rathi@example.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+91 98765 43210",
      link: "tel:+919876543210",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Bangalore, India",
      link: "https://maps.google.com/?q=Bangalore,India",
    },
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/naman-rathi-269503214/",
      color: "bg-[#0077B5]",
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      link: "https://github.com/namanrathi8830",
      color: "bg-[#333]",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      label: "Twitter",
      link: "https://twitter.com/",
      color: "bg-[#1DA1F2]",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      label: "Instagram",
      link: "https://instagram.com/",
      color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-background py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Contact Me
        </h2>

        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
          Have a project in mind or want to discuss a potential collaboration?
          I'd love to hear from you! Fill out the form below or reach out
          through any of the provided contact methods.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-card rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus.status === "submitting"}
                className={cn(
                  "w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors",
                  formStatus.status === "submitting"
                    ? "bg-primary/70 text-primary-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90",
                )}
              >
                {formStatus.status === "submitting" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>

              {formStatus.status === "success" && (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg">
                  {formStatus.message}
                </div>
              )}

              {formStatus.status === "error" && (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg">
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.label}</h4>
                      <p className="text-muted-foreground">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110",
                      social.color,
                    )}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Availability</h3>
              <p className="text-muted-foreground mb-2">
                I'm currently available for freelance work and collaborations.
              </p>
              <p className="text-muted-foreground">
                Response Time: <span className="font-medium">24-48 hours</span>
              </p>
            </div>
          </div>
        </div>

        {/* Map or Additional Section */}
        <div className="bg-card rounded-xl shadow-lg overflow-hidden h-64 md:h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.6600798865!2d77.35073573336324!3d12.954517008640543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1653308394916!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
