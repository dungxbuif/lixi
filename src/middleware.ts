import { NextAuthRequest } from 'next-auth/lib';
import { NextResponse } from 'next/server';
import { auth } from './auth';
import { PagePath } from './shared/constant';

export default auth(async (req: NextAuthRequest) => {
    const pathname = req.nextUrl.pathname;
    const isLoginPage = pathname === PagePath.LOGIN;
    const session = req?.auth?.user;
    if (!session && pathname !== PagePath.LOGIN) {
        return NextResponse.redirect(new URL(PagePath.LOGIN, req.url));
    }

    if (session && isLoginPage) {
        return NextResponse.redirect(new URL(PagePath.HOME, req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!api|_next|static|favicon.ico).*)']
};
