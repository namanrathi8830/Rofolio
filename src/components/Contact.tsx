import React, { useEffect, useState, useRef } from 'react';
import { cn } from "../lib/utils";
import emailjs from '@emailjs/browser';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  Instagram,
  ChevronRight,
  Download,
  FileText
} from "lucide-react";

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// CSS for animation delays and 3D effects
const animationStyles = `
  .transition-delay-100ms { transition-delay: 100ms; }
  .transition-delay-200ms { transition-delay: 200ms; }
  .transition-delay-300ms { transition-delay: 300ms; }
  .transition-delay-400ms { transition-delay: 400ms; }
  .transition-delay-500ms { transition-delay: 500ms; }
  .transition-delay-600ms { transition-delay: 600ms; }
  .transition-delay-700ms { transition-delay: 700ms; }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  /* Social Icons Animation - Enhanced */
  .social-login-icons {
    display: flex;
    align-items: center;
    gap: 10px;
    -webkit-box-reflect: below 5px linear-gradient(transparent, #00000055);
  }
  
  .socialcontainer {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.3s;
    cursor: pointer;
    color: white;
  }
  
  .socialcontainer:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 15px rgba(0,0,0,0.3);
  }
  
  .icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    transform: translateY(0);
    transition: all 0.3s ease-in-out;
    color: white;
  }
  
  .social-icon-1-1 {
    background: #0077B5;
  }
  
  .social-icon-1-2 {
    background: #333;
  }
  
  .social-icon-1-3 {
    background: linear-gradient(45deg, #833AB4, #FD1D1D, #FCAF45);
  }
  
  .input-3d {
    transition: all 0.3s ease;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
  }
  
  .input-3d:focus {
    transform: scale(1.01);
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.4), 0 0 10px rgba(0, 123, 255, 0.3);
  }
  
  .floating-label {
    position: absolute;
    top: 0;
    left: 10px;
    padding: 0 5px;
    background-color: #0a1515;
    transform: translateY(-50%);
    transition: all 0.3s ease;
    pointer-events: none;
  }
  
  .map-3d-effect {
    transition: all 0.4s ease;
    transform-style: preserve-3d;
    perspective: 1000px;
  }
  
  .map-3d-effect:hover {
    transform: scale(1.01);
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
  }
  
  .cv-download-btn {
    background: linear-gradient(135deg, #2563eb, #10b981);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .cv-download-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: all 0.6s ease;
  }
  
  .cv-download-btn:hover::before {
    left: 100%;
  }
  
  .cv-download-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  }
`;

const Contact: React.FC = () => {
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

  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const infoCardRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (infoCardRef.current && formCardRef.current) {
      const infoRect = infoCardRef.current.getBoundingClientRect();
      const formRect = formCardRef.current.getBoundingClientRect();
      
      // Info card 3D effect - reduced intensity
      const infoXAxis = (e.clientX - infoRect.left - infoRect.width / 2) / 30;
      const infoYAxis = (e.clientY - infoRect.top - infoRect.height / 2) / 30;
      infoCardRef.current.style.transform = `rotateY(${infoXAxis}deg) rotateX(${-infoYAxis}deg)`;
      
      // Form card 3D effect - reduced intensity
      const formXAxis = (e.clientX - formRect.left - formRect.width / 2) / 30;
      const formYAxis = (e.clientY - formRect.top - formRect.height / 2) / 30;
      formCardRef.current.style.transform = `rotateY(${formXAxis}deg) rotateX(${-formYAxis}deg)`;
    }
  };
  
  const handleMouseLeave = () => {
    if (infoCardRef.current && formCardRef.current) {
      infoCardRef.current.style.transform = 'rotateY(0) rotateX(0)';
      formCardRef.current.style.transform = 'rotateY(0) rotateX(0)';
    }
  };
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }
    
    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  // Initialize EmailJS and add styles
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Add animation styles to the document
    const styleEl = document.createElement('style');
    styleEl.textContent = animationStyles;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

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

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    // Send email using EmailJS
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )
      .then((response) => {
        console.log('Email sent successfully:', response);
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
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setFormStatus({
          status: "error",
          message: "There was an error sending your message. Please try again later.",
        });
      });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "1rn22cd049.namanmangilalrathi@gmail.com",
      link: "mailto:1rn22cd049.namanmangilalrathi@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+91 8830634853",
      link: "tel:+918830634853",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Sai Brindavan Enclave, RR Nagar, Bengaluru",
      link: "https://maps.google.com/?q=Sai+Brindavan+Enclave+RR+nagar+Channasandra+Bengaluru+Karnataka+India",
    },
  ];

  const socialLinks = [
    {
      icon: <Linkedin size={28} color="white" />,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/naman-rathi-269503214",
      color: "social-icon-1-1",
    },
    {
      icon: <Github size={28} color="white" />,
      label: "GitHub",
      link: "https://github.com/namanrathi8830",
      color: "social-icon-1-2",
    },
    {
      icon: <Instagram size={28} color="white" />,
      label: "Instagram",
      link: "https://instagram.com/",
      color: "social-icon-1-3",
    },
  ];

  // Animation CSS
  const fadeInUpAnimation = "opacity-0 translate-y-10 transition-all duration-1000 ease-out";
  const fadeInUpVisible = "opacity-100 translate-y-0";
  
  // Staggered animations with delay
  const animateWithDelay = (index: number) => {
    return isVisible ? `${fadeInUpVisible} transition-delay-${index * 100}ms` : "";
  };

  // Add CV path
  const cvFilePath = "/assets/Naman_Rathi_CV.pdf";

  return (
    <div ref={contactRef} 
      className="bg-[#122222] text-white min-h-screen px-4 py-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Title */}
      <div className={cn(
        "text-center mb-16 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Get in Touch
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
        </p>
      </div>
      
      {/* CV Download Section - Added above Contact Info & Form Section */}
      <div className={cn(
        "max-w-6xl mx-auto bg-[#1a2e2e] backdrop-blur-sm rounded-xl p-8 border border-[#2a3e3e] shadow-xl mb-12 overflow-hidden",
        fadeInUpAnimation,
        isVisible ? fadeInUpVisible : "",
        "transition-delay-200ms"
      )}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className={cn(
            "flex-1 mb-6 md:mb-0 md:mr-8",
            fadeInUpAnimation,
            animateWithDelay(1)
          )}>
            <h2 className="text-2xl font-semibold mb-3 text-blue-400">Download My CV</h2>
            <p className="text-gray-300 mb-4">
              Want to know more about my skills, experience, and qualifications? 
              Download my CV to get a comprehensive overview of my professional journey.
            </p>
            <div className="flex items-center text-gray-400 mb-4">
              <FileText className="h-5 w-5 mr-2 text-blue-400" />
              <span>Naman_Rathi_CV.pdf</span>
            </div>
          </div>
          
          <div className={cn(
            "flex-shrink-0",
            fadeInUpAnimation,
            animateWithDelay(2)
          )}>
            <a 
              href={cvFilePath} 
              download="Naman_Rathi_CV.pdf"
              className="cv-download-btn flex items-center justify-center px-6 py-4 rounded-lg text-white font-medium shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-5 w-5 mr-2" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Contact Info & Form Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Contact Information */}
        <div 
          ref={infoCardRef}
          className={cn(
            "bg-[#1a2e2e] backdrop-blur-sm rounded-xl p-8 border border-[#2a3e3e] shadow-xl",
            fadeInUpAnimation,
            isVisible ? fadeInUpVisible : "",
            "transition-all duration-500 ease-out transform-gpu",
            "hover:shadow-[0_10px_25px_rgba(0,123,255,0.2)]"
          )}
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
          <h2 className="text-2xl font-semibold mb-8 text-blue-400" style={{ transform: 'translateZ(20px)' }}>Contact Information</h2>
          <div className="space-y-8">
            {contactInfo.map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex items-start group transition-all", 
                  fadeInUpAnimation,
                  animateWithDelay(index + 1)
                )}
                style={{ transform: 'translateZ(10px)' }}
              >
                <div className="bg-[#2a3e3e] p-3 rounded-full mr-4 group-hover:bg-blue-500 transition-colors duration-300 group-hover:shadow-[0_0_15px_rgba(0,123,255,0.7)]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-200">{item.label}</h3>
                  <a 
                    href={item.link} 
                    className="text-blue-400 hover:text-blue-300 block mt-1 group-hover:translate-x-1 transition-transform duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="inline-block">{item.value}</span> 
                    <ChevronRight className="h-4 w-4 inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Social Links */}
          <div className={cn(
            "mt-12", 
            fadeInUpAnimation, 
            animateWithDelay(4)
          )}
            style={{ transform: 'translateZ(30px)' }}
          >
            <h3 className="text-xl font-semibold mb-6 text-blue-400">Connect With Me</h3>
            
            {/* Custom Social Icons with Reflection */}
            <div className="social-login-icons">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-xl"
                >
                  <div className="socialcontainer">
                    <div className={`icon ${social.color}`}>
                      {social.icon}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
          {/* Contact Form */}
        <div 
          ref={formCardRef}
          className={cn(
            "bg-[#1a2e2e] backdrop-blur-sm rounded-xl p-8 border border-[#2a3e3e] shadow-xl overflow-hidden relative",
            fadeInUpAnimation,
            isVisible ? fadeInUpVisible : "",
            "transition-delay-300ms",
            "hover:shadow-[0_10px_25px_rgba(20,184,166,0.2)]"
          )}
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500 opacity-20 rounded-full blur-3xl"></div>
          
          <h2 className="text-2xl font-semibold mb-8 text-blue-400 relative" style={{ transform: 'translateZ(20px)' }}>Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5 relative">
            <div className={cn(fadeInUpAnimation, animateWithDelay(1))} style={{ transform: 'translateZ(10px)' }}>
              <div className="relative">
                  <input
                    id="name"
                    name="name"
                  type="text"
                  required
                    value={formData.name}
                    onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a1515] border border-[#2a3e3e] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white input-3d"
                    placeholder=" "
                  />
                <label htmlFor="name" className="floating-label text-sm font-medium text-gray-400">
                  Your Name
                </label>
              </div>
                </div>
            
            <div className={cn(fadeInUpAnimation, animateWithDelay(2))} style={{ transform: 'translateZ(15px)' }}>
              <div className="relative">
                  <input
                    id="email"
                    name="email"
                  type="email"
                  required
                    value={formData.email}
                    onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a1515] border border-[#2a3e3e] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white input-3d"
                    placeholder=" "
                />
                <label htmlFor="email" className="floating-label text-sm font-medium text-gray-400">
                  Email Address
                </label>
              </div>
              </div>

            <div className={cn(fadeInUpAnimation, animateWithDelay(3))} style={{ transform: 'translateZ(20px)' }}>
              <div className="relative">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a1515] border border-[#2a3e3e] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white input-3d"
                  placeholder=" "
                />
                <label htmlFor="subject" className="floating-label text-sm font-medium text-gray-400">
                  Subject
                </label>
              </div>
              </div>

            <div className={cn(fadeInUpAnimation, animateWithDelay(4))} style={{ transform: 'translateZ(25px)' }}>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a1515] border border-[#2a3e3e] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white input-3d"
                  placeholder=" "
                />
                <label htmlFor="message" className="floating-label text-sm font-medium text-gray-400">
                  Message
                </label>
              </div>
              </div>

            <div className={cn(fadeInUpAnimation, animateWithDelay(5))} style={{ transform: 'translateZ(30px)' }}>
              <button
                type="submit"
                disabled={formStatus.status === "submitting"}
                className={cn(
                  "w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all duration-300",
                  formStatus.status === "submitting"
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 hover:shadow-[0_0_10px_rgba(20,184,166,0.5)] hover:-translate-y-0.5"
                )}
              >
                {formStatus.status === "submitting" ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
            
            {formStatus.message && (
              <div
                className={cn(
                  "p-4 rounded-lg mt-4 animate-fadeIn transition-all",
                  formStatus.status === "success"
                    ? "bg-[#163832] text-green-400 border border-green-700"
                    : "bg-[#381616] text-red-400 border border-red-700"
                )}
                style={{ transform: 'translateZ(10px)' }}
              >
                  {formStatus.message}
                </div>
              )}
            </form>
              </div>
            </div>

      {/* Google Maps */}
      <div className={cn(
        "max-w-6xl mx-auto bg-[#1a2e2e] backdrop-blur-sm rounded-xl p-8 border border-[#2a3e3e] shadow-xl mb-12 overflow-hidden",
        fadeInUpAnimation,
        isVisible ? fadeInUpVisible : "",
        "transition-delay-500ms"
      )}>
        <h2 className="text-2xl font-semibold mb-6 text-blue-400">Find Me Here</h2>
        <div className="h-96 rounded-lg overflow-hidden map-3d-effect">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3711460558564!2d77.51115397500116!3d12.946105987364928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3eed3e91d381%3A0x3232c3a86b976866!2sSai%20Brindavan%20Enclave%2C%20RR%20Nagar%2C%20Channasandra%2C%20Bengaluru%2C%20Karnataka%20560098!5e0!3m2!1sen!2sin!4v1716814549318!5m2!1sen!2sin&maptype=roadmap&style=feature:all|element:labels|visibility:on|&style=feature:all|element:labels.text.fill|color:0xffffff&style=feature:all|element:labels.text.stroke|color:0x000000&style=feature:administrative|element:geometry|color:0x1a2e2e&style=feature:landscape|element:geometry|color:0x0c1a1a&style=feature:poi|element:geometry|color:0x1a2e2e&style=feature:road|element:geometry|color:0x2a3e3e&style=feature:road|element:labels.text.fill|color:0xffffff&style=feature:water|element:geometry|color:0x0c1a1a"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen
            loading="lazy"
            title="Google Maps - Sai Brindavan Enclave"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
