/*
  Warnings:

  - Added the required column `password` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL
);
INSERT INTO "new_usuarios" ("empresaId", "id", "nome") SELECT "empresaId", "id", "nome" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE INDEX "usuarios_username_password_idx" ON "usuarios"("username", "password");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
