import { postProps } from "@/validator/post-validator";
import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
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
    const queryMetadata = await notion.databases.query({
      database_id: notionDatabaseId,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (queryMetadata.results.length === 0) {
      return NextResponse.json(
        {
          error: "Post not found",
          data: null,
        },
        { status: 404 }
      );
    }

    const queryBlocks = await notion.blocks.children.list({
      block_id: queryMetadata.results[0].id,
    });

    if (queryBlocks.results.length === 0) {
      return NextResponse.json(
        {
          error: "Post not found",
          data: null,
        },
        { status: 404 }
      );
    }

    let blocks = queryBlocks.results;

    if (queryBlocks.results.length === 0) {
      blocks = [
        {
          object: "block",
          id: "",
          parent: {
            type: "page_id",
            page_id: "",
          },
          created_time: "",
          last_edited_time: "",
          created_by: {
            object: "user",
            id: "",
          },
          last_edited_by: {
            object: "user",
            id: "",
          },
          has_children: false,
          archived: false,
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "",
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
                plain_text: "",
                href: null,
              },
            ],
            color: "default",
          },
        },
      ];
    }

    const pageId = queryMetadata.results[0].id;

    // @ts-ignore
    const row = queryMetadata.results[0].properties as postProps;

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

    const metadata = {
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

    return NextResponse.json(
      {
        error: null,
        data: {
          metadata,
          blocks,
        },
      },
      { status: 200 }
    );
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
