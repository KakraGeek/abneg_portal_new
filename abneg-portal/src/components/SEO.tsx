import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'organization';
  structuredData?: object;
}

/**
 * Comprehensive SEO component for ABNEG Portal
 * Handles meta tags, Open Graph, Twitter Cards, and structured data
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/hero-1.jpg', // Default ABNEG image
  url,
  type = 'website',
  structuredData
}) => {
  const fullTitle = `ABNEG - ${title}`;
  const fullUrl = url ? `https://abneg.org${url}` : 'https://abneg.org';
  const fullImage = image.startsWith('http') ? image : `https://abneg.org${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Agric Business Network - Ghana (ABNEG)" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="ABNEG - Agric Business Network Ghana" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@ABNEG_Ghana" />
      <meta name="twitter:creator" content="@ABNEG_Ghana" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#16a34a" />
      <meta name="msapplication-TileColor" content="#16a34a" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Predefined SEO configurations for different pages
export const SEO_CONFIGS = {
  home: {
    title: 'Home',
    description: 'ABNEG - Agric Business Network Ghana. Leading platform for agricultural stakeholders, farmers, agro-processors, and investors. Join Ghana\'s premier agricultural business network.',
    keywords: 'agricultural business network, Ghana agriculture, farming network, agro-processors, agricultural investment, Ghana farmers, agricultural association, agribusiness Ghana, agricultural opportunities, farming community Ghana',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Agric Business Network - Ghana (ABNEG)",
      "url": "https://abneg.org",
      "logo": "https://abneg.org/logo.png",
      "description": "Leading agricultural business network in Ghana connecting farmers, agro-processors, and investors",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Accra",
        "addressCountry": "GH"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+233-20-123-4567",
        "contactType": "customer service",
        "email": "info@abneg.org"
      }
    }
  },
  
  about: {
    title: 'About Us',
    description: 'Learn about ABNEG\'s mission to transform Ghana\'s agricultural sector. Discover our vision, leadership, and commitment to sustainable agribusiness development.',
    keywords: 'ABNEG about, agricultural mission Ghana, farming vision, agricultural leadership, Ghana agribusiness, sustainable agriculture, agricultural development Ghana',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About ABNEG",
      "description": "Learn about ABNEG's mission to transform Ghana's agricultural sector"
    }
  },
  
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with ABNEG - Agric Business Network Ghana. Contact our team for membership inquiries, business opportunities, and agricultural support.',
    keywords: 'contact ABNEG, agricultural support Ghana, farming assistance, agribusiness contact, Ghana agricultural network contact',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact ABNEG",
      "description": "Get in touch with ABNEG for agricultural business support"
    }
  },
  
  events: {
    title: 'Events',
    description: 'Stay updated with ABNEG events, conferences, training sessions, and agricultural workshops. Join our community events for networking and learning opportunities.',
    keywords: 'agricultural events Ghana, farming conferences, agricultural workshops, agribusiness networking, Ghana agricultural training, farming seminars',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "ABNEG Events",
      "description": "Agricultural events and networking opportunities"
    }
  },
  
  news: {
    title: 'News & Updates',
    description: 'Latest news and updates from ABNEG - Agric Business Network Ghana. Stay informed about agricultural developments, policy changes, and industry insights.',
    keywords: 'agricultural news Ghana, farming updates, agribusiness news, Ghana agricultural policy, farming industry news, agricultural developments',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "name": "ABNEG News",
      "description": "Latest agricultural news and updates"
    }
  },
  
  leadership: {
    title: 'Leadership',
    description: 'Meet ABNEG\'s leadership team - experienced professionals dedicated to advancing Ghana\'s agricultural sector through innovation and collaboration.',
    keywords: 'ABNEG leadership, agricultural leaders Ghana, farming executives, agribusiness management, Ghana agricultural leadership',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "ABNEG Leadership Team",
      "description": "Leadership team of ABNEG"
    }
  },
  
  join: {
    title: 'Join Us',
    description: 'Become a member of ABNEG - Ghana\'s premier agricultural business network. Access exclusive benefits, networking opportunities, and business support.',
    keywords: 'join ABNEG, agricultural membership, farming network join, agribusiness membership Ghana, agricultural association join, farming community membership',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "JoinAction",
      "name": "Join ABNEG",
      "description": "Become a member of ABNEG"
    }
  },
  
  dashboard: {
    title: 'Member Dashboard',
    description: 'Access your ABNEG member dashboard. Manage your profile, view loan applications, track payments, and access exclusive member resources.',
    keywords: 'ABNEG dashboard, member portal, agricultural member area, farming dashboard, agribusiness portal',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "ABNEG Member Dashboard",
      "description": "Member portal for ABNEG"
    }
  },
  
  loanApplication: {
    title: 'Loan Application',
    description: 'Apply for agricultural loans through ABNEG. Access financing for farming equipment, inputs, and business expansion with competitive rates.',
    keywords: 'agricultural loans Ghana, farming finance, agricultural financing, Ghana farming loans, agribusiness loans, agricultural credit',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "ABNEG Agricultural Loans",
      "description": "Agricultural loan application service"
    }
  },
  
  payments: {
    title: 'Payments',
    description: 'Make secure payments for ABNEG membership dues, subscriptions, and services. Multiple payment options available for your convenience.',
    keywords: 'ABNEG payments, agricultural membership fees, farming dues, agribusiness payments, Ghana agricultural payments',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "PaymentService",
      "name": "ABNEG Payment Portal",
      "description": "Secure payment portal for ABNEG services"
    }
  }
};

// Industry-specific keywords for agricultural business networks
export const AGRICULTURAL_KEYWORDS = {
  primary: [
    'agricultural business network',
    'Ghana agriculture',
    'farming network',
    'agro-processors',
    'agricultural investment',
    'Ghana farmers',
    'agricultural association',
    'agribusiness Ghana',
    'agricultural opportunities',
    'farming community Ghana'
  ],
  
  secondary: [
    'agricultural financing',
    'farming loans',
    'agricultural training',
    'capacity building',
    'agricultural policy',
    'rural development',
    'agricultural innovation',
    'sustainable farming',
    'agricultural technology',
    'food security'
  ],
  
  longTail: [
    'how to join agricultural network Ghana',
    'agricultural business opportunities Ghana',
    'farming investment Ghana',
    'agricultural training programs Ghana',
    'agribusiness networking events Ghana',
    'agricultural loan application Ghana',
    'farming support services Ghana',
    'agricultural policy advocacy Ghana',
    'sustainable agriculture practices Ghana',
    'agricultural market access Ghana'
  ],
  
  local: [
    'Accra agricultural network',
    'Kumasi farming community',
    'Tamale agribusiness',
    'Cape Coast agricultural association',
    'Ghana agricultural stakeholders',
    'West African farming network',
    'Ghanaian agricultural professionals',
    'Ghana farming investment',
    'Ghana agricultural development',
    'Ghana agricultural innovation'
  ]
}; 