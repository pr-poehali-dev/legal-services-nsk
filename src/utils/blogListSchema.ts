export interface BlogListSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  blogPost: Array<{
    '@type': string;
    headline: string;
    description: string;
    url: string;
    datePublished: string;
    author: {
      '@type': string;
      name: string;
    };
  }>;
}

export const getBlogListSchema = (posts: Array<{
  title: string;
  slug: string;
  description: string;
  author: string;
  published_at: string;
  created_at: string;
}>): BlogListSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Блог юридической компании ЮрСервис НСК',
    description: 'Полезные статьи о юридических вопросах: семейное право, наследство, трудовые споры, автоюрист и многое другое',
    url: 'https://юридический-сервис.рф/blog',
    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      url: `https://юридический-сервис.рф/blog/${post.slug}`,
      datePublished: post.published_at || post.created_at,
      author: {
        '@type': 'Person',
        name: post.author
      }
    }))
  };
};
