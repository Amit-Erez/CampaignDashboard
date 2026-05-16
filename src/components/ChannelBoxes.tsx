import { handleChannelChange } from "../lib/utils";
import { CampaignChannel, type CampaignFilters } from "../types";

const ChannelBoxes = ({ filters }: { filters: CampaignFilters }) => {
  return (
    <div className="flex items-center gap-4">
      <label
        className="flex items-center gap-2 text-xl"
        onClick={() => handleChannelChange(CampaignChannel.Google)}
      >
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={filters.channels.includes(CampaignChannel.Google)}
          readOnly
        />
        <span className="text-[16px]">Google</span>
      </label>
      <label
        className="flex items-center gap-2 text-xl"
        onClick={() => handleChannelChange(CampaignChannel.Meta)}
      >
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={filters.channels.includes(CampaignChannel.Meta)}
          readOnly
        />
        <span className="text-[16px]">Meta</span>
      </label>
      <label
        className="flex items-center gap-2 text-xl"
        onClick={() => handleChannelChange(CampaignChannel.LinkedIn)}
      >
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={filters.channels.includes(CampaignChannel.LinkedIn)}
          readOnly
        />
        <span className="text-[16px]">LinkedIn</span>
      </label>
      <label
        className="flex items-center gap-2 text-xl"
        onClick={() => handleChannelChange(CampaignChannel.TikTok)}
      >
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={filters.channels.includes(CampaignChannel.TikTok)}
          readOnly
        />
        <span className="text-[16px]">TikTok</span>
      </label>
    </div>
  );
};

export default ChannelBoxes;
