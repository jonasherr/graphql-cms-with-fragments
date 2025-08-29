import { graphql } from "@/lib/graphql";

export const socialLinkFragment = graphql(`
  fragment SocialLink on SocialLink {
    platform
    url
  }
`);
