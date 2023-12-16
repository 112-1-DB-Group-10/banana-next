'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { IoChatbubbleSharp, IoPerson } from 'react-icons/io5';
import Link from 'next/link';
// import { Icons } from '@/components/icons';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

function handleClickLogin() {
  console.log('click login button');
}

function handleClickPost() {
  console.log('click post button');
}

function handleClickMessage() {
  console.log('click message button');
}

function handleClickAvatar() {
  console.log('click avatar button');
}

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const user_id = 'bbb';

  return (
    <NavigationMenu className="fixed top-0 h-16 w-screen bg-[#FFBE00] text-black">
      <NavigationMenuList className="flex w-screen items-center justify-between px-4">
        <NavigationMenuItem>
          <Link href="/">相教</Link>
        </NavigationMenuItem>
        <div className="flex gap-4">
          <NavigationMenuItem className="self-end">
            <Link href="/cardstemp" legacyBehavior passHref>
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
            <Link href={"/profile/" + user_id} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <IoPerson />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>
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
