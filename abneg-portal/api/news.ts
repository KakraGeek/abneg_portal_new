// abneg-portal/api/news.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/connection';
import { newsPosts, newsTags, newsPostTags } from '../src/db/schema';
import { eq, inArray } from 'drizzle-orm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { action } = req.query;

  // 1. Get all news (with optional tag filter, pagination)
  if (req.method === 'GET' && !action) {
    try {
      const page = parseInt((req.query.page as string) || '1');
      const limit = parseInt((req.query.limit as string) || '5');
      const offset = (page - 1) * limit;
      const tagFilter = req.query.tag as string | undefined;

      let posts;
      if (tagFilter) {
        const tag = await db.select().from(newsTags).where(eq(newsTags.name, tagFilter));
        if (tag.length === 0) {
          res.json([]);
          return;
        }
        const tagId = tag[0].id;
        const postTagLinks = await db.select().from(newsPostTags).where(eq(newsPostTags.tagId, tagId));
        const postIds = postTagLinks.map((link) => link.postId);
        if (postIds.length === 0) {
          res.json([]);
          return;
        }
        posts = await db.select().from(newsPosts).where(inArray(newsPosts.id, postIds)).limit(limit).offset(offset);
      } else {
        posts = await db.select().from(newsPosts).limit(limit).offset(offset);
      }

      const postsWithTags = await Promise.all(
        posts.map(async (post) => {
          const tagLinks = await db.select().from(newsPostTags).where(eq(newsPostTags.postId, post.id));
          const tagIds = tagLinks.map((link) => link.tagId);
          const tags = tagIds.length
            ? await db.select().from(newsTags).where(inArray(newsTags.id, tagIds))
            : [];
          return {
            ...post,
            tags: tags.map((t) => t.name),
          };
        })
      );

      res.status(200).json(postsWithTags);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch news posts' });
    }
    return;
  }

  // 2. Get news tags
  if (req.method === 'GET' && action === 'tags') {
    try {
      const tags = await db.select().from(newsTags);
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch news tags' });
    }
    return;
  }

  res.status(404).json({ error: 'Not found' });
}
