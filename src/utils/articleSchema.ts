export interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
  };
  articleSection?: string;
  wordCount?: number;
}

export const getArticleSchema = (
  title: string,
  description: string,
  author: string,
  publishedAt: string,
  slug: string,
  category?: string,
  imageUrl?: string,
  wordCount?: number
): ArticleSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl || 'https://юридический-сервис.рф/og-image.jpg',
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'ЮрСервис НСК',
      logo: {
        '@type': 'ImageObject',
        url: 'https://юридический-сервис.рф/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://юридический-сервис.рф/blog/${slug}`
    },
    articleSection: category,
    wordCount: wordCount
  };
};
