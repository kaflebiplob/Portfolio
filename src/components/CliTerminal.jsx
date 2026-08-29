import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const HELP_TEXT = `Available commands:
  help          show this list
  whoami        who am I?
  skills        list my tech stack
  projects      list featured projects
  contact       how to reach me
  neofetch      system info
  sudo hire     ...
  clear         clear the screen
  exit          close this terminal`;

export default function CliTerminal({ open, onClose, onNavigate }) {
  const [lines, setLines] = useState([
    "Devshell v1.0.0 (x86_64-pc-portfolio)",
    "Type 'help' for a list of available commands.",
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = (cmdRaw) => {
    const cmd = cmdRaw.trim().toLowerCase();
    const echo = `biplob@dev:~$ ${cmdRaw}`;

    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "exit") {
      setLines((l) => [...l, echo, "logging out..."]);
      setTimeout(onClose, 400);
      return;
    }

    let out;
    switch (cmd) {
      case "":
        out = "";
        break;
      case "help":
        out = HELP_TEXT;
        break;
      case "whoami":
        out =
          "Biplob Kafle — Full-Stack Developer\nBuilding scalable web apps with Python, PHP & React.";
        break;
      case "skills":
        out =
          "JavaScript, Python/Django, FastAPI, PHP/Laravel, React, REST APIs, MySQL/PostgreSQL, AWS";
        setTimeout(() => onNavigate?.("skills"), 900);
        break;
      case "projects":
        out = "Loading project list above ↑ (scroll to git-log section)";
        setTimeout(() => onNavigate?.("projects"), 900);
        break;
      case "contact":
        out = "Opening contact form...";
        setTimeout(() => onNavigate?.("contact"), 900);
        break;
      case "neofetch":
        out = [
          "        /\\_/\\       biplob@dev",
          "       ( o.o )      -----------",
          "        > ^ <       OS: PortfolioOS",
          "                    Shell: devshell 1.0",
          "                    Stack: React + Tailwind",
          "                    Uptime: always building",
        ].join("\n");
        break;
      case "sudo hire":
        out = "Permission granted.  Scroll to contact and send a message!";
        onNavigate?.("contact");
        break;
      default:
        out = `command not found: ${cmd}. Type 'help' for options.`;
    }

    setLines((l) => [...l, echo, ...(out ? [out] : [])]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-2xl rounded-lg border border-green-500/40 bg-black shadow-[0_0_40px_rgba(34,197,94,0.25)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-green-950/40 border-b border-green-500/30">
          <span className="text-green-400 text-xs sm:text-sm font-mono">
            devshell — biplob@dev: ~
          </span>
          <button
            onClick={onClose}
            className="text-green-400 hover:text-red-400 transition-colors"
            aria-label="close terminal"
          >
            <X size={16} />
          </button>
        </div>

        <div
          className="h-80 sm:h-96 overflow-y-auto px-4 py-3 font-mono text-xs sm:text-sm text-green-400 whitespace-pre-wrap"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith("biplob@dev")
                  ? "text-green-300"
                  : "text-green-500/90"
              }
            >
              {line}
            </div>
          ))}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-green-300">biplob@dev:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
