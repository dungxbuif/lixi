"use client"
import { PagePath } from "@/shared/constant";
import { LuckyMoney } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { Card } from "../atoms/Card";
import { Button } from "../atoms/Button";
import { Icons } from "../atoms/Icon";

interface IProps {
    luckyMoney: LuckyMoney
}

const LuckyMoneyCard = ({ luckyMoney }: IProps) => {
    const router = useRouter()

    const handleClickCard = () => {
        router.push(`${PagePath.LUCKY_MONEY}/${luckyMoney.id}`)
    }

    return <Card
        onClick={handleClickCard}
        className='flex flex-col justify-between relative cursor-pointer pt-11 px-5 pb-8 hover:shadow-lg hover:bg-gray-100 h-24 w-64'
    >
        <Button
            variant='destructive'
            className='absolute top-1 right-1'
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <Icons.trash className='h-4 w-4' />
        </Button>
        <h3 className='text-xl font-bold'>{luckyMoney.name}</h3>
    </Card >;
};

export default LuckyMoneyCard;
