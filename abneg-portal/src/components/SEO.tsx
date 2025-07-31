import { useEffect } from 'react';

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
 * Uses native document API instead of react-helmet-async for React 19 compatibility
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
  const baseUrl = 'https://abneg-portal-cc2de8wxa-desmond-asiedus-projects.vercel.app';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic Meta Tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'Agric Business Network - Ghana (ABNEG)');
    updateMetaTag('language', 'English');
    updateMetaTag('revisit-after', '7 days');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;
    
    // Open Graph Meta Tags
    updatePropertyMetaTag('og:title', fullTitle);
    updatePropertyMetaTag('og:description', description);
    updatePropertyMetaTag('og:type', type);
    updatePropertyMetaTag('og:url', fullUrl);
    updatePropertyMetaTag('og:image', fullImage);
    updatePropertyMetaTag('og:image:width', '1200');
    updatePropertyMetaTag('og:image:height', '630');
    updatePropertyMetaTag('og:site_name', 'ABNEG - Agric Business Network Ghana');
    updatePropertyMetaTag('og:locale', 'en_US');
    
    // Twitter Card Meta Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullImage);
    updateMetaTag('twitter:site', '@ABNEG_Ghana');
    updateMetaTag('twitter:creator', '@ABNEG_Ghana');
    
    // Structured Data
    if (structuredData) {
      // Remove existing structured data
      const existingScript = document.querySelector('script[data-seo-structured]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-structured', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Reset title to default
      document.title = 'ABNEG - Agric Business Network Ghana';
      
      // Remove structured data on unmount
      const script = document.querySelector('script[data-seo-structured]');
      if (script) {
        script.remove();
      }
    };
  }, [fullTitle, description, keywords, fullUrl, fullImage, type, structuredData]);

  // This component doesn't render anything
  return null;
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
      "url": "https://abneg-portal-cc2de8wxa-desmond-asiedus-projects.vercel.app",
      "logo": "https://abneg-portal-cc2de8wxa-desmond-asiedus-projects.vercel.app/logo.png",
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