
import { useEffect, useState } from "react";

const BOOT_LINES = [
  { label: "Initializing system...", type: "plain" },
  { label: "Loading profile: ", value: "Biplob Kafle...", type: "highlight" },
  { label: "Location: ", value: "Kathmandu, Nepal", type: "plain-value" },
  {
    label: "Status: ",
    value: "Full-Stack Developer @ Smart Solar Corporation",
    type: "highlight",
  },
  {
    label: "Mission: ",
    value: "Building scalable web apps that ship",
    type: "accent",
  },
];

export default function BootIntro({ onDone }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    if (visibleCount < BOOT_LINES.length) {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), 260);
      return () => clearTimeout(t);
    }
    const p = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(p);
          setTimeout(() => setShowTitle(true), 200);
          return 100;
        }
        return prev + 4;
      });
    }, 18);
    return () => clearInterval(p);
  }, [visibleCount]);

  useEffect(() => {
    if (showTitle) onDone?.();
  }, [showTitle, onDone]);

  return (
    <div>
      <div className="space-y-1.5 mb-4 text-sm sm:text-base">
        {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
          <p key={i} className="text-slate-400">
            <span className="text-slate-600">&gt; </span>
            {line.label}
            {line.value && (
              <span
                className={
                  line.type === "highlight"
                    ? "text-green-400 font-semibold"
                    : line.type === "accent"
                    ? "text-orange-400 font-semibold"
                    : "text-slate-300"
                }
              >
                {line.value}
              </span>
            )}
          </p>
        ))}

        {visibleCount >= BOOT_LINES.length && (
          <p className="text-slate-400 flex items-center gap-2">
            <span className="text-slate-600">&gt; </span>
            <span className="inline-block w-40 sm:w-56 h-3 bg-slate-800 rounded-sm overflow-hidden">
              <span
                className="block h-full bg-green-500 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </span>
            <span>{progress}% — System ready.</span>
          </p>
        )}
      </div>

      {showTitle && (
        <div className="mt-8 animate-in fade-in duration-500">
          <h1 className="glitch-title text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
            BIPLOB
          </h1>
          <p className="mt-3 text-xl sm:text-2xl text-orange-400 font-semibold">
            &gt; <span className="terminal-cursor-orange">Full-Stack Dev</span>
          </p>
        </div>
      )}
    </div>
  );
}