import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '../atoms/Icon';
import { INavItem } from '../interfaces/navbar.interface';

interface SidebarItemProps {
    item: INavItem;
    isMobileNav: boolean;
    className?: string;
    onCloseSidebar?: () => void;
}

export default function SidebarItem({
    item,
    isMobileNav,
    className,
    onCloseSidebar
}: SidebarItemProps) {
    const path = usePathname();
    const Icon = Icons[item.icon as keyof typeof Icons] || null;

    return (
        <Link
            href={item?.href || '#'}
            key={item.label}
            className={cn(
                'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                path === item.href ? 'bg-accent' : 'transparent',
                item.disabled && 'cursor-not-allowed opacity-80',
                className
            )}
            onClick={onCloseSidebar}
        >
            {Icon && <Icon className={`ml-3 size-5`} />}
            {isMobileNav || !isMobileNav ? <span className='mr-2 truncate'>{item.title}</span> : ''}
        </Link>
    );
}
