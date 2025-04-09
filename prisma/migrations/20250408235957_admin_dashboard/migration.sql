-- CreateTable
CREATE TABLE "AdminList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "interests" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "companies" TEXT NOT NULL,
    "interview" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminList_pkey" PRIMARY KEY ("id")
);
