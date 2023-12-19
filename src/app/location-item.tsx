'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';

const LocationItem = ({ location }: { location: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handleLocationSelect = async (location: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('location', location);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <AccordionItem value={`location-${location}`}>
      <AccordionTrigger onClick={() => handleLocationSelect(location)}>
        {location}
      </AccordionTrigger>
    </AccordionItem>
  );
};

export default LocationItem;
