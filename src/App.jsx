import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ArrowRight, Award, Briefcase, Code, ExternalLink, Github, Linkedin, Mail, Menu } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      title: "Ecommerce Platform",
      description:
        "A full-stack shopping with cart functionalities and payment integration",
      tech: ["react", "python", "postgress SQL"],
      color: "blue",
    },
    {
      title: "Embeded Booking System",
      description: "Embeded Booking system",
      tech: ["laravel", "blade", "mysql"],
    },
    {
      title: "Weather Dashboard",
      description: "Collaborative workspace with real time updates",
      tech: ["react", "django"],
    },
  ];
  const skills = [
    {
      name: "React",
      level: 70,
      color: "bg-blue-500",
    },
    {
      name: "django",
      level: 70,
      color: "bg-blue-500",
    },
    {
      name: "laravel",
      level: 70,
      color: "bg-blue-500",
    },
    {
      name: "jquery",
      level: 60,
      color: "bg-blue-500",
    },
  ];
  const scrollToSection = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      green:
        "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      purple:
        "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            John Doe
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {["Home", "Projects", "Skills", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold relative group ${
                  activeSection === item.toLowerCase() ? "text-blue-600" : ""
                }`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 p-2 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-xl">
            <div className="flex flex-col px-4 py-3">
              {["Home", "Projects", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-semibold py-3 px-3 rounded-lg"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div
          className={`text-center max-w-5xl mx-auto w-full transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl sm:text-5xl font-bold shadow-2xl animate-pulse">
                JD
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
            Hi, I'm{" "}
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              John Doe
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4 px-4 font-medium">
            Full Stack Developer & Creative Problem Solver
          </p>
          <p className="text-base sm:text-lg text-gray-500 mb-8 px-4 max-w-2xl mx-auto">
            Crafting beautiful, functional web experiences with modern
            technologies
          </p>
          <div className="flex gap-4 justify-center mb-10">
            <a
              href="#"
              className="p-4 bg-linear-to-br from-gray-800 to-gray-900 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl"
            >
              <Github size={24} />
            </a>
            <a
              href="#"
              className="p-4 bg-linear-to-br from-gray-800 to-gray-900 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="p-4 bg-linear-to-br from-gray-800 to-gray-900 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl"
            >
              <Mail size={24} />
            </a>
          </div>
          <button
            onClick={() => scrollToSection("projects")}
            className="group px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto text-base sm:text-lg transform hover:scale-105"
          >
            View My Work
            <ArrowRight
              className="group-hover:translate-x-2 transition-transform"
              size={20}
            />
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold mb-4">
              <Briefcase size={18} />
              <span>My Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Featured Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Here are some of my recent works that showcase my skills and
              passion for development
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-5">
                  <div
                    className={`p-3 bg-linear-to-br ${getColorClasses(
                      project.color
                    )} rounded-xl shadow-md`}
                  >
                    <Code className="text-white" size={28} />
                  </div>
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <ExternalLink size={22} />
                  </button>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-5 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-linear-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold mb-4">
              <Award size={18} />
              <span>Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Skills & Technologies
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Tools and technologies I use to bring ideas to life
            </p>
          </div>
          <div className="space-y-8">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between mb-3">
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {skill.name}
                  </span>
                  <span className="text-gray-700 font-bold">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full ${skill.color} rounded-full transition-all duration-1000 shadow-md`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Let's Work Together
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 px-4">
            Have a project in mind? Drop me a message and let's create something
            amazing!
          </p>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-100">
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-5 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-5 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-sm sm:text-base"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full px-5 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all resize-none text-sm sm:text-base"
              ></textarea>
              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-200 bg-white">
        <p className="text-gray-600 text-sm sm:text-base">
          © 2023-2025 Biplob Kafle
        </p>
      </footer>
    </div>
  );
}
