// @ts-nocheck
import PostDetail from "@/components/post-detail";
import { getMetadataBySlug } from "@/lib/notion";
import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: any) {
  const slug = params.slug;
  const post = await getMetadataBySlug(slug);

  if (!post) {
    return notFound();
  }

  return {
    title: post.properties.title.title[0].text.content,
    description: post.properties.excerpt.rich_text[0].text.content,
    keywords: post.properties.tags.multi_select.map((tag: any) => tag.name),
    authors: {
      name: post.properties.author.people[0].name,
      url: "https://ikram-maulana.tech",
    },
    openGraph: {
      title: post.properties.title.title[0].text.content,
      description: post.properties.excerpt.rich_text[0].text.content,
      url: `https://neonblog.vercel.app/blog/${slug}`,
      siteName: "Neon Blog",
      type: "article",
      images: [
        {
          url: post.properties.banner.files[0].name,
          width: 800,
          height: 600,
          alt: post.properties.banner.files[0].name,
        },
      ],
      publishedTime: new Date(
        post.properties.created_at.created_time
      ).toISOString(),
    },
  };
}

const page: FC<pageProps> = ({ params }) => {
  const slug = params.slug;

  return (
    <div className="container max-w-7xl">
      <PostDetail slug={slug} />
    </div>
  );
};

export default page;
