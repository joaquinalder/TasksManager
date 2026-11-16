BEGIN;

ALTER TABLE "Task" ADD COLUMN "userId" INTEGER;

UPDATE "Task" AS task
SET "userId" = project."userId"
FROM "Project" AS project
WHERE task."projectId" = project."id" AND project."userId" IS NOT NULL;

CREATE INDEX "Task_userId_idx" ON "Task"("userId");
CREATE INDEX "Project_userId_idx" ON "Project"("userId");

ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT;
