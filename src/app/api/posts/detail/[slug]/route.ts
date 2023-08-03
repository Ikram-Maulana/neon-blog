import {
  getPostResponseValidator,
  postProps,
} from "@/validator/post-validator";
import { Client } from "@notionhq/client";
import { format, formatDistanceToNow, isToday, parseISO } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({
  auth: notionSecret,
});

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      slug: string;
    };
  }
) => {
  if (!notionSecret || !notionDatabaseId) {
    return NextResponse.json(
      {
        error: "Missing notion secret or DB-ID",
        data: null,
      },
      { status: 500 }
    );
  }

  const slug = params.slug;

  try {
    const query = await notion.databases.query({
      database_id: notionDatabaseId,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    const pageId = query.results[0].id;

    // @ts-ignore
    const row = query.results[0].properties as postProps;

    if (!row) {
      return NextResponse.json(
        {
          error: "Post not found",
          data: null,
        },
        { status: 404 }
      );
    }

    const formatDate = (createdAt: string) => {
      const createdAtDate = parseISO(createdAt);

      if (isToday(createdAtDate)) {
        return formatDistanceToNow(createdAtDate, {
          addSuffix: true,
        });
      } else {
        return format(createdAtDate, "MMM dd, yyyy");
      }
    };

    const post = {
      id: pageId,
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
      created_at: formatDate(row.created_at.created_time.toString()),
      updated_at: formatDate(row.updated_at.last_edited_time.toString()),
    };

    const response = getPostResponseValidator.parse({
      error: null,
      data: post,
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
