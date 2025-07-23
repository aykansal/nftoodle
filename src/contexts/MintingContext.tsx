import React, { createContext, useContext, useState } from "react";

type MintingStep = "preparing" | "uploading" | "minting" | "confirming";

interface MintingContextType {
  isMinting: boolean;
  currentStep: MintingStep;
  memeId: number | null;
  startMinting: (memeId: number) => void;
  updateMintingStep: (step: MintingStep) => void;
  finishMinting: () => void;
}

const MintingContext = createContext<MintingContextType | undefined>(undefined);

export const useMinting = () => {
  const context = useContext(MintingContext);
  if (!context) {
    throw new Error("useMinting must be used within a MintingProvider");
  }
  return context;
};

export const MintingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<MintingStep>("preparing");
  const [memeId, setMemeId] = useState<number | null>(null);

  const startMinting = (id: number) => {
    setMemeId(id);
    setCurrentStep("preparing");
    setIsMinting(true);
  };

  const updateMintingStep = (step: MintingStep) => {
    setCurrentStep(step);
  };

  const finishMinting = () => {
    setIsMinting(false);
    setMemeId(null);
  };

  return (
    <MintingContext.Provider
      value={{
        isMinting,
        currentStep,
        memeId,
        startMinting,
        updateMintingStep,
        finishMinting,
      }}
    >
      {children}
    </MintingContext.Provider>
  );
};
