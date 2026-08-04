"use client";

import {
  ChevronDownIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// TODO: Migrate to using SimpleIcons
export default function Hero() {
  const contactLinks: {
    Icon: React.ComponentType<{ size: number; strokeWidth: number }>;
    href: string;
  }[] = [
    { Icon: MailIcon, href: "mailto:me@rehatsingh.com" },
    {
      Icon: LinkedinIcon,
      href: "https://www.linkedin.com/in/rehatbir-singh-4805ba193/",
    },
    {
      Icon: GithubIcon,
      href: "https://github.com/mysterycoder456/",
    },
    { Icon: InstagramIcon, href: "https://www.instagram.com/rehat.singh_/" },
  ];

  const photoSize = 300;
  const [showScrollLabel, setShowScrollLabel] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", (_ev) => {
      setShowScrollLabel(window.pageYOffset < 50);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse gap-4 md:gap-8 xl:gap-16 md:flex-row justify-center md:justify-between items-center h-full">
        <div className="flex flex-col gap-2 text-muted">
          <h1 className="text-primary text-center md:text-start">
            Rehatbir Singh
          </h1>

          <ul className="font-medium text-lg list-outside ps-4 mx-4 sm:mx-12 md:mx-0">
            <li>
              Computer Science + Data Science @{" "}
              <a href="https://wisc.edu">UW-Madison</a> at Madison, WI
            </li>
            <li>
              Fullstack engineer and entrepreneur, interested in distributed
              systems
            </li>
            <li>Avid believer in simplicity</li>
            <li>
              Currently building a{" "}
              <a
                href="https://rehatsingh.com/marc"
                target="_blank"
                rel="noreferrer"
              >
                professional context layer for AI agents
              </a>
            </li>
          </ul>

          <div className="flex flex-row justify-center md:justify-start gap-8 md:gap-4 mt-2">
            {contactLinks.map(({ Icon, href }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                key={href}
                className="hover:text-primary hover:-translate-y-1 transition-all"
              >
                <Icon size={32} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>

        <Image
          src="/images/pingy.png"
          alt="Picture of Rehatbir"
          width={photoSize}
          height={photoSize}
          className="border-3 rounded-full"
        />
      </div>

      <span
        className={`absolute bottom-0 left-[50%] translate-x-[-50%] text-base text-muted flex flex-col items-center transition-opacity ${cn(showScrollLabel ? "opacity-70" : "opacity-0")}`}
      >
        Scroll
        <ChevronDownIcon className="w-[1em] animate-bounce" />
      </span>
    </>
  );
}
