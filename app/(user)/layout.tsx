import type { ReactNode } from 'react';
import {
    HomeIcon,
    MagnifyingGlassIcon,
    BellIcon,
    ChatBubbleLeftIcon,
    Bars3Icon,
    ArrowLeftOnRectangleIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import NavLink from '@/components/NavLink';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SignOutButton } from '@clerk/nextjs';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getClerkUser } from '@/lib/auth';
import { getDbUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

const Layout = async ({ children }: { children: ReactNode }) => {
    const clerkUser = await getClerkUser();

    if (!clerkUser) return redirect('/');

    const user = await getDbUser();

    const links = [
        {
            href: '/feed',
            label: 'Home',
            Icon: HomeIcon,
        },
        {
            href: '/search',
            label: 'Search',
            Icon: MagnifyingGlassIcon,
        },
        {
            href: '/notifications',
            label: 'Notifications',
            Icon: BellIcon,
        },
        {
            href: '/messages',
            label: 'Messages',
            Icon: ChatBubbleLeftIcon,
        },
        {
            href: '/create',
            label: 'Create',
            Icon: PlusIcon,
        },
        {
            href: `/user/${user.id}`,
            label: 'Profile',
            Icon: () => (
                <Avatar className="h-4 w-4">
                    <AvatarImage src={user.imageUrl} alt="user_image" />
                </Avatar>
            ),
        },
    ];

    return (
        <div className="h-screen flex">
            <aside className="flex flex-col h-full p-4 border-r border-slate-800">
                <h1 className="font-bold text-3xl pt-4 pl-4 px-12">Instagram</h1>
                <div className="flex flex-col space-y-1 mt-4">
                    {links.map(link => (
                        <NavLink key={link.href} {...link} />
                    ))}
                </div>
                <div className="flex flex-1 flex-col justify-end">
                    <Popover>
                        <PopoverContent>
                            <SignOutButton>
                                <Button
                                    className="flex justify-start space-x-4 w-full"
                                    variant="ghost"
                                >
                                    <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                                    <span>Sign out</span>
                                </Button>
                            </SignOutButton>
                        </PopoverContent>
                        <PopoverTrigger asChild>
                            <Button className="flex justify-start space-x-4 w-full" variant="ghost">
                                <Bars3Icon className="h-4 w-4" />
                                <span>More</span>
                            </Button>
                        </PopoverTrigger>
                    </Popover>
                </div>
            </aside>
            <main className="flex-1 overflow-y-scroll">{children}</main>
            <aside className="border-l border-slate-800 px-4 pt-4">
                <Link href={`/user/${user.id}`}>
                    <Button variant="ghost" className="h-auto flex items-center space-x-4 p-4">
                        <Avatar>
                            <AvatarImage src={user.imageUrl} alt="user_image" />
                        </Avatar>
                        <div className="text-left">
                            <h3 className="font-medium">{user.firstName}</h3>
                            <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                    </Button>
                </Link>
            </aside>
        </div>
    );
};

export default Layout;
