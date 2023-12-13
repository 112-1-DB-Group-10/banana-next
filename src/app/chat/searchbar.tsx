'use client';

import { ChangeEvent, useState } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState<string>('');
    const onSearchBarChange = (e: ChangeEvent<HTMLInputElement>) =>  {
        setQuery(e.target.value)
    }
  return (
    <div className="border-b-2 px-2 py-4">
      <input
        type="text"
        placeholder="search chatting"
        className="w-full rounded-2xl border-2 border-gray-200 px-2 py-2"
        value={query}
        onChange={}
      />
    </div>
  );
};
