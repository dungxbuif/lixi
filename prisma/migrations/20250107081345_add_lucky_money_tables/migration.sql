-- CreateTable
CREATE TABLE "lucky_moneys" (
    "id" SERIAL NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lucky_moneys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lucky_moneys_users" (
    "id" TEXT NOT NULL,
    "luckyMoneyId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasSpinned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "lucky_moneys_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuckyMoneyCommand" (
    "id" TEXT NOT NULL,
    "luckyMoneyId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LuckyMoneyCommand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lucky_moneys" ADD CONSTRAINT "lucky_moneys_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lucky_moneys_users" ADD CONSTRAINT "lucky_moneys_users_luckyMoneyId_fkey" FOREIGN KEY ("luckyMoneyId") REFERENCES "lucky_moneys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lucky_moneys_users" ADD CONSTRAINT "lucky_moneys_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuckyMoneyCommand" ADD CONSTRAINT "LuckyMoneyCommand_luckyMoneyId_fkey" FOREIGN KEY ("luckyMoneyId") REFERENCES "lucky_moneys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
