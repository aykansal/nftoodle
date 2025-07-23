import { useMinting } from "@/contexts/MintingContext";
import MintingOverlay from "./MintingOverlay";

const MintingOverlayWrapper = () => {
  const { isMinting, currentStep } = useMinting();

  return <MintingOverlay isVisible={isMinting} currentStep={currentStep} />;
};

export default MintingOverlayWrapper;
