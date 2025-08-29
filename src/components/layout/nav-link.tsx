"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FragmentOf } from "@/lib/graphql";
import type { navigationLinkFragment } from "./nav-link-fragment";

interface NavigationProps {
  data: FragmentOf<typeof navigationLinkFragment>;
}

export const NavLink = ({ data }: NavigationProps) => {
  const pathname = usePathname();
  return (
    <Link
      key={data.href}
      href={data.href}
      className={`text-sm font-medium transition-colors ${
        pathname === data.href
          ? "text-blue-600 dark:text-blue-400"
          : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      }`}
      {...(data.isExternal && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {data.label}
    </Link>
  );
};
