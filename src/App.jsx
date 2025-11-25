import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Briefcase,
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Calendar,
  Building2,
  Facebook,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import "./App.css";
import img from "./assets/img.jpg";
import CV from "./assets/BiplobCV.pdf";

export default function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = {
    home: homeRef,
    projects: projectsRef,
    skills: skillsRef,
    contact: contactRef,
  };

  const scrollTo = (name) => {
    setActive(name);
    setMenuOpen(false);
    const ref = sections[name];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error("EmailJS configuration is missing");
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        subject: `New Portfolio Message from ${formData.name}`,

        name: formData.name,
        email: formData.email,
        reply_to: formData.email,
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      // console.log("Email sent successfully:", response);

      showToast(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      // console.error("Error sending message:", error);
      showToast(
        "Failed to send message. Please try again or email me directly.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const projects = [
    {
      title: "Python/React E-commerce Platform",
      desc: "API-driven backend using Django REST Framework with React frontend and Redux state management. Custom admin panel for product, order, and user management.",
      tech: ["React", "Django REST", "Postgress SQL"],
      color: "from-blue-500 to-indigo-500",
      link: "#",
    },
    {
      title: "Travel & Hospital Embed Booking System",
      desc: "Created embeddable booking widgets with REST APIs and payment integration. Admin panel for managing bookings, hospitals, and payment workflows.",
      tech: ["Laravel", "REST API", "MySQL"],
      color: "from-purple-500 to-pink-500",
      link: "#",
    },
    {
      title: "Bus Ticketing System",
      desc: "Implemented real-time seat availability tracking and secure booking system with payment integration.",
      tech: ["Laravel", "MySQL", "JavaScript"],
      color: "from-green-500 to-teal-500",
      link: "#",
    },
    {
      title: "ABI E-commerce Platform",
      desc: "Product management system with categorization, ordering, and admin tools featuring clean, scalable architecture.",
      tech: ["Laravel 11", "Bootstrap", "MySQL"],
      color: "from-orange-500 to-red-500",
      link: "#",
    },
  ];

  const skills = [
    { name: "JavaScript", level: 65, icon: "📜" },
    { name: "Python/Django", level: 60, icon: "🐍" },
    { name: "PHP/Laravel", level: 70, icon: "🐘" },
    { name: "React", level: 68, icon: "⚛️" },
    { name: "REST APIs", level: 70, icon: "🔌" },
    { name: "MySQL/PosgressSQL", level: 60, icon: "💾" },
  ];

  const experience = [
    {
      title: "Junior Developer",
      company: "Afore Solutions",
      period: "Jun 2025 - Present",
      description:
        "Developed and integrated scalable REST APIs for production. Performed backend optimization, debugging, and comprehensive QA testing.",
      icon: Building2,
    },
    {
      title: "Junior Laravel Developer(Contract Based)",
      company: "Mirrai Tech",
      period: "May 2025 - Jun 2025",
      description:
        "Built and maintained Laravel-based applications and admin dashboards. Improved application performance and ensured cross-browser compatibility.",
      icon: Code,
    },
    {
      title: "Intern",
      company: "SoftNEP Pvt. Ltd.",
      period: "Jan 2025 - May 2025",
      description:
        "Gained hands-on experience with full-stack development in production environment. Worked with professional MVC architecture and modern workflows.",
      icon: Briefcase,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-5 duration-300">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border-2 ${
              toast.type === "success"
                ? "bg-green-50 border-green-500 text-green-800"
                : "bg-red-50 border-red-500 text-red-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="flex-shrink-0" size={24} />
            ) : (
              <AlertCircle className="flex-shrink-0" size={24} />
            )}
            <p className="font-semibold">{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              className="ml-2 hover:opacity-70 transition-opacity"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-300 shadow-sm">
              <img
                src={img}
                alt="Biplob Kafle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-bold text-lg text-gray-900">Biplob Kafle</div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["home", "projects", "skills", "contact"].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`relative font-semibold text-sm transition-colors ${
                  active === s
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {s[0].toUpperCase() + s.slice(1)}
                <span
                  className={`block h-0.5 bg-blue-600 mt-2 rounded-full transition-all ${
                    active === s ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  aria-hidden
                />
              </button>
            ))}
            <a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              Resume
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="px-4 py-3 flex flex-col gap-2">
              {["home", "projects", "skills", "contact"].map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700"
                >
                  {s[0].toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <header
        ref={homeRef}
        className="min-h-screen flex items-center justify-center pt-20 bg-white"
      >
        <div
          className={`max-w-5xl mx-auto w-full text-center px-6 transform transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto w-56 h-56 rounded-full overflow-hidden ring-4 ring-gray-200 shadow-xl mb-8 transform hover:scale-105 transition-transform">
              <img
                src={img}
                alt="Biplob avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-gray-900">
              Hi, I'm{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Biplob Kafle
              </span>
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-600 leading-relaxed">
              Full-stack developer specializing in Django, Laravel, React, and
              REST API development. I focus on writing clean code, improving
              performance, and following industry-standard workflows.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold"
              >
                View my work <ArrowRight size={16} />
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-md transition-all font-semibold"
              >
                <Mail size={16} /> Get in touch
              </button>
            </div>

            <div className="flex mt-10 gap-4 justify-center">
              <a
                href="https://github.com/kaflebiplob/"
                className="p-4 bg-gray-900 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-md hover:shadow-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/biplob-kafle-56b16925a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-900 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-md hover:shadow-xl"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.facebook.com/biplop.kafle"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-900 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-md hover:shadow-xl"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section
        ref={skillsRef}
        className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-700 rounded-full font-semibold mb-4 shadow-sm">
              <Award size={18} />
              <span>Expertise & Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Skills & Experience
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              My technical expertise and professional journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                <Award className="text-blue-600" size={28} />
                Technical Skills
              </h3>
              <div className="space-y-6">
                {skills.map((s, idx) => {
                  const colors = [
                    { bg: "bg-blue-600", glow: "shadow-blue-500/50" },
                    { bg: "bg-indigo-600", glow: "shadow-indigo-500/50" },
                    { bg: "bg-green-600", glow: "shadow-green-500/50" },
                    { bg: "bg-purple-600", glow: "shadow-purple-500/50" },
                    { bg: "bg-orange-600", glow: "shadow-orange-500/50" },
                    { bg: "bg-teal-600", glow: "shadow-teal-500/50" },
                  ];
                  const color = colors[idx % colors.length];

                  return (
                    <div key={idx} className="group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{s.icon}</span>
                          <span className="text-base md:text-lg font-bold text-gray-900">
                            {s.name}
                          </span>
                        </div>
                        <span className="text-sm md:text-base font-bold text-gray-700 bg-gray-100 px-4 py-1.5 rounded-full">
                          {s.level}%
                        </span>
                      </div>
                      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`absolute inset-0 ${color.bg} rounded-full transition-all duration-1000 ease-out ${color.glow} shadow-md`}
                          style={{ width: `${s.level}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                <Calendar className="text-indigo-600" size={28} />
                Work Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp, idx) => {
                  const Icon = exp.icon;
                  return (
                    <div
                      key={idx}
                      className="group relative bg-gray-50 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                          <Icon className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                            {exp.title}
                          </h4>
                          <div className="flex items-center gap-2 text-sm md:text-base text-gray-600 mb-2">
                            <span className="font-semibold text-blue-600">
                              {exp.company}
                            </span>
                            <span>•</span>
                            <span className="text-gray-500">{exp.period}</span>
                          </div>
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={projectsRef}
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold mb-4">
              <Briefcase size={18} />
              <span>My Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Featured Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Selected projects that highlight my skills and the problems I
              enjoy solving
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            {projects.map((p, i) => (
              <article
                key={i}
                className="group bg-white rounded-2xl p-6 md:p-7 shadow-lg hover:shadow-2xl 
             transition-all duration-300 transform hover:-translate-y-3 
             border border-gray-100 flex flex-col"
              >
                <div className="flex justify-between items-start mb-5">
                  <div
                    className={`p-3 bg-gradient-to-br ${p.color} rounded-xl shadow-md transition-transform group-hover:scale-110`}
                  >
                    <Code className="text-white" size={28} />
                  </div>
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <ExternalLink size={22} />
                  </button>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-5 leading-relaxed">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-200 transition-all cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <a
                    href={p.link}
                    className="inline-flex items-center gap-2 text-sm md:text-base font-semibold 
               text-blue-600 hover:text-indigo-600 transition-colors group"
                  >
                    View Project
                    <ArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      size={16}
                    />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={contactRef}
        className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-white"
      >
        <div className="max-w-2xl mx-auto text-center w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Let's Work Together
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 px-4">
            Have a project in mind? Drop me a message and let's create something
            amazing!
          </p>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200">
            <div className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className={`w-full px-5 py-4 bg-gray-50 rounded-xl border-2 ${
                    formErrors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  } focus:bg-white focus:outline-none transition-all text-sm sm:text-base`}
                />
                {formErrors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className={`w-full px-5 py-4 bg-gray-50 rounded-xl border-2 ${
                    formErrors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  } focus:bg-white focus:outline-none transition-all text-sm sm:text-base`}
                />
                {formErrors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="5"
                  className={`w-full px-5 py-4 bg-gray-50 rounded-xl border-2 ${
                    formErrors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  } focus:bg-white focus:outline-none transition-all resize-none text-sm sm:text-base`}
                ></textarea>
                {formErrors.message && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center border-t border-gray-200 bg-gray-50">
        <p className="text-gray-600 text-sm sm:text-base">
          © 2023-2025 Biplob Kafle.
        </p>
      </footer>
    </div>
  );
}
