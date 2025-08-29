import { graphql } from "@/lib/graphql";

export const footerLinkFragment = graphql(`
  fragment FooterLink on FooterLink {
    label
    href
    isExternal
  }
`);
