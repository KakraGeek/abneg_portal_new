CREATE TABLE "user_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"assigned_at" timestamp DEFAULT now(),
	"assigned_by" integer
);
--> statement-breakpoint
ALTER TABLE "members" RENAME COLUMN "role_id" TO "location";--> statement-breakpoint
ALTER TABLE "members" DROP CONSTRAINT "members_role_id_roles_id_fk";
--> statement-breakpoint
ALTER TABLE "members" DROP CONSTRAINT "members_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "roles" ALTER COLUMN "name" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "auth0_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "picture" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_assigned_by_users_id_fk" FOREIGN KEY ("assigned_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_auth0_id_unique" UNIQUE("auth0_id");