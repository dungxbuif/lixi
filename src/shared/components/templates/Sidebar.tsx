'use client';

import { cn } from '@/lib/utils';
import { navItems } from '@/shared/constant';
import { useSession } from 'next-auth/react';
import DashboardNav from './DashboardNav';

type SidebarProps = {
    className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
    const { data: session } = useSession();

    return (
        <nav
            className={cn(`relative hidden lg:block h-screen flex-none border-r pt-8 w-72`, className)}
        >
            <div className='space-y-4 py-4'>
                <div className='px-3 py-2'>
                    <div className='mt-3 space-y-1'>
                        <DashboardNav items={navItems} />
                    </div>
                </div>
            </div>
        </nav>
    );
}
