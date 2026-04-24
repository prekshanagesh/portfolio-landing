import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Briefcase, Award } from "lucide-react";
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

const titles = [
  "Data Engineer",
  "Analytics Engineer",
  "Data Analyst",
  "Business Intelligence Analyst",
];

const skills = [
  { src: python,     label: "Python" },
  { src: azure,      label: "Azure" },
  { src: snowflake,  label: "Snowflake" },
  { src: databricks, label: "Databricks" },
  { src: postgres,   label: "PostgreSQL" },
  { src: tableau,    label: "Tableau" },
  { src: hive,       label: "Apache Hive" },
  { src: hadoop,     label: "Hadoop" },
  { src: excel,      label: "Excel" },
  { src: copilot,    label: "Copilot" },
  { src: claude,     label: "Claude" },
];

const projects = [
  {
    title: "Agentic AI News Digest & Personalization Pipeline",
    description:
      "An AI agent that fetches 100+ daily news articles, uses Claude to select and summarize the 5 most relevant stories, and delivers them as a personalized email digest every morning. The system learns from every link you click — continuously improving what it surfaces over time.",
    tech: ["Python", "Claude API (Anthropic)", "PostgreSQL"],
    link: "https://github.com/prekshanagesh/news-digest-agent",
    inProgress: false,
  },
  {
    title: "Flight Delay Prediction Pipeline",
    description:
      "Built an end-to-end data pipeline to ingest, clean, and transform U.S. DOT flight data into a machine learning-ready dataset using incremental ETL techniques. Trained and evaluated classification models using scikit-learn pipelines.",
    tech: ["Python", "SQL"],
    link: null,
    inProgress: true,
  },
  {
    title: "Data Platform Strategy for Autonomous EV Analytics",
    description:
      "Designed a global Azure lakehouse strategy for FluiDrive to manage petabyte-scale EV telemetry, sensor, and customer data across multiple regions. Proposed real-time analytics, ML retraining, governance, and compliance frameworks to improve safety, operations, customer experience, and AI-driven decisions.",
    tech: ["Azure Data Factory", "Azure Databricks", "Azure Lakehouse", "Medallion Architecture", "Data Governance"],
    link: "https://github.com/prekshanagesh/azure-data-platform",
    inProgress: false,
  },
];

const timeline = [
  {
    period: "2017 – 2021",
    title: "Bachelor of Engineering",
    subtitle: "Computer Science & Engineering",
    type: "education" as const,
    skills: [],
    link: null,
  },
  {
    period: "2021 – 2023",
    title: "Data Engineering Associate",
    subtitle: "Accenture",
    type: "work" as const,
    skills: ["Hadoop", "HiveQL", "Git", "Team-building"],
    link: null,
    impact: "Analyzed 45+ Hadoop source tables totaling 22.5M+ records across large-scale marketing and finance datasets.",
  },
  {
    period: "2023 – 2024",
    title: "Data Engineering, Management & Governance Analyst",
    subtitle: "Accenture",
    type: "work" as const,
    skills: ["SQL", "Cloud Migration", "Azure Data Factory", "Snowflake", "Databricks"],
    link: null,
    impact: "Built end-to-end ETL pipeline in Azure Data Factory for over 8 GB of raw data incoming every day.",
  },
  {
    period: "July 2024",
    title: "Microsoft Certified: Azure Data Fundamentals",
    subtitle: "Microsoft",
    type: "certification" as const,
    skills: [],
    link: "https://learn.microsoft.com/api/credentials/share/en-us/NageshPreksha-0094/1C6E610129238C5D?sharingId=980FAB230A99ED3D",
  },
  {
    period: "2024 – 2026",
    title: "Master of Science",
    subtitle: "Information Technology & Management",
    type: "education" as const,
    skills: [],
    link: null,
    achievements: [
      "Recipient of UT Dallas JSOM Dean's Excellence Scholarship — Fall 2024",
      "Recipient of UT Dallas JSOM Lars Magnus Ericsson Fellowship in Management — Fall 2025",
    ],
  },
  {
    period: "Sept – Nov 2025",
    title: "Data & AI Intern",
    subtitle: "Inogen",
    type: "work" as const,
    skills: ["SQL", "Cross-functional Collaboration", "Snowflake", "Tableau"],
    link: null,
    impact: "Analyzed 2M+ device log records from 2,000+ portable oxygen concentrators and developed SQL-based classification logic to automatically identify device operating states.",
  },
  {
    period: "December 2025",
    title: "SnowPro Associate: Platform",
    subtitle: "Snowflake",
    type: "certification" as const,
    skills: [],
    link: "https://achieve.snowflake.com/a4c1bf9c-9825-4eb5-a1c8-40eefcf7c8ed#acc.RbXszSGV",
  },
];

const TimelineCard = ({ item }: { item: typeof timeline[number] }) => (
  <div className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm hover:shadow-md transition-shadow w-full max-w-xs">
    <p className="text-xs font-semibold text-primary mb-1">{item.period}</p>
    {item.link ? (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-bold leading-snug hover:text-primary transition-colors underline underline-offset-2"
      >
        {item.title} ↗
      </a>
    ) : (
      <h3 className="text-sm font-bold leading-snug">{item.title}</h3>
    )}
    <p className="text-xs text-muted-foreground mt-0.5 mb-2">{item.subtitle}</p>
    {"impact" in item && item.impact && (
      <p className="text-xs leading-relaxed text-foreground/70 mb-2">{item.impact}</p>
    )}
    {"achievements" in item && Array.isArray(item.achievements) && item.achievements.length > 0 && (
      <ul className="mb-2 space-y-1">
        {(item.achievements as string[]).map((a) => (
          <li key={a} className="flex items-start gap-1.5 text-xs leading-relaxed text-foreground/70">
            <span className="mt-0.5 shrink-0 text-primary">★</span>
            {a}
          </li>
        ))}
      </ul>
    )}
    {item.skills.length > 0 && (
      <div className="flex flex-wrap gap-1">
        {item.skills.map((s) => (
          <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
            {s}
          </span>
        ))}
      </div>
    )}
  </div>
);

const Portfolio = () => {
  const [titleIdx, setTitleIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const m = requestAnimationFrame(() => setMounted(true));
    const id = setInterval(() => setTitleIdx((p) => (p + 1) % titles.length), 1200);
    return () => {
      cancelAnimationFrame(m);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Watercolour background blobs — fixed so they persist while scrolling */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 80% 15%, hsl(340 60% 82% / 0.35), transparent 50%), " +
            "radial-gradient(ellipse at 15% 75%, hsl(15 55% 85% / 0.3), transparent 50%), " +
            "radial-gradient(ellipse at 60% 55%, hsl(168 30% 78% / 0.2), transparent 45%)",
        }}
      />

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight hover:text-primary transition-colors"
          >
            Preksha Nagesh
          </Link>
          <div className="flex gap-6 text-sm text-muted-foreground">
            {["About", "Journey", "Skills", "Projects", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="hover:text-foreground transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero / About ── */}
      <section id="about" className="relative mx-auto max-w-5xl px-6 py-28 text-center">
        <p
          className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-primary"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 600ms ease 100ms",
          }}
        >
          Professional Portfolio
        </p>

        <h1
          className="text-5xl font-bold tracking-tight md:text-7xl"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 700ms ease 200ms, transform 700ms ease 200ms",
          }}
        >
          Preksha Nagesh
        </h1>

        {/* Animated title */}
        <div className="mt-4 h-10 overflow-hidden">
          <p
            key={titleIdx}
            className="text-2xl font-medium text-primary animate-fade-in md:text-3xl"
          >
            {titles[titleIdx]}
          </p>
        </div>

        <p
          className="mt-6 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 700ms ease 500ms",
          }}
        >
          I have built end-to-end data solutions across marketing and operations domain. 

          I’m passionate about working across industries to understand how each domain uses data differently, then mapping the right technical solution to the actual business need. 
          
          I use AI and prompt engineering to improve efficiency, learn unfamiliar domains faster, and expand my skillset through hands-on projects like building this portfolio website.

        </p>

        <div
          className="mt-8 flex flex-wrap gap-4 justify-center"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 700ms ease 700ms",
          }}
        >
          <a
            href="#projects"
            className="rounded-full bg-primary px-7 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            View Projects
          </a>
          <a
            href="https://www.linkedin.com/in/prekshan/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </section>

      {/* ── Career Journey Timeline ── */}
      <section id="journey" className="py-16 px-6 bg-secondary/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-center">Career Journey</h2>
          <p className="mt-2 mb-10 text-primary text-center">
            Education and experience milestones along the way.
          </p>

          <div className="relative">
            {/* Winding SVG path behind the nodes */}
            <svg
              className="absolute left-1/2 top-0 -translate-x-1/2 w-24 h-full"
              viewBox="0 0 96 100"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M48 0 C12 5,12 12,48 17 C84 22,84 28,48 33 C12 38,12 45,48 50 C84 55,84 62,48 67 C12 72,12 78,48 83 C84 88,84 95,48 100"
                stroke="hsl(340 52% 62% / 0.45)"
                strokeWidth="2.5"
                strokeDasharray="6 5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Timeline items */}
            <div className="flex flex-col gap-6">
              {timeline.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={idx} className="relative flex items-center gap-0">
                    {/* Left card or spacer */}
                    <div className={`w-5/12 ${isLeft ? "pr-6 flex justify-end" : ""}`}>
                      {isLeft && (
                        <TimelineCard item={item} />
                      )}
                    </div>

                    {/* Centre node */}
                    <div className="w-2/12 flex justify-center z-10">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background shadow-md">
                        {item.type === "education" ? (
                          <GraduationCap size={16} className="text-primary" />
                        ) : item.type === "certification" ? (
                          <Award size={16} className="text-primary" />
                        ) : (
                          <Briefcase size={16} className="text-primary" />
                        )}
                      </div>
                    </div>

                    {/* Right card or spacer */}
                    <div className={`w-5/12 ${!isLeft ? "pl-6 flex justify-start" : ""}`}>
                      {!isLeft && (
                        <TimelineCard item={item} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-center">Projects</h2>
          <p className="mt-2 mb-12 text-primary font-medium text-center">
            Hands-on projects that reflect what I’ve learned and what I’m still exploring.
          </p>
          <div className="grid gap-6 md:grid-cols-4">
            {projects.map((p, index) => (
              <div
                key={p.title}
                className={`flex flex-col gap-4 rounded-2xl border border-border bg-card/80 p-7 hover:shadow-lg transition-shadow backdrop-blur-sm ${
                  index < 2 ? "md:col-span-2" : "md:col-start-2 md:col-span-2"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
                  {p.inProgress && (
                    <span className="shrink-0 rounded-full border border-amber-400/60 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                      In Progress
                    </span>
                  )}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start text-xs font-medium text-primary hover:underline underline-offset-2 transition-colors"
                  >
                    View on GitHub ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-24 px-6 bg-secondary/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-center">Tech Stack</h2>
          <p className="mt-2 mb-12 text-primary font-medium text-center">
            Tools I’ve built with, and a foundation I’m continuously expanding.
          </p>
          <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5">
            {skills.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/70 p-5 hover:shadow-md transition-shadow backdrop-blur-sm"
              >
                <img src={s.src} alt={s.label} className="h-12 w-12 object-contain" />
                <span className="text-xs font-medium text-center text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Beyond Data ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-center">Beyond Data Platform Architecture and Pipeline</h2>
          <p className="mt-2 mb-8 text-primary font-medium text-center">
            Bridging data, product thinking, and strategy through hands-on learning.
          </p>
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-muted-foreground">
              Alongside my technical experience in data engineering and analytics, my master's coursework has helped me approach data from a product and strategy perspective. Courses such as <span className="font-medium text-foreground">Technology and New Product Development</span> and <span className="font-medium text-foreground">Causal Analytics &amp; A/B Testing</span> strengthened how I think about customer needs, experimentation, product decisions, and measurable business impact.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              This combination of industry experience and classroom learning has expanded my interest in roles where data connects directly to product strategy, decision-making, and growth. I'm also open to opportunities in <span className="font-medium text-foreground">Data Strategy</span>, <span className="font-medium text-foreground">Product Analytics</span>, and data-oriented <span className="font-medium text-foreground">Product Management</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 px-6 bg-secondary/30">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
          <p className="mt-3 mb-8 max-w-md mx-auto text-muted-foreground">
            I'm actively seeking full-time Data opportunites
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/prekshan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-9 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Connect on LinkedIn ↗
            </a>
            <a
              href="mailto:preksha.nagesh@outlook.com"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-9 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Send an Email ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-6 px-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Preksha Nagesh
      </footer>
    </div>
  );
};

export default Portfolio;
