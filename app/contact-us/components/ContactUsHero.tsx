import { Clock, Globe, Users } from "lucide-react";

const chips = [
  { icon: Clock, label: "Replies within 1 business day" },
  { icon: Globe, label: "Serving 12+ countries" },
  { icon: Users, label: "Remote-first team" },
];

export default function ContactUsHero() {
  return (
    <section
      className="relative overflow-hidden mb-6 pt-10 pb-10 text-center sm:mb-10 sm:pt-14 sm:pb-14"
      data-aos="fade-up"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[320px] w-[560px] -translate-x-1/2 rounded-full bg-teal-500/[0.1] blur-[120px] animate-glow-pulse" />
        <div
          className="absolute right-6 top-6 hidden h-28 w-28 opacity-30 sm:block"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(45,212,191,0.5) 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="absolute left-6 bottom-2 hidden h-24 w-24 opacity-25 sm:block"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(45,212,191,0.45) 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />
      </div>

      <span className="eyebrow">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
        </span>
        Contact Us
      </span>

      <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
        <span className="text-gradient-light">Let&apos;s start a</span>{" "}
        <span className="text-gradient-teal">conversation</span>
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-silver sm:text-base lg:text-lg">
        We work remotely with a team of freelancers. Reach out — we&apos;d love to hear about your
        idea and help bring it to life.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {chips.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-silver-light transition-colors duration-300 hover:border-teal-400/40 hover:text-white sm:text-sm"
          >
            <Icon className="h-4 w-4 text-teal-300" />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
