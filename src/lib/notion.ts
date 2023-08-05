import "server-only";

import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

export const notionClient = new Client({
  auth: notionSecret,
});

export const getMetadataBySlug = (slug: string) => {
  return notionClient.databases
    .query({
      database_id: notionDatabaseId!,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined);
};
