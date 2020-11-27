# Migration `20201127152100-initial`

This migration has been generated by Geoffrey at 11/27/2020, 4:21:00 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Live" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
)

CREATE TABLE "Questionnaire" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "liveId" INTEGER NOT NULL,

    FOREIGN KEY ("liveId") REFERENCES "Live"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "Questionnaire_liveId_unique" ON "Questionnaire"("liveId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201127152100-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,26 @@
+// 1
+datasource db {
+  provider = "sqlite" 
+  url = "***"
+}
+
+// 2
+generator client {
+  provider = "prisma-client-js"
+}
+
+// 3
+model Live {
+    id            Int      @id @default(autoincrement())
+    title         String
+    description   String
+    questionnaire Questionnaire?
+}
+
+model Questionnaire {
+    id            Int      @id @default(autoincrement())
+    title         String
+    description   String
+    liveId        Int
+    live          Live    @relation(fields: [liveId], references: [id])
+}
```

