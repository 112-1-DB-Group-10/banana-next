'use client';

import Avatar from '@/components/avatar';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { IoChatbubbleSharp, IoPerson } from 'react-icons/io5';

function NavBar({ userId }: { userId: string | null }) {
  return (
    <NavigationMenu className="fixed top-0 h-16 w-screen bg-[#FFBE00] text-black">
      <NavigationMenuList className="flex w-screen items-center justify-between px-4">
        <NavigationMenuItem>
          <Link href="/">
            <Avatar
              image="https://media.discordapp.net/attachments/893439505988743178/1184767785734246450/DALL.png?ex=658d2bfc&is=657ab6fc&hm=017c325753aa52816173c79985aff3e77b8cf2a3e25d4f695d1035acdb726893&=&format=webp&quality=lossless&width=1202&height=1202"
            />
          </Link>
        </NavigationMenuItem>
        {userId ? (
          <div className="flex gap-4">
            <NavigationMenuItem className="self-end">
              <Link href="/create" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <FaPen />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="self-end">
              <Link href="/chat" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <IoChatbubbleSharp />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="self-end">
              <Link href={`/profile/${userId}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <IoPerson />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <Link href="/api/auth/signout">
              <Button variant="link">登出</Button>
            </Link>
          </div>
        ) : (
          <Link href="/api/auth/signin">
            <Button variant="link">登入</Button>
          </Link>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavBar;

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = 'ListItem';
