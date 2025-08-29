import Link from "next/link";
import { type FragmentOf, graphql, readFragment } from "@/lib/graphql";
import { footerLinkFragment } from "./footer-link-fragment";
import { socialLinkFragment } from "./social-link-fragment";

export const footerFragment = graphql(
  `
  fragment Footer on Footer {
    title
    description
    links {
      _key
      ...FooterLink
    }
    socialLinks {
      _key
      ...SocialLink
    }
    copyright
  }
`,
  [footerLinkFragment, socialLinkFragment],
);

interface FooterProps {
  data: FragmentOf<typeof footerFragment>;
}

// Simple social media icons
const SocialIcon = ({ platform }: { platform: string }) => {
  const iconClass = "w-5 h-5";

  switch (platform) {
    case "twitter":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <title>Twitter</title>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "github":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <title>GitHub</title>
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <title>LinkedIn</title>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <title>Instagram</title>
          <path d="M12.017 0C8.396 0 7.989.016 6.756.072 5.526.127 4.718.302 4.019.57c-.72.28-1.33.653-1.938 1.261C1.473 2.438 1.1 3.048.82 3.768c-.268.699-.443 1.507-.498 2.737C.266 7.738.25 8.145.25 11.766s.016 4.028.072 5.261c.055 1.23.23 2.038.498 2.737.28.72.653 1.33 1.261 1.938.608.608 1.218.981 1.938 1.261.699.268 1.507.443 2.737.498 1.233.056 1.64.072 5.261.072s4.028-.016 5.261-.072c1.23-.055 2.038-.23 2.737-.498.72-.28 1.33-.653 1.938-1.261.608-.608.981-1.218 1.261-1.938.268-.699.443-1.507.498-2.737.056-1.233.072-1.64.072-5.261s-.016-4.028-.072-5.261c-.055-1.23-.23-2.038-.498-2.737-.28-.72-.653-1.33-1.261-1.938C19.562 1.473 18.952 1.1 18.232.82c-.699-.268-1.507-.443-2.737-.498C14.262.266 13.855.25 12.234.25h-.217zm-.086 2.185c.063 0 .133 0 .217 0 3.568 0 3.99.014 5.402.069 1.304.059 2.012.274 2.482.456.624.243 1.069.533 1.537 1.001.468.468.758.913 1.001 1.537.182.47.397 1.178.456 2.482.055 1.412.069 1.834.069 5.402 0 3.568-.014 3.99-.069 5.402-.059 1.304-.274 2.012-.456 2.482-.243.624-.533 1.069-1.001 1.537-.468.468-.913.758-1.537 1.001-.47.182-1.178.397-2.482.456-1.412.055-1.834.069-5.402.069-3.568 0-3.99-.014-5.402-.069-1.304-.059-2.012-.274-2.482-.456-.624-.243-1.069-.533-1.537-1.001-.468-.468-.758-.913-1.001-1.537-.182-.47-.397-1.178-.456-2.482-.055-1.412-.069-1.834-.069-5.402 0-3.568.014-3.99.069-5.402.059-1.304.274-2.012.456-2.482.243-.624.533-1.069 1.001-1.537.468-.468.913-.758 1.537-1.001.47-.182 1.178-.397 2.482-.456 1.236-.056 1.715-.069 4.185-.069zm8.246 2.02c-.886 0-1.604.718-1.604 1.604s.718 1.604 1.604 1.604 1.604-.718 1.604-1.604-.718-1.604-1.604-1.604zm-8.16 2.146c-3.732 0-6.76 3.028-6.76 6.76s3.028 6.76 6.76 6.76 6.76-3.028 6.76-6.76-3.028-6.76-6.76-6.76zm0 2.185c2.526 0 4.575 2.049 4.575 4.575s-2.049 4.575-4.575 4.575-4.575-2.049-4.575-4.575 2.049-4.575 4.575-4.575z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <title>Facebook</title>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <title>YouTube</title>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <title>Link</title>
          <path d="M10 6H6a2 2 0 00-2 2v8a2 2 0 002 2h4v-2H6V8h4V6zM14 6v2h4v8h-4v2h4a2 2 0 002-2V8a2 2 0 00-2-2h-4z" />
          <path d="M8 12h8v-2H8v2z" />
        </svg>
      );
  }
};

export function Footer({ data }: FooterProps) {
  const footerData = readFragment(footerFragment, data);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-8 sm:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {footerData.title}
            </h3>
            {footerData.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {footerData.description}
              </p>
            )}

            {/* Footer links */}
            {footerData.links && footerData.links.length > 0 && (
              <div className="flex flex-wrap gap-6">
                {footerData.links.map((link) => {
                  const linkData = readFragment(footerLinkFragment, link);
                  return (
                    <Link
                      key={link._key}
                      href={linkData.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      {...(linkData.isExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {linkData.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Social links */}
          {footerData.socialLinks && footerData.socialLinks.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {footerData.socialLinks.map((socialLink) => {
                  const socialData = readFragment(
                    socialLinkFragment,
                    socialLink,
                  );
                  return (
                    <Link
                      key={socialLink._key}
                      href={socialData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={`Follow us on ${socialData.platform}`}
                    >
                      <SocialIcon platform={socialData.platform} />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {footerData.copyright
              ? footerData.copyright.replace(/©?\s*\d{4}/, `© ${currentYear}`)
              : `© ${currentYear} All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
