import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Facebook,
  CheckCircle,
  AlertCircle,
  TerminalSquare,
  Zap,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import "./App.css";
import CV from "./assets/Biplob_cv.pdf";
import MatrixRain from "./components/MatrixRain";
import CliTerminal from "./components/CliTerminal";
import BootIntro from "./components/BootIntro";

export default function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState(null);
  const [matrixOn, setMatrixOn] = useState(true);
  const [cliOpen, setCliOpen] = useState(false);
  const [bootDone, setBootDone] = useState(false);
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

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      showToast(
        "Message sent successfully! I'll get back to you soon.",
        "success",
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      showToast(
        "Failed to send message. Please try again or email me directly.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const projects = [
    {
      title: "Python/React E-commerce including API",
      desc: "API-driven backend using Django REST Framework with React frontend and Redux state management. Custom admin panel for product, order, and user management.",
      tech: ["React", "Django REST", "PostgreSQL"],
      link: "https://ecommercepy.vercel.app/",
    },
    {
      title: "Travel & Hospital Embed Booking System",
      desc: "Created embeddable booking widgets with REST APIs and payment integration. Admin panel for managing bookings, hospitals, and payment workflows.",
      tech: ["Laravel", "REST API", "MySQL"],
      link: "https://github.com/kaflebiplob/travel_hospital_embed",
    },
    {
      title: "Bus Ticketing System",
      desc: "Implemented real-time seat availability tracking and secure booking system with payment integration.",
      tech: ["Laravel", "MySQL", "JavaScript"],
      link: "https://github.com/kaflebiplob/busticketingsystem",
    },
    {
      title: "ABI E-commerce Platform",
      desc: "Product management system with categorization, ordering, and admin tools featuring clean, scalable architecture.",
      tech: ["Laravel 11", "Bootstrap", "MySQL"],
      link: "https://github.com/kaflebiplob/ABI",
    },
  ];

  const skillGroups = [
    {
      dir: "Languages_&_Frontend/",
      items: ["javascript", "react", "html5", "css3", "tailwindcss"],
    },
    {
      dir: "Backend/",
      items: ["python", "django", "fastapi", "php", "laravel", "rest-apis"],
    },
    {
      dir: "Databases/",
      items: ["mysql", "postgresql"],
    },
    {
      dir: "Cloud_&_Tools/",
      items: ["aws", "git", "github", "ngrok", "webhooks", "redis"],
    },
  ];

  const experience = [
    {
      title: "Junior Full Stack Developer",
      company: "Smart Solar Corporation",
      period: "Dec 2025 - Present",
      description:
        "Working on Japanese webapps and related software solutions including ngrok, webhooks, redis as well as REST APIs. Involved in full software development lifecycle from design to deployment.",
      hash: "c4d90ef",
    },
    {
      title: "Junior Developer",
      company: "Afore Solutions",
      period: "Jun 2025 - Jan 2026",
      description:
        "Developed and integrated scalable REST APIs for production. Performed backend optimization, debugging, and comprehensive QA testing.",
      hash: "a3f8c2d",
    },
    {
      title: "Junior Laravel Developer (Contract Based)",
      company: "Mirrai Tech",
      period: "May 2025 - Jun 2025",
      description:
        "Built and maintained Laravel-based applications and admin dashboards. Improved application performance and ensured cross-browser compatibility.",
      hash: "f5a43b1",
    },
    {
      title: "Intern",
      company: "SoftNEP Pvt. Ltd.",
      period: "Jan 2025 - May 2025",
      description:
        "Gained hands-on experience with full-stack development in production environment. Worked with professional MVC architecture and modern workflows.",
      hash: "d910fe3",
    },
  ];

  const navItems = [
    { key: "home", label: "whoami" },
    { key: "skills", label: "skills/" },
    { key: "projects", label: "git log" },
    { key: "contact", label: "contact" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e14] text-green-400 font-mono-term crt-scanlines relative">
      <MatrixRain active={matrixOn} />
      <CliTerminal
        open={cliOpen}
        onClose={() => setCliOpen(false)}
        onNavigate={scrollTo}
      />

      {toast && (
        <div className="fixed top-20 right-4 z-80 animate-in slide-in-from-top-5 duration-300">
          <div
            className={`flex items-center gap-3 px-5 py-3 rounded border-2 font-mono-term text-sm ${
              toast.type === "success"
                ? "bg-black border-green-500 text-green-400"
                : "bg-black border-red-500 text-red-400"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="shrink-0" size={20} />
            ) : (
              <AlertCircle className="shrink-0" size={20} />
            )}
            <p>{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              className="ml-2 hover:opacity-70 transition-opacity"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-green-500/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="font-bold text-sm sm:text-base text-green-400 text-glow"
          >
            &gt; biplob@dev<span className="terminal-cursor"></span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.key)}
                className={`text-sm transition-colors ${
                  active === item.key
                    ? "text-green-300 text-glow"
                    : "text-green-600 hover:text-green-400"
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => setCliOpen(true)}
              title="Open CLI"
              className="flex items-center gap-1 text-xs px-2 py-1 border border-green-500/40 rounded text-green-400 hover:bg-green-500/10 transition-colors"
            >
              <TerminalSquare size={14} /> CLI
            </button>

            <button
              onClick={() => setMatrixOn((v) => !v)}
              title="Toggle matrix rain"
              className="flex items-center gap-1 text-xs px-2 py-1 border border-green-500/40 rounded text-green-400 hover:bg-green-500/10 transition-colors"
            >
              <Zap size={14} /> {matrixOn ? "ON" : "OFF"}
            </button>

            <a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-green-500 text-green-400 text-sm font-semibold hover:bg-green-500/10 transition-all"
            >
              📄 RESUME.pdf ↓
            </a>
          </div>

          <button
            className="md:hidden p-2 text-green-400"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-green-500/30 bg-black">
            <div className="px-4 py-3 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollTo(item.key)}
                  className="text-left py-2 px-3 rounded hover:bg-green-500/10 transition text-green-400"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setCliOpen(true);
                  setMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded hover:bg-green-500/10 transition text-green-400"
              >
                ⚡ open CLI
              </button>
              <a
                href={CV}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left py-2 px-3 rounded border border-green-500/40 text-green-400"
              >
                📄 RESUME.pdf ↓
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <header
        ref={homeRef}
        className="relative z-10 min-h-screen flex items-center justify-center pt-24 px-4"
      >
        <div
          className={`max-w-3xl mx-auto w-full transform transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="rounded-lg border border-slate-700/50 bg-[#0d1117]/90 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border-b border-slate-700/50">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-slate-500">biplob@dev: ~</span>
              <span className="ml-auto text-[10px] text-slate-600 hidden sm:inline">
                [Ctrl + ~ for full CLI]
              </span>
            </div>

            <div className="p-5 sm:p-8">
              <BootIntro onDone={() => setBootDone(true)} />

              {bootDone && (
                <div className="animate-in fade-in duration-500 mt-8">
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 border-l-2 border-green-500/30 pl-4">
                    Full-stack developer with expertise in Python and PHP,
                    building scalable web applications and REST APIs. I focus on
                    writing clean code, improving performance, and following
                    industry-standard workflows.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <button
                      onClick={() => scrollTo("projects")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded border border-green-500 bg-green-500/10 text-green-300 hover:bg-green-500/20 transition-all text-sm font-semibold"
                    >
                      ./view-projects.sh <ArrowRight size={14} />
                    </button>
                    <button
                      onClick={() => scrollTo("contact")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded border border-orange-400/50 text-orange-400 hover:bg-orange-400/10 transition-all text-sm font-semibold"
                    >
                      <Mail size={14} /> $ send --message
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href="https://github.com/kaflebiplob/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-slate-700/60 rounded text-slate-300 hover:text-green-400 hover:border-green-500/50 transition-all"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/biplob-kafle-56b16925a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-slate-700/60 rounded text-slate-300 hover:text-green-400 hover:border-green-500/50 transition-all"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="https://www.facebook.com/biplop.kafle"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-slate-700/60 rounded text-slate-300 hover:text-green-400 hover:border-green-500/50 transition-all"
                    >
                      <Facebook size={20} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-green-600 text-xs mt-6">
            ↓ scroll to explore_
          </p>
        </div>
      </header>

      {/* SKILLS */}
      <section ref={skillsRef} className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-green-500 text-sm mb-2">
            biplob@dev:~$ <span className="text-green-300">ls -la skills/</span>
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-300 text-glow mb-10">
            # Skills &amp; Experience
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg border border-slate-700/50 bg-[#0d1117]/90 p-5 sm:p-6">
              <h3 className="text-green-400 font-bold mb-4 text-sm sm:text-base">
                📁 drwxr-xr-x skills/
              </h3>
              <div className="space-y-4">
                {skillGroups.map((g, idx) => (
                  <div key={idx}>
                    <p className="text-green-300 text-sm font-semibold mb-1">
                      ├── 📁 {g.dir}
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm pl-6 leading-relaxed">
                      {g.items.join("  ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-700/50 bg-[#0d1117]/90 p-5 sm:p-6">
              <h3 className="text-green-400 font-bold mb-4 text-sm sm:text-base">
                $ git log --oneline --author=experience
              </h3>
              <div className="space-y-5">
                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 border-slate-700/50 pl-4"
                  >
                    <p className="text-green-500 text-xs">
                      ● commit {exp.hash}
                    </p>
                    <p className="text-green-300 font-semibold text-sm sm:text-base mt-1">
                      {exp.title}
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm">
                      {exp.company} · {exp.period}
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section ref={projectsRef} className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-green-500 text-sm mb-2">
            biplob@dev:~${" "}
            <span className="text-green-300">git log --oneline --all</span>
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-300 text-glow mb-10">
            # Featured Projects
          </h2>

          <div className="space-y-6">
            {projects.map((p, i) => (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-slate-700/50 bg-[#0d1117]/90 p-5 sm:p-6 hover:border-green-500/50 hover:bg-[#0d1117] transition-all"
              >
                <p className="text-green-500 text-xs">
                  ● commit {(9000 + i * 137).toString(16)}
                </p>
                <h3 className="text-green-300 font-bold text-lg sm:text-xl mt-1 group-hover:text-glow">
                  {i + 1}. {p.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded text-xs border border-slate-700/60 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-orange-400 text-sm font-semibold inline-flex items-center gap-1">
                  View Repo ↗
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        ref={contactRef}
        className="relative z-10 py-20 px-4 flex items-center justify-center"
      >
        <div className="max-w-xl mx-auto w-full">
          <p className="text-green-500 text-sm mb-2">
            biplob@dev:~${" "}
            <span className="text-green-300">send --message --to=biplob</span>
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-300 text-glow mb-2">
            # Let's Work Together
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Have a project in mind? Drop a message below.
          </p>

          <div className="rounded-lg border border-slate-700/50 bg-[#0d1117]/90 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border-b border-slate-700/50">
              <span className="text-xs text-slate-500">compose-message.sh</span>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  &gt; From (your name):
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full px-3 py-2 bg-black/60 border rounded text-green-300 text-sm placeholder-slate-600 focus:outline-none ${
                    formErrors.name
                      ? "border-red-500"
                      : "border-slate-700/60 focus:border-green-400"
                  }`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  &gt; Reply-to (your email):
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={`w-full px-3 py-2 bg-black/60 border rounded text-green-300 text-sm placeholder-slate-600 focus:outline-none ${
                    formErrors.email
                      ? "border-red-500"
                      : "border-slate-700/60 focus:border-green-400"
                  }`}
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  &gt; Message:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  rows="5"
                  className={`w-full px-3 py-2 bg-black/60 border rounded text-green-300 text-sm placeholder-slate-600 focus:outline-none resize-none ${
                    formErrors.message
                      ? "border-red-500"
                      : "border-slate-700/60 focus:border-green-400"
                  }`}
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 border border-orange-400/50 bg-orange-400/10 hover:bg-orange-400/20 text-orange-400 rounded font-semibold transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "sending..." : "$ send --message ↵"}
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-8 text-sm">
            <a
              href="https://github.com/kaflebiplob/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-green-400 transition-colors"
            >
              $ open github.com/kaflebiplob ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-10 text-center border-t border-slate-700/50 text-slate-500 text-xs sm:text-sm">
        <div className="flex justify-center gap-4 mb-5">
          <a
            href="https://github.com/kaflebiplob/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-3 border border-slate-700/60 rounded text-slate-300 hover:text-green-400 hover:border-green-500/50 transition-all"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/biplob-kafle-56b16925a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-3 border border-slate-700/60 rounded text-slate-300 hover:text-green-400 hover:border-green-500/50 transition-all"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://www.facebook.com/biplop.kafle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-3 border border-slate-700/60 rounded text-slate-300 hover:text-green-400 hover:border-green-500/50 transition-all"
          >
            <Facebook size={18} />
          </a>
        </div>
        <p>
          © 2023-2026 Biplob Kafle. Not a person, a process — always building.
        </p>
      </footer>
    </div>
  );
}
