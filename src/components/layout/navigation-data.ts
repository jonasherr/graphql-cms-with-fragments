export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface NavigationData {
  title: string;
  items: NavigationItem[];
}

export const navigationData: NavigationData = {
  title: "CMS GraphQL Fragments",
  items: [
    { label: "Home", href: "/", isExternal: false },
    { label: "About", href: "/about", isExternal: false },
    { label: "Contact", href: "/contact", isExternal: false },
  ],
};
