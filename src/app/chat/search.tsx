'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Search: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('q') || '',
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.length > 0) router.push(`${pathname}?q=${searchQuery}`);
    else if (searchParams.get('q')) router.push(pathname);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full items-center gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border-gray-200 border-transparent px-2 py-2 focus:outline-none"
          placeholder="我的朋友叫..."
        />
        <Button
          className="bg-white text-black shadow-none hover:bg-white"
          type="submit"
        >
          找到他！
        </Button>
      </div>
    </form>
  );
};

export default Search;
