'use server';

import locations from '@/actions/locations.json';
import topics from '@/actions/topics.json';
import LocationsAccodion from './locations-accordion';
import TopicsAccordion from './topics-accordion';

const Sidebar = async () => {
  return (
    <div className="no-scrollbar flex max-h-[45vh] w-[180px] flex-col items-start overflow-y-auto">
      <div className="py-2 text-xl font-bold">主題</div>
      <TopicsAccordion topics={topics} />
      {/*  */}
      <div className="py-2 text-xl font-bold">地點</div>
      <LocationsAccodion locations={locations} />
    </div>
  );
};

export default Sidebar;
