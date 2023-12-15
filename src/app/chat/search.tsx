'use client';

import React, { useState } from 'react';
import { MdClear } from 'react-icons/md';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Search: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('q') || '',
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.length > 0) router.push(`${pathname}?q=${q}`);
    else if (searchParams.get('q')) router.push(pathname);
  };

  return (
    <div className="flex w-full items-center gap-2">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        className="w-full rounded-2xl border-gray-200 border-transparent px-2 py-2 focus:outline-none"
        placeholder="我的朋友叫..."
      />
      {searchQuery.length > 0 && (
        <Link onClick={() => setSearchQuery('')} href={pathname}>
          <MdClear className="h-6 w-6" />
        </Link>
      )}
    </div>
  );
};

export default Search;
