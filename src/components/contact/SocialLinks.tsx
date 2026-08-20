import { SocialLink } from "@/types/contact";

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

const SocialLinks = ({ socialLinks }: SocialLinksProps) => (
  <ul className="flex gap-6">
    {socialLinks.map(({ name, url }) => (
      <li key={name}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm uppercase hover:text-gray-600 transition-colors"
        >
          {name}
        </a>
      </li>
    ))}
  </ul>
);

export default SocialLinks;
