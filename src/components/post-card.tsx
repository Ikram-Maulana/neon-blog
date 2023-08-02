import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Card, CardContent, CardFooter } from "@/ui/card";
import type { PostCardProps } from "@/validator/post-validator";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const PostCard: FC<PostCardProps> = (post) => {
  return (
    <Link href={`/post/${post.slug}`} className="flex group">
      <Card>
        <CardContent className={cn("p-0")}>
          <div className="overflow-hidden h-52 md:h-56 lg:h-52 xl:h-56 rounded-t-xl">
            <Image
              src={post.banner}
              alt={post.title}
              loader={({ src }) => src}
              width={1920}
              height={1080}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
              unoptimized
              className="object-cover object-center w-full h-full transition-all duration-200 group-hover:scale-110"
            />
          </div>
          <div className="p-6 pt-1">
            <div className="flex gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={`tag-${index}`} className="mt-3">
                  {tag}
                </Badge>
              ))}
            </div>
            <h2 className="mt-3 text-lg font-bold line-clamp-2">
              {post.title}
            </h2>
            <p className="mt-3 leading-7 line-clamp-2">{post.excerpt}</p>
          </div>
        </CardContent>
        <CardFooter className={cn("flex gap-2")}>
          <Avatar>
            <AvatarImage src={post.author.avatar_url} alt={post.author.name} />
            <AvatarFallback>{post.author.avatar_fallback}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-medium leading-7 line-clamp-1">
              {post.author.name}
            </p>
            <p className="text-sm text-muted-foreground">
              Published at {post.created_at}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
