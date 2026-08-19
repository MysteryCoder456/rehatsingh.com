"use client";

import { usePathname, useSelectedLayoutSegment } from "next/navigation";

export default function SidebarTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const selectedSegment = useSelectedLayoutSegment();

  const pathname = usePathname();
  const primarySegment = pathname.split("/")[1];

  if (primarySegment === selectedSegment) return children;
  return null;
}
