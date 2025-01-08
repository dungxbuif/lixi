'use client';

import { useSession } from 'next-auth/react';
import { UserNav } from './UserNav';
import SidebarMobile from './SidebarMobile';

export default function HeaderBar() {
    const { data: session } = useSession();
    const userName = session?.user?.name;
    return (
        <div className='supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur'>
            <nav className='flex h-14 items-center justify-between px-4'>
                <div className='flex items-center gap-3 py-2 px-0 lg:px-2 rounded-lg justify-between w-[100vw]'>
                    <div className='block lg:hidden'>
                        <SidebarMobile />
                    </div>
                    <div className='flex gap-5 items-center justify-end flex-1'>
                        <UserNav name={userName || ''} />
                    </div>
                </div>
            </nav>
        </div>
    );
}
