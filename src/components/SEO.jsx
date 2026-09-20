import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = 'RepoRadar — GitHub Repository Analytics',
  description = 'Analyze any GitHub repository with beautiful interactive charts. View commit activity, language breakdown, contributors, and more.',
  image = 'https://reporadar.vercel.app/og-image.png', // We'll create this leter
  url = 'https://reporadar.vercel.app'
}) {
  return (
    <Helmet>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}