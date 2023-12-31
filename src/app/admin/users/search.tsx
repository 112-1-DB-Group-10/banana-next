'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { MdClear } from 'react-icons/md';

const Search: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('q') || '',
  );
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const q = e.target.value;
    setSearchQuery(q);
    params.set('q', q);
    if (q.length > 0) router.push(`${pathname}?${params.toString()}`);
    else if (searchParams.get('q')) router.push(pathname);
  };
  return (
    <div className="flex w-full items-center gap-2">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        className="w-full rounded-2xl border-gray-200 border-transparent px-2 py-2 focus:outline-none"
        placeholder="要找的使用者是..."
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
