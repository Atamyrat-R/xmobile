CREATE INDEX IF NOT EXISTS "name_index" ON "users" ("name");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "id";