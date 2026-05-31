"use client";

import Image from "next/image";
import { ExternalLink, Calendar, Users, Code2, CheckCircle2, ArrowRight, LucideIcon } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    detailedDescription: string;
    image: string;
    link: string;
    technologies: string[];
    category: string;
    features: string[];
    duration: string;
    client: string;
    icon: LucideIcon;
    color: string;
  };
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function ProjectCard({ project, index, isExpanded, onToggleExpand }: ProjectCardProps) {
  const IconComponent = project.icon;

  return (
    <div
      className="group"
      data-aos="zoom-in"
      data-aos-delay={index * 80}
    >
      <div className="glass-card beam-border rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto min-h-[400px] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* gradient veil to blend image into the dark card */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:bg-gradient-to-r" />
            <div className="absolute top-6 left-6 z-10">
              <div className="flex items-center gap-2 rounded-lg border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-teal-300 shadow-lg backdrop-blur">
                <IconComponent className="w-4 h-4" />
                <span className="font-bold text-sm">{project.category}</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="h-px w-full bg-gradient-to-r from-teal-400/60 via-teal-500/30 to-transparent" />
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                  {project.title}
                </h2>
                <p className="text-silver text-base sm:text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-5 h-5 text-teal-300" />
                  <h3 className="font-bold text-silver-light text-sm uppercase tracking-wide">Technologies</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 border border-white/10 bg-white/[0.04] text-silver-light text-xs font-semibold rounded-md transition-colors hover:border-teal-400/30 hover:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-silver-dark">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-300/80" />
                  <span className="font-semibold">{project.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-300/80" />
                  <span className="font-semibold">{project.client}</span>
                </div>
              </div>

              {isExpanded && (
                  <div
                    className="overflow-hidden mb-6"
                  >
                    <div className="pt-6 border-t border-white/10">
                      <h3 className="font-bold text-white mb-3 text-lg">Project Details</h3>
                      <p className="text-silver leading-relaxed mb-6">
                        {project.detailedDescription}
                      </p>
                      <div>
                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-teal-300" />
                          Key Features
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {project.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-teal-300 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-silver-light">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              <div className="flex flex-wrap gap-3 mt-auto pt-6">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-lg shadow-lg shadow-teal-500/25 transition-all hover:from-teal-400 hover:to-teal-500 hover:scale-105 active:scale-95"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={onToggleExpand}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/15 bg-white/[0.06] text-white font-bold rounded-lg backdrop-blur transition-all hover:border-teal-400/50 hover:bg-white/[0.1] hover:scale-105 active:scale-95"
                >
                  <span>{isExpanded ? "Show Less" : "View Details"}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
