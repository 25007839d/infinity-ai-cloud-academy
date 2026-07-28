import { Helmet } from "react-helmet-async";
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
  robots = defaultSEO.robots,
}) {
  const pageTitle =
    title === defaultSEO.title
      ? defaultSEO.title
      : `${title} | ${siteConfig.siteName}`;

  return (
    <Helmet>
      {/* HTML */}
      <html lang={siteConfig.language} />

      {/* Basic SEO */}
      <title>{pageTitle}</title>

      <meta charSet="utf-8" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="description" content={description} />

      <meta name="keywords" content={keywords} />

      <meta name="robots" content={robots} />

      <meta name="author" content={siteConfig.author} />

      <meta name="theme-color" content={siteConfig.themeColor} />

      <meta property="og:image:width" content="1200" />

      <meta property="og:image:height" content="630" />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      <meta name="mobile-web-app-capable" content="yes" />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
      name="format-detection"
      content="telephone=no"
      />
      <meta
      name="referrer"
      content="strict-origin-when-cross-origin"
      />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />

      <meta property="og:title" content={pageTitle} />

      <meta property="og:description" content={description} />

      <meta property="og:url" content={url} />

      <meta property="og:image" content={image} />

      <meta
        property="og:image:alt"
        content={`${siteConfig.siteName} - Data Engineering & AI Academy`}
      />

      <meta property="og:site_name" content={siteConfig.siteName} />

      <meta property="og:locale" content={siteConfig.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={pageTitle} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />

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