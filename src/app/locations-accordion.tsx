'use client';

import { Accordion } from '@radix-ui/react-accordion';
import LocationItem from './location-item';

const LocationsAccodion = ({ locations }: { locations: string[] }) => {
  return (
    <Accordion
      className="no-scrollbar flex max-h-[25vh] w-[180px] items-start overflow-y-auto"
      type="single"
      collapsible
    >
      {locations.map((location, index) => (
        <LocationItem location={location} key={`location-item-${index}`} />
      ))}
    </Accordion>
  );
};

export default LocationsAccodion;
