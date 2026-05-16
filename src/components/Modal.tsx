import * as Dialog from "@radix-ui/react-dialog";
import { useCampaignStore } from "../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faLinkedin,
  faMeta,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { formatDate, formatNumber } from "../lib/utils";
import type { CampaignChannel } from "../types";

export default function Modal({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const selectedCampaignIndex = useCampaignStore(
    (state) => state.selectedCampaignIndex,
  );
  const setSelectedCampaignIndex = useCampaignStore(
    (state) => state.setSelectedCampaignIndex,
  );
  const visibleCampaigns = useCampaignStore((state) => state.visibleCampaigns);

  if (selectedCampaignIndex === null) return;
  const currentIndex = selectedCampaignIndex;
  const selectedCampaign = visibleCampaigns[currentIndex];

  function handlePrev() {
    setSelectedCampaignIndex(Math.max(currentIndex - 1, 0));
  }

  function handleNext() {
    setSelectedCampaignIndex(
      Math.min(currentIndex + 1, visibleCampaigns.length - 1),
    );
  }

  function channelLogos(channel: CampaignChannel){
    if (channel === "Meta") return <FontAwesomeIcon icon={faMeta} />;
    if (channel === "LinkedIn") return <FontAwesomeIcon icon={faLinkedin} />;
    if (channel === "Google") return <FontAwesomeIcon icon={faGoogle} />;
    else return <FontAwesomeIcon icon={faTiktok} />;
  }

  return (
    <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-1000 bg-[#4d6a92d2]" />
        <Dialog.Content className="flex flex-col fixed top-1/2 left-1/2 z-1001 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#F2F2F2] border p-6">
          <Dialog.Title className="sr-only">Campaign Details</Dialog.Title>
          <Dialog.Description className="sr-only">
            Detailed analytics and campaign performance metrics.
          </Dialog.Description>
          <div className="flex items-center justify-between w-full h-20 p-6 mt-4">
            <button onClick={handlePrev}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-5xl text-[#3a6073] hover:opacity-70 hover:scale-105 transition-all cursor-pointer active:scale-95"
              />
            </button>
            <h1 className="text-center text-2xl md:text-4xl font-semibold">{selectedCampaign?.name}</h1>
            <button onClick={handleNext}>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-5xl text-[#3a6073] hover:opacity-70 hover:scale-105 transition-all cursor-pointer active:scale-95"
              />
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto mt-6 rounded-xl">
            <div className="grid h-full grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
              <div className="flex h-full flex-col gap-4 order-2 md:order-1">
                <div className="flex-1 rounded-2xl border border-[#3a6073]/20 bg-white/70 p-5 shadow-sm">
                  <h2 className="text-xl font-semibold text-[#294f63]">
                    Spend Over Time
                  </h2>
                </div>

                <div className="flex-1 rounded-2xl border border-[#3a6073]/20 bg-white/70 p-5 shadow-sm">
                  <h2 className="text-xl font-semibold text-[#294f63]">
                    Impressions vs. Clicks
                  </h2>
                </div>
              </div>

              <div className="flex h-full flex-col gap-4 order-1 md:order-2">
                <div className="rounded-2xl border border-[#3a6073]/20 bg-white/70 p-5 shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold text-[#294f63]">
                    Details
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Status</span>
                      <span
                        className={`rounded-full ${
                          selectedCampaign.status === "Ended"
                            ? "bg-red-200 text-red-700"
                            : selectedCampaign.status === "Paused"
                              ? "bg-amber-200 text-amber-700"
                              : "bg-green-200 text-green-700"
                        } px-3 py-1 text-sm font-semibold text-[#294f63]`}
                      >
                        {selectedCampaign.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Channel</span>
                      <div className="flex items-center gap-2">
                      <span className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-[16px] font-semibold text-blue-700">
                        <figure className="flex items-center text-blue-700">
                      {channelLogos(selectedCampaign.channel)}
                        </figure>
                        {selectedCampaign.channel}
                      </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Start Date</span>
                      <span className="font-medium text-[#294f63]">
                        {formatDate(selectedCampaign.startDate)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">End Date</span>
                      <span className="font-medium text-[#294f63]">
                        {formatDate(selectedCampaign.endDate)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 rounded-2xl border border-[#3a6073]/20 bg-white/70 p-5 shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold text-[#294f63]">
                    Performance
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#3a6073]/10 pb-2">
                      <span className="text-sm text-slate-500">Budget</span>
                      <span className="font-semibold text-[#294f63]">
                        {"$" + formatNumber(selectedCampaign.budget)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#3a6073]/10 pb-2">
                      <span className="text-sm text-slate-500">Spend</span>
                      <span className="font-semibold text-[#294f63]">
                        {"$" + formatNumber(selectedCampaign.spend)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#3a6073]/10 pb-2">
                      <span className="text-sm text-slate-500">
                        Impressions
                      </span>
                      <span className="font-semibold text-[#294f63]">
                        {formatNumber(selectedCampaign.impressions)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#3a6073]/10 pb-2">
                      <span className="text-sm text-slate-500">Clicks</span>
                      <span className="font-semibold text-[#294f63]">
                        {formatNumber(selectedCampaign.clicks)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#3a6073]/10 pb-2">
                      <span className="text-sm text-slate-500">CTR</span>
                      <span className="font-semibold text-[#294f63]">
                        {(
                          (selectedCampaign.clicks /
                            selectedCampaign.impressions) *
                          100
                        ).toFixed(1) + "%"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#3a6073]/10 pb-2">
                      <span className="text-sm text-slate-500">
                        Conversions
                      </span>
                      <span className="font-semibold text-[#294f63]">
                        {formatNumber(selectedCampaign.conversions)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">CPA</span>
                      <span className="font-semibold text-[#294f63]">
                        {(
                          (selectedCampaign.spend /
                            selectedCampaign.conversions) *
                          100
                        ).toFixed(1) + "%"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Dialog.Close asChild className="absolute top-4 right-4">
            <button>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="text-2xl text-[#3a6073] hover:opacity-70 transition-all cursor-pointer"
              />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
