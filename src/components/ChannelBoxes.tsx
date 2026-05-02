import { handleChannelChange } from "../lib/utils";
import { CampaignChannel, type CampaignFilters } from "../types";

const ChannelBoxes = ({ filters }: { filters: CampaignFilters }) => {
  return (
    <div className="flex items-center gap-4">
      <label
        className="flex items-center gap-2 text-lg"
        onClick={() => handleChannelChange(CampaignChannel.Google)}
      >
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={filters.channels.includes(CampaignChannel.Google)}
          readOnly
        />
        <span>Google</span>
      </label>
      <label
        className="flex items-center gap-2 text-lg"
        onClick={() => handleChannelChange(CampaignChannel.Meta)}
      >
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={filters.channels.includes(CampaignChannel.Meta)}
          readOnly
        />
        <span>Meta</span>
      </label>
      <label
        className="flex items-center gap-2 text-lg"
        onClick={() => handleChannelChange(CampaignChannel.LinkedIn)}
      >
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={filters.channels.includes(CampaignChannel.LinkedIn)}
          readOnly
        />
        <span>LinkedIn</span>
      </label>
      <label
        className="flex items-center gap-2 text-lg"
        onClick={() => handleChannelChange(CampaignChannel.TikTok)}
      >
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={filters.channels.includes(CampaignChannel.TikTok)}
          readOnly
        />
        <span>TikTok</span>
      </label>
    </div>
  );
};

export default ChannelBoxes;
