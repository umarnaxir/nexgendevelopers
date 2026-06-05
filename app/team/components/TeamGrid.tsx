"use client";

import { teamMembers } from "../data";
import TeamCard from "./TeamCard";

export default function TeamGrid() {
  return (
    <section className="pb-8 sm:pb-10" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
