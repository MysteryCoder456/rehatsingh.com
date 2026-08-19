import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import AppearanceSwitcher from "@/components/appearance-switcher";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rehatbir Singh",
  description: "Student at UW-Madison, fullstack engineer, and avid learner.",
  authors: [{ name: "Rehatbir Singh" }],
  keywords: [
    "Rehatbir Singh",
    "Programmer",
    "Fullstack",
    "Backend",
    "Engineer",
    "Student",
    "Computer Science",
  ],
  openGraph: {
    type: "website",
    url: "https://rehatsingh.com",
    title: "Rehatbir Singh",
    description: "Student at UW-Madison, fullstack engineer, and avid learner.",
    images: { url: "https://rehatsingh.com/images/pingy.png" },
  },
  twitter: {
    card: "summary_large_image",
    title: "Rehatbir Singh",
    description: "Student at UW-Madison, fullstack engineer, and avid learner.",
    images: { url: "https://rehatsingh.com/images/pingy.png" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const navBarItems: { name: string; href: string; newTab?: boolean }[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  {
    name: "Resume",
    href: "https://docs.rehatsingh.com/resume.pdf",
    newTab: true,
  },
  {
    name: "GitHub",
    href: "https://github.com/MysteryCoder456",
    newTab: true,
  },
];

export default function RootLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://umami.rehatsingh.com/script.js"
          data-website-id="6d05defe-708b-41d7-91c1-40a55ec94f3d"
          strategy="afterInteractive"
        />
        <link rel="canonical" href="https://rehatsingh.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
        >
          <TooltipProvider>
            <NavigationMenu className="fixed left-1/2 -translate-x-1/2 py-3 bg-background border-b border-b-secondary z-50">
              <NavigationMenuList className="flex-wrap w-screen gap-4">
                {navBarItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.href.startsWith("http") ? (
                      <NavigationMenuLink
                        href={item.href}
                        target={item.newTab ? "_blank" : "_self"}
                        className="font-semibold not-italic no-underline"
                      >
                        {item.name}
                      </NavigationMenuLink>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          target={item.newTab ? "_blank" : "_self"}
                          className="font-semibold not-italic no-underline"
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <AppearanceSwitcher />

            <div className="hidden lg:flex fixed top-0 left-0 h-screen w-1/6 2xl:w-1/4 flex-col justify-center items-center">
              {sidebar}
            </div>

            {/* Create a responsive center element for main content */}
            <div className="grid grid-cols-12">
              <div className="px-4 md:px-0 py-18 min-h-screen col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 2xl:col-span-6 2xl:col-start-4">
                {children}
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
