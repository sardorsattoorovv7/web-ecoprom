import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PremiumBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const lines = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* DOTTED GRID */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(100,116,139,0.28) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0",
        }}
      />

      {/* PARALLAX WRAPPER */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${mouse.x * 0.18}px, ${mouse.y * 0.18}px)`,
        }}
      >
        {/* VERTICAL PERSPECTIVE LINES */}
        {lines.map((i) => {
          const angle = (i - 9) * 6;
          const delay = i * 0.12;

          return (
            <motion.div
              key={`v-${i}`}
              className="absolute left-1/2 top-[34%] origin-top will-change-transform"
              style={{
                width: "1px",
                height: "120vh",
                transform: `translateX(-50%) rotate(${angle}deg)`,
                background:
                  "linear-gradient(to bottom, rgba(148,163,184,0.02), rgba(148,163,184,0.24), rgba(148,163,184,0.02))",
              }}
              initial={{ opacity: 0.08, scaleY: 0.92, y: 30 }}
              animate={{
                opacity: [0.08, 0.28, 0.08],
                scaleY: [0.92, 1.04, 0.92],
                y: [30, -40, 30],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "linear",
                delay,
              }}
            />
          );
        })}

        {/* HORIZONTAL MOVING LINES */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-1/2 w-[140vw] -translate-x-1/2"
            style={{
              top: `${36 + i * 7}%`,
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(148,163,184,0.22), transparent)",
            }}
            initial={{ opacity: 0.04, y: 35 }}
            animate={{
              opacity: [0.04, 0.18, 0.04],
              y: [35, -90, 35],
            }}
            transition={{
              duration: 5 + i * 0.35,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.25,
            }}
          />
        ))}
      </div>

      {/* GLOWS */}
      <div className="absolute left-1/2 top-[30%] h-[240px] w-[760px] -translate-x-1/2 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="absolute right-[18%] top-[42%] h-[180px] w-[420px] rounded-full bg-sky-200/20 blur-3xl" />

      {/* PARTICLES */}
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute h-[2px] w-[2px] rounded-full bg-emerald-400/35"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.65, 0],
            y: [0, -40, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3.5 + Math.random() * 2.5,
            repeat: Infinity,
            delay: i * 0.28,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* SOFT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/05 to-white/75" />
    </div>
  );
}