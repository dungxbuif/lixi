'use client';
import { navItems } from '@/shared/constant';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import DashboardNav from './DashboardNav';

export default function SidebarMobile() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Menu onClick={handleOpen} className='z-20' />
            <div
                className={`${open ? 'left-0' : 'left-[-100%]'} z-[9999] w-[100vw] h-[100vh] bg-background fixed top-0 bottom-0 p-6 pr-7 transition-[1.5ss]`}
            >
                <div className='w-full flex justify-end mb-2'>
                    <X onClick={handleClose} />
                </div>
                <div className='w-full'>
                    <DashboardNav items={navItems} onCloseSidebar={handleClose} />
                </div>
            </div>
        </>
    );
}
