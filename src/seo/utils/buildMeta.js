import defaultSEO from "../config/defaultSEO";
import buildCanonical from "./buildCanonical";
import siteConfig from "../config/siteConfig";

export default function buildMeta({
  title,
  description,
  keywords,
  image,
  url,
  type,
  robots,
} = {}) {
  return {
    title: title || defaultSEO.title,

    description: description || defaultSEO.description,

    keywords: keywords || defaultSEO.keywords.join(", "),

    image:
      image || `${siteConfig.siteUrl}${siteConfig.defaultImage}`,

    url: url || buildCanonical(),

    type: type || defaultSEO.type,

    robots: robots || defaultSEO.robots,
  };
}