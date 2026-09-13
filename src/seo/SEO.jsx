import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import siteConfig from "./config/siteConfig";
import defaultSEO from "./config/defaultSEO";
import buildCanonical from "./utils/buildCanonical";

export default function SEO({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords.join(", "),
  image = `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
  url = buildCanonical(),
  type = defaultSEO.type,
  robots = defaultSEO.robots
}) {
  const [siteDefaults, setSiteDefaults] = useState(null);

  useEffect(() => {
    let active = true;
    apiRequest("/site-seo")
      .then((data) => {
        if (active && data) setSiteDefaults(data);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const defaultKeywords = defaultSEO.keywords.join(", ");
  const defaultImage = `${siteConfig.siteUrl}${siteConfig.defaultImage}`;

  const resolvedTitle =
    title === defaultSEO.title && siteDefaults?.default_title
      ? siteDefaults.default_title
      : title;

  const resolvedDescription =
    description === defaultSEO.description && siteDefaults?.default_description
      ? siteDefaults.default_description
      : description;

  const resolvedKeywords =
    keywords === defaultKeywords && siteDefaults?.default_keywords
      ? siteDefaults.default_keywords
      : keywords;

  const resolvedImage =
    image === defaultImage && siteDefaults?.default_image
      ? siteDefaults.default_image.startsWith("http")
        ? siteDefaults.default_image
        : `${siteConfig.siteUrl}${siteDefaults.default_image.startsWith("/") ? siteDefaults.default_image : `/${siteDefaults.default_image}`}`
      : image;

  const resolvedRobots =
    robots === defaultSEO.robots && siteDefaults?.default_robots
      ? siteDefaults.default_robots
      : robots;

  const pageTitle =
    resolvedTitle === defaultSEO.title ||
    resolvedTitle.endsWith(`| ${siteConfig.siteName}`)
      ? resolvedTitle
      : `${resolvedTitle} | ${siteConfig.siteName}`;

  return (
    <Helmet>
      <html lang={siteConfig.language} />

      <title>{pageTitle}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={resolvedDescription} />
      <meta name="keywords" content={resolvedKeywords} />
      <meta name="robots" content={resolvedRobots} />
      <meta name="author" content={siteConfig.author} />
      <meta name="theme-color" content={siteConfig.themeColor} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={resolvedImage} />
      <meta
        property="og:image:alt"
        content={`${siteConfig.siteName} - Data Engineering & AI Academy`}
      />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content={siteConfig.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta
        name="twitter:image:alt"
        content={`${siteConfig.siteName} - Data Engineering & AI Academy`}
      />

      {siteConfig.twitterHandle && (
        <meta name="twitter:site" content={siteConfig.twitterHandle} />
      )}
    </Helmet>
  );
}
