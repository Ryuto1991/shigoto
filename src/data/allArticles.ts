import type { Article } from '../types/article';
import { featuredItems } from './featuredItems';
import { latestEntries } from './latestEntries';
import { newsArticles } from './newsArticles';
import { secretArticles } from './secretArticles';
import { bannerArticles } from './bannerArticles';
import { notableWorks } from './notableWorks';

// Combine all articles and remove duplicates based on id
export const allArticles: Article[] = [
  ...featuredItems,
  ...latestEntries,
  ...newsArticles,
  ...secretArticles,
  ...bannerArticles,
  ...notableWorks
].filter((article, index, self) => 
  index === self.findIndex((a) => a.id === article.id)
);