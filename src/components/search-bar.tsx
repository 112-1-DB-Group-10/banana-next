'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { followings } from '@/data/fake';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  return (
    <Command
      className={cn(
        'h-[calc(42rem_-_100px)] shrink-0 rounded-none border-t',
        !open && 'h-12',
      )}
    >
      <CommandInput
        placeholder="Search following or add new following"
        className="h-12"
        onFocus={() => setOpen(true)}
        icon={
          open ? (
            <button onClick={() => setOpen(false)}>
              <ArrowLeftIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            </button>
          ) : (
            <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          )
        }
      />
      <CommandList className="max-h-none">
        <CommandEmpty>No people found</CommandEmpty>
        <CommandGroup heading="Following">
          {followings.map((following) => (
            <CommandItem key={following.id} className="p-0">
              <Link
                href={`/chat/${following.id}`}
                className="flex w-full space-x-2 px-2 py-1.5"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={following.img} alt={following.name} />
                  <AvatarFallback />
                </Avatar>
                <span>{following.name}</span>
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Others">
          {followings.map((other) => (
            <CommandItem key={other.id} className="space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={other.img} alt={other.name} />
                <AvatarFallback />
              </Avatar>
              <span>{other.name}</span>
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="!ml-auto shrink-0"
              >
                Follow
              </Button>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
