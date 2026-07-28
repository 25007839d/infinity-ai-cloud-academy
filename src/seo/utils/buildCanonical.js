import siteConfig from "../config/siteConfig";

export default function buildCanonical(path) {
  const currentPath =
    path ??
    (typeof window !== "undefined"
      ? window.location.pathname
      : "/");

  const cleanPath = currentPath.startsWith("/")
    ? currentPath
    : `/${currentPath}`;

  return `${siteConfig.siteUrl}${cleanPath}`;
}