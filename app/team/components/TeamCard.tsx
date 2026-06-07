"use client";

import Image from "next/image";

interface TeamCardProps {
  member: {
    name: string;
    title: string;
    image: string;
  };
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="group" data-aos="zoom-in">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/20 light:border-gray-200 bg-gradient-to-br from-gray-900 to-black transition-all duration-300 group-hover:border-white/40 light:group-hover:border-teal-300 group-hover:-translate-y-1">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <h3 className="text-sm sm:text-lg font-bold text-white">
            {member.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300">
            {member.title}
          </p>
        </div>
      </div>
    </article>
  );
}
