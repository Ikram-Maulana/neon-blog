import { z } from "zod";

const createPostsProps = z.object({
  id: z.string(),
  slug: z.object({
    id: z.string(),
    rich_text: z.array(
      z.object({
        text: z.object({
          content: z.string(),
        }),
      })
    ),
  }),
  title: z.object({
    id: z.string(),
    title: z.array(
      z.object({
        text: z.object({
          content: z.string(),
        }),
      })
    ),
  }),
  excerpt: z.object({
    id: z.string(),
    rich_text: z.array(
      z.object({
        text: z.object({
          content: z.string(),
        }),
      })
    ),
  }),
  banner: z.object({
    id: z.string(),
    files: z.array(
      z.object({
        name: z.string(),
      })
    ),
  }),
  bannerImageHeight: z.object({
    id: z.string(),
    number: z.number(),
  }),
  bannerImageWidth: z.object({
    id: z.string(),
    number: z.number(),
  }),
  tags: z.object({
    id: z.string(),
    multi_select: z.array(
      z.object({
        name: z.string(),
      })
    ),
  }),
  status: z.object({
    id: z.string(),
    status: z.object({
      name: z.string(),
    }),
  }),
  author: z.object({
    id: z.string(),
    people: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        avatar_url: z.string(),
      })
    ),
  }),
  created_at: z.object({
    id: z.string(),
    created_time: z.date(),
  }),
  updated_at: z.object({
    id: z.string(),
    last_edited_time: z.date(),
  }),
});

export type postProps = z.infer<typeof createPostsProps>;

const createPostProps = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  banner: z.string(),
  bannerImageHeight: z.number(),
  bannerImageWidth: z.number(),
  tags: z.array(z.string()),
  status: z.string(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    avatar_url: z.string(),
    avatar_fallback: z.string(),
  }),
  created_at: z.string(),
  updated_at: z.string(),
});

export const getPostsResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.object({
    posts: z.array(createPostProps),
    nextCursor: z.string().nullable(),
    hasMore: z.boolean(),
  }),
});

export const getPostResponseValidator = z.object({
  error: z.string().nullable(),
  data: createPostProps,
});

export type PostCardProps = z.infer<typeof createPostProps>;
