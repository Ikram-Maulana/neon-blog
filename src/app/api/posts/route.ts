import {
  getPostsResponseValidator,
  postProps,
} from "@/validator/post-validator";
import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({
  auth: notionSecret,
});

export const GET = async (req: NextRequest) => {
  if (!notionSecret || !notionDatabaseId) {
    return NextResponse.json(
      {
        error: "Missing notion secret or DB-ID",
        data: null,
      },
      { status: 500 }
    );
  }

  const limit = req.nextUrl.searchParams.get("_limit");
  const page = req.nextUrl.searchParams.get("_page");
  const search = req.nextUrl.searchParams.get("_search");

  try {
    const query = await notion.databases.query({
      database_id: notionDatabaseId,
      filter: {
        and: [
          {
            property: "status",
            status: {
              equals: "Published",
            },
          },
          {
            property: "title",
            rich_text: {
              contains: search ? search : "",
            },
          },
        ],
      },
      page_size: limit ? parseInt(limit) : 8,
      start_cursor: page ? page : undefined,
    });

    // Id of each page
    const pageIds = query.results.map((res) => res.id) as string[];
    // Next page
    const hasMore = query.has_more;
    const nextCursor = hasMore ? query.next_cursor : null;

    // @ts-ignore
    const rows = query.results.map((res) => res.properties) as postProps[];

    const posts = rows.map((row) => {
      return {
        id: pageIds.shift(),
        slug: row.slug.rich_text[0].text.content,
        title: row.title.title[0].text.content,
        excerpt: row.excerpt.rich_text[0].text.content,
        banner: row.banner.files[0].name,
        bannerImageHeight: row.bannerImageHeight.number,
        bannerImageWidth: row.bannerImageWidth.number,
        tags: row.tags.multi_select.map((tag) => tag.name),
        status: row.status.status.name,
        author: {
          id: row.author.people[0].id,
          name: row.author.people[0].name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" "),
          avatar_url: row.author.people[0].avatar_url,
          avatar_fallback: row.author.people[0].name
            .split(" ")
            .map((name) => name[0])
            .join(""),
        },
        created_at: row.created_at.created_time,
        updated_at: row.updated_at.last_edited_time,
      };
    });

    const response = getPostsResponseValidator.parse({
      error: null,
      data: {
        posts,
        nextCursor,
        hasMore,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
          data: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
        data: null,
      },
      { status: 500 }
    );
  }
};
