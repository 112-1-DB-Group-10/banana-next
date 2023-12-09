'use server';

import Link from 'next/link';

export default async function HomePage() {
  return (
    <div>
      <Link className="bg-blue" href="/a">
        B
      </Link>
    </div>
  );
}
