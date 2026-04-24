import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import azure from "@/assets/logo-azure.png";
import tableau from "@/assets/logo-tableau.png";
import postgres from "@/assets/logo-postgres-clean.png";
import snowflake from "@/assets/logo-snowflake-clean.png";
import databricks from "@/assets/logo-databricks-clean.png";
import python from "@/assets/logo-python.png";
import hive from "@/assets/logo-hive.png";
import hadoop from "@/assets/logo-hadoop.png";
import excel from "@/assets/logo-excel.png";
import copilot from "@/assets/app-page-logo_copilot.png";
import claude from "@/assets/logo-claude.svg";

// Each logo keeps its own real aspect ratio.
const logos = [
  { src: python,     label: "Python",      ratio: 1   },
  { src: azure,      label: "Azure",       ratio: 1   },
  { src: snowflake,  label: "Snowflake",   ratio: 1   },
  { src: databricks, label: "Databricks",  ratio: 1   },
  { src: postgres,   label: "PostgreSQL",  ratio: 1   },
  { src: tableau,    label: "Tableau",     ratio: 1.5 },
  { src: hive,       label: "Apache Hive", ratio: 1.2 },
  { src: hadoop,     label: "Hadoop",      ratio: 1.5 },
  { src: excel,      label: "Excel",       ratio: 1   },
  { src: copilot,    label: "Copilot",     ratio: 1   },
  { src: claude,     label: "Claude",      ratio: 1   },
];

const INTERVAL = 1000;

const Index = () => {
  const [i, setI] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const m = requestAnimationFrame(() => setMounted(true));
    const id = setInterval(() => setI((p) => (p + 1) % logos.length), INTERVAL);
    return () => {
      cancelAnimationFrame(m);
      clearInterval(id);
    };
  }, []);

  const current = logos[i];
  const BASE_W = 280; // px – the visual "anchor" width

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 30%, hsl(340 60% 82% / 0.5), transparent 55%), radial-gradient(ellipse at 30% 70%, hsl(15 55% 85% / 0.4), transparent 50%), radial-gradient(ellipse at 70% 75%, hsl(168 30% 78% / 0.3), transparent 45%)",
        }}
      />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Logo stage – click to enter portfolio */}
        <div
          className="relative flex items-center justify-center cursor-pointer group"
          style={{ height: BASE_W, width: "100%" }}
          onClick={() => navigate("/portfolio")}
          title="Enter portfolio"
        >
          {logos.map((l, idx) => {
            const active = idx === i;
            const w = BASE_W * l.ratio;
            const h = BASE_W;
            return (
              <img
                key={idx}
                src={l.src}
                alt={l.label}
                width={w}
                height={h}
                className="absolute"
                style={{
                  width: w,
                  height: h,
                  objectFit: "contain",
                  opacity: active && mounted ? 1 : 0,
                  transform: active
                    ? "scale(1) rotate(0deg)"
                    : "scale(0.85) rotate(-4deg)",
                  filter: active ? "blur(0px)" : "blur(10px)",
                  transition:
                    "opacity 400ms cubic-bezier(.4,0,.2,1), transform 500ms cubic-bezier(.2,.8,.2,1), filter 380ms ease",
                }}
              />
            );
          })}
        </div>

        {/* Caption that swaps with the logo */}
        <div className="mt-8 h-7 overflow-hidden">
          <p
            key={current.label}
            className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground animate-fade-in"
          >
            {current.label}
          </p>
        </div>

        <h1
          className="mt-6 text-center text-4xl font-semibold tracking-tight md:text-6xl"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 800ms ease 400ms, transform 800ms ease 400ms",
          }}
        >
          Business-Driven Data Solutions!
        </h1>
        <p
          className="mt-4 max-w-xl text-center text-lg text-muted-foreground md:text-xl"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 800ms ease 700ms",
          }}
        >
          Built by understanding the domain first, then choosing the tools that best fit the need.
        </p>

        {/* Click hint */}
        <p
          className="mt-10 text-xs uppercase tracking-[0.2em] text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          onClick={() => navigate("/portfolio")}
        >
          Click to explore ↓
        </p>

        {/* Progress dots */}
        <div className="mt-4 flex gap-2">
          {logos.map((_, idx) => (
            <span
              key={idx}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: idx === i ? 24 : 8,
                background:
                  idx === i
                    ? "hsl(340 52% 62%)"
                    : "hsl(340 18% 18% / 0.2)",
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
