import { Client } from "@notionhq/client";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
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
      id: string;
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

  const id = params.id;

  try {
    const query = await notion.blocks.children.list({
      block_id: id,
    });

    return NextResponse.json({
      error: null,
      data: query.results as BlockObjectResponse[],
    });
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
