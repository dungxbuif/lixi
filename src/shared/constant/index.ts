import { INavItem } from "../components/interfaces/navbar.interface";
import { UserRoleEnum } from "../enum";

export const PagePath = {
    MAIN: '/',
    LOGIN: '/login',
    HOME: '/home',
    LUCKY_MONEY: '/lucky-money',
};

export const navItems: INavItem[] = [
    {
        title: 'Home Page',
        href: PagePath.MAIN,
        icon: 'home',
        label: 'home',
        role: [UserRoleEnum.USER]
    },
    {
        title: 'Lì xì của bạn',
        href: PagePath.LUCKY_MONEY,
        icon: 'dashboard',
        label: 'Dashboard',
        role: [UserRoleEnum.USER]
    },
];