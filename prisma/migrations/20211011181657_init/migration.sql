-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "rating" SMALLINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "site" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "let" REAL NOT NULL,
    "lon" REAL NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);
