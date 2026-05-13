import * as Dialog from "@radix-ui/react-dialog";
import { useCampaignStore } from "../store/store";

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

  return (
    <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-1000 bg-[#4d6a92d2]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-1001 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#F2F2F2] border p-6">
          <Dialog.Title>Campaign details</Dialog.Title>
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
          <Dialog.Description>
            The index of this ad is {currentIndex}
          </Dialog.Description>
          <Dialog.Close asChild>
            <button>X</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
