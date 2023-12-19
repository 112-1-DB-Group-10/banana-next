'use server';

import { getAllLabelsWithTopics } from '@/actions/cardActions';
import locations from '@/actions/locations.json';
import LocationsAccodion from './locations-accordion';
import TopicsAccordion from './topics-accordion';

const Sidebar = async () => {
  const topics = await getAllLabelsWithTopics();
  return (
    <div className="no-scrollbar flex w-[180px] flex-col items-start overflow-y-scroll">
      <div className="py-2 text-xl font-bold">主題</div>
      <TopicsAccordion topics={topics} />
      {/*  */}
      <div className="py-2 text-xl font-bold">地點</div>
      <LocationsAccodion locations={locations} />
    </div>
  );
};

export default Sidebar;
