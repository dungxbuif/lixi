'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../atoms/Avatar';
import { Button } from '../atoms/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../atoms/DropdownMenu';


interface UserNavProps {
    name: string;
}

const getInitials = (name: string) => {
    if (!name) return 'SC';
    const words = name.split(' ');
    return words.length > 1
        ? `${words[0][0]}${words[1][0]}`.toUpperCase()
        : `${words[0][0]}`.toUpperCase();
};

export function UserNav({ name }: UserNavProps) {
    const [isOpen, setIsOpen] = useState(false);
    const initials = getInitials(name);

    const handleDropdownOpen = () => setIsOpen(!isOpen);

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    className='relative w-8 sm:w-40 rounded-md'
                    onClick={handleDropdownOpen}
                >
                    <Avatar className='h-9 w-9'>
                        <AvatarImage src='' alt={name} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <h1 className='ml-2 hidden sm:block text-lg'>
                        <strong>{name}</strong>
                    </h1>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-xs leading-none text-muted-foreground'>{name}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        signOut();
                        return;
                    }}
                >
                    <Link className='w-full h-full' href='#'>
                        Log out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
