CREATE TABLE "news_post_tags" (
	"post_id" integer NOT NULL,
	"tag_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"featured_image_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "news_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "news_tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "news_post_tags" ADD CONSTRAINT "news_post_tags_post_id_news_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."news_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "news_post_tags" ADD CONSTRAINT "news_post_tags_tag_id_news_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."news_tags"("id") ON DELETE cascade ON UPDATE no action;