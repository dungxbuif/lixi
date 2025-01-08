import { auth } from '@/auth';
import { LuckyMoneyService } from '@/server/resources/lucky-money/lucky-money.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const session = await auth();
    const userId = session?.user?.id;
    try {
        body.authorId = userId;

        const luckyMoney = await LuckyMoneyService.createLuckyMoney(body);

        return NextResponse.json({ success: true, data: luckyMoney }, { status: 201 });
    } catch (error) {

        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {

    try {
        const luckyMoneys = await LuckyMoneyService.getAllLuckyMoneys();

        return NextResponse.json(
            { success: true, data: luckyMoneys },
            {
                status: 201
            }
        );
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}